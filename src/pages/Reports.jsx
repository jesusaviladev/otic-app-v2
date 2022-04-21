import { useState, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import useReports from '../hooks/useReports.js';
import useModal from '../hooks/useModal.js';
import DataTable from 'react-data-table-component';
import NoDataComponent from '../components/NoDataComponent.jsx';
import TableSpinner from '../components/TableSpinner.jsx';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ConfirmModal from '../components/ConfirmModal.jsx';
import Toast from '../components/Toast.jsx';

const Reports = () => {

	const { reports, totalReports, pending, handleDeleteReport, handleNextPage } = useReports()

	const { showModal, toggleModal } = useModal()

	const [successDelete, setSuccessDelete] = useState(false);

	const selectedItemRef = useRef(null);

	const handleDelete = (id) => {
		selectedItemRef.current = id;
		toggleModal();
	};

	const confirmModalAction = (id) => {
		handleDeleteReport(id)
		.then(() => {
			toggleModal()
			setSuccessDelete(true)
		})
		.catch((err) => {
				toggleModal();
				console.log(err);
			});
	};

	const columns = useMemo(() => [
		{
			name: 'ID',
			selector: (row) => row.id,
			width: '50px',
		},
		{
			name: 'Comentario',
			selector: (row) => row.comment,
		},
		{
			name: 'Fecha',
			selector: (row) => row.date,
		},
		{
			name: 'Usuario asignado',
			selector: (row) => row.user?.username,
		},
		{
			name: 'Detalles',
			button: true,
			cell: (row) => (
				<Link to={`/admin/reportes/${row.id}`}>
					<FaEdit className="w-5 h-5 text-green-500" />
				</Link>
			),
		},
		{
			name: 'Eliminar',
			button: true,
			cell: (row) => (
				<button onClick={() => handleDelete(row.id)}>
					<FaTrash className="w-5 h-5 text-red-600" />
				</button>
			),
		},

	], []);

	const paginationComponentOptions = {
		rowsPerPageText: 'Filas por página',
	};

	return (
		<>
			<DataTable
				title="Reportes"
				columns={columns}
				data={reports}
				pagination
				paginationServer
				paginationComponentOptions={paginationComponentOptions}
				paginationTotalRows={totalReports}
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

export default Reports;
