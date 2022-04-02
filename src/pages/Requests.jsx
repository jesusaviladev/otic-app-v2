import { useState, useEffect } from 'react';
import { getRequests } from '../services/requests.services.js';
import useSession from '../hooks/useSession.js';
import DataTable from 'react-data-table-component';
import NoDataComponent from '../components/NoDataComponent.jsx';
import TableSpinner from '../components/TableSpinner.jsx';
import { FaEdit, FaTrash, FaPlus, FaClipboardList } from 'react-icons/fa';
import RequestsForm from '../components/RequestsForm.jsx';
import Tabs from '../components/Tabs.jsx';
import Tab from '../components/Tab.jsx';

const Requests = () => {
	const [requests, setRequests] = useState([]);
	const [pending, setPending] = useState(true);
	const [selectedTab, setSelectedTab] = useState('Solicitudes');

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
			selector: (row) => row.id,
			width: '50px',
		},
		{
			name: 'Descripción',
			selector: (row) => row.description,
		},
		{
			name: 'Fecha',
			selector: (row) => row.date,
		},
		{
			name: 'Status',
			selector: (row) => row.status_id,
			width: '100px',
		},
		{
			name: 'Usuario',
			selector: (row) => row.user_id,
			width: '100px',
		},
		{
			name: 'Editar',
			button: true,
			cell: () => (
				<button>
					<FaEdit />
				</button>
			),
		},
		{
			name: 'Eliminar',
			button: true,
			cell: () => (
				<button>
					<FaTrash />
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
			</Tabs>
		</>
	);
};

export default Requests;
