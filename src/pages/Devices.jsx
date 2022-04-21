import { useState, useMemo, useRef } from 'react';
import useDevices from '../hooks/useDevices.js';
import DataTable from 'react-data-table-component';
import NoDataComponent from '../components/NoDataComponent.jsx';
import TableSpinner from '../components/TableSpinner.jsx';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import useModal from '../hooks/useModal.js';
import ConfirmModal from '../components/ConfirmModal.jsx';
import Toast from '../components/Toast.jsx';

const Devices = () => {
	const {
		devices,
		totalDevices,
		pending,
		user,
		handleDeleteDevice,
		handleNextPage,
	} = useDevices();

	const { showModal, toggleModal } = useModal();

	const [successDelete, setSuccessDelete] = useState(false);

	const selectedItemRef = useRef(null);

	const { role } = JSON.parse(user);

	const handleDelete = (serial) => {
		selectedItemRef.current = serial;
		toggleModal();
	};

	const confirmModalAction = (serial) => {
		handleDeleteDevice(serial)
			.then(() => {
				toggleModal();
				setSuccessDelete(true);
			})
			.catch((err) => {
				toggleModal();
				console.log(err);
			});
	};

	const columns = useMemo(
		() => [
			{
				name: 'ID',
				selector: (row) => row.id,
				width: '50px',
			},
			{
				name: 'Serial',
				selector: (row) => row.serial,
			},
			{
				name: 'Tipo',
				selector: (row) => row.type,
				style: {
					textTransform: 'capitalize',
				},
			},
			{
				name: 'Nombre',
				selector: (row) => row.name,
				style: {
					textTransform: 'capitalize',
				},
			},
			{
				name: 'Detalles',
				button: true,
				cell: (row) => (
					<Link
						to={
							role === 'admin'
								? `/admin/equipos/${row.serial}`
								: `/dashboard/equipos/${row.serial}`
						}
					>
						<FaEdit className="w-5 h-5 text-green-500" />
					</Link>
				),
			},
			{
				name: 'Eliminar',
				button: true,
				cell: (row) => (
					<button onClick={() => handleDelete(row.serial)}>
						<FaTrash className="w-5 h-5 text-red-600" />
					</button>
				),
				omit: role !== 'admin',
			},
		],
		[]
	);

	const paginationComponentOptions = {
		rowsPerPageText: 'Filas por página',
	};

	return (
		<>
			<DataTable
				title="Equipos"
				columns={columns}
				data={devices}
				pagination
				paginationServer
				paginationComponentOptions={paginationComponentOptions}
				paginationTotalRows={totalDevices}
				onChangePage={(page) => handleNextPage(page)}
				highlightOnHover
				pointerOnHover
				progressPending={pending}
				persistTableHead
				noDataComponent={<NoDataComponent />}
				progressComponent={<TableSpinner />}
				theme="dark"
			/>
			{showModal && (
				<ConfirmModal
					onClose={toggleModal}
					onConfirm={() => confirmModalAction(selectedItemRef.current)}
					message="¿Desea eliminar este equipo?"
				/>
			)}
			{successDelete && (
				<Toast
					message="Eliminado correctamente"
					onClick={() => setSuccessDelete(false)}
				/>
			)}
		</>
	);
};

export default Devices;
