import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRequests } from '../services/requests.services.js';
import useSession from '../hooks/useSession.js';
import useModal from '../hooks/useModal.js';
import DataTable from 'react-data-table-component';
import NoDataComponent from '../components/NoDataComponent.jsx';
import TableSpinner from '../components/TableSpinner.jsx';
import { FaEdit, FaTrash, FaPlus, FaClipboardList } from 'react-icons/fa';
import RequestsForm from '../components/RequestsForm.jsx';
import Tabs from '../components/Tabs.jsx';
import Tab from '../components/Tab.jsx';
import ConfirmModal from '../components/ConfirmModal.jsx';

const Requests = () => {
	const [requests, setRequests] = useState([]);
	const [pending, setPending] = useState(true);
	const [selectedTab, setSelectedTab] = useState('Solicitudes');

	const { showModal, toggleModal } = useModal()

	const { user } = useSession();
	const { token } = JSON.parse(user);

	useEffect(() => {
		getRequests(token)
			.then((res) => {
				setPending(false);
				setRequests(res.data.requests);
			})
			.catch((error) => {
				setPending(false);
				console.log(error);
			});
	}, []);

	const columns = [
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
			selector: (row) => row.status.description,
			style: {
				textTransform: 'capitalize',
			},
		},
		{
			name: 'Usuario',
			sortable: true,
			selector: (row) => row.user.username,
		},
		{
			name: 'Editar',
			button: true,
			cell: (row) => (
				<Link to={`/admin/solicitudes/${row.id}`}>
					<FaEdit className="w-5 h-5 text-green-500"/>
				</Link>
			),
		},
		{
			name: 'Eliminar',
			button: true,
			cell: () => (
				<button onClick={toggleModal}>
					<FaTrash className="w-5 h-5 text-red-600"/>
				</button>
			),
		},
	];

	const paginationComponentOptions = {
		rowsPerPageText: 'Filas por página',
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
						paginationComponentOptions={paginationComponentOptions}
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
					<RequestsForm />
				</Tab>
			{showModal && 

				<ConfirmModal onClose={toggleModal} message="¿Desea eliminar esta solicitud?">
					Solicitud Eliminar
				</ConfirmModal>
			}
			</Tabs>
		</>
	);
};

export default Requests;
