import { useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import useModal from '../hooks/useModal.js';
import useRequests from '../hooks/useRequests.js';
import DataTable from 'react-data-table-component';
import NoDataComponent from '../components/NoDataComponent.jsx';
import TableSpinner from '../components/TableSpinner.jsx';
import { FaEdit, FaTrash, FaPlus, FaClipboardList } from 'react-icons/fa';
import RequestsForm from '../components/RequestsForm.jsx';
import Tabs from '../components/Tabs.jsx';
import Tab from '../components/Tab.jsx';
import ConfirmModal from '../components/ConfirmModal.jsx';
import Toast from '../components/Toast.jsx';

const Requests = () => {
	const [selectedTab, setSelectedTab] = useState('Solicitudes');
	const [successDelete, setSuccessDelete] = useState(false);

	const {
		requests,
		totalRequests,
		pending,
		handleNextPage,
		handleDeleteRequest,
		handleAddRequest,
	} = useRequests();

	const { showModal, toggleModal } = useModal();

	const selectedItemRef = useRef(null);

	const handleDelete = (id) => {
		selectedItemRef.current = id;
		toggleModal();
	};

	const confirmModalAction = (id) => {
		handleDeleteRequest(id)
			.then(() => {
				toggleModal();
				setSuccessDelete(true);
			})
			.catch((err) => {
				toggleModal();
				console.log(err);
			});
	};

	const columns = useMemo(() => [
		{
			name: 'ID',
			sortable: true,
			width: '70px',
			selector: (row) => row.id,
		},
		{
			name: 'Descripción',
			selector: (row) => row.description,
		},
		{
			name: 'Fecha',
			sortable: true,
			selector: (row) => row.date,
		},
		{
			name: 'Estado',
			selector: (row) => row.status?.description,
			style: {
				textTransform: 'capitalize',
			},
		},
		{
			name: 'Usuario',
			sortable: true,
			selector: (row) => row.user?.username,
		},
		{
			name: 'Editar',
			button: true,
			cell: (row) => (
				<Link to={`/admin/solicitudes/${row.id}`}>
					<FaEdit className="w-5 h-5 text-green-500" />
				</Link>
			),
		},
		{
			name: 'Eliminar',
			button: true,
			cell: (row) => (
				<button data-id={row.id} onClick={() => handleDelete(row.id)}>
					<FaTrash className="w-5 h-5 text-red-600" />
				</button>
			),
		},
	], []);

	const paginationComponentOptions = {
		noRowsPerPage: true,
		rowsPerPageText: 'Resultados por página',
	};

	return (
		<>
			<Tabs
				tabs={[
					{
						icon: <FaClipboardList />,
						label: 'Solicitudes',
					},
					{
						icon: <FaPlus />,
						label: 'Nueva solicitud',
					},
				]}
				selected={selectedTab}
				setSelected={setSelectedTab}
			>
				<Tab isSelected={selectedTab === 'Solicitudes'}>
					<DataTable
						title="Solicitudes"
						columns={columns}
						data={requests}
						pagination
						paginationServer
						paginationComponentOptions={paginationComponentOptions}
						paginationTotalRows={totalRequests}
						onChangePage={(page) => handleNextPage(page)}
						highlightOnHover
						pointerOnHover
						progressPending={pending}
						persistTableHead
						noDataComponent={<NoDataComponent />}
						progressComponent={<TableSpinner />}
						theme="dark"
					/>
				</Tab>
				<Tab isSelected={selectedTab === 'Nueva solicitud'}>
					<RequestsForm handleAddRequest={handleAddRequest} />
				</Tab>
			</Tabs>
			{showModal && (
				<ConfirmModal
					onClose={toggleModal}
					onConfirm={() => confirmModalAction(selectedItemRef.current)}
					message="¿Desea eliminar esta solicitud?"
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

export default Requests;
