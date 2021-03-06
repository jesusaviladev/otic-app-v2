import { useState, useEffect } from 'react';
import { getUserRequests } from '../services/users.services.js';
import { Link } from 'react-router-dom';
import useSession from '../hooks/useSession.js';
import useRequests from '../hooks/useRequests.js';
import DataTable from 'react-data-table-component';
import NoDataComponent from '../components/NoDataComponent.jsx';
import TableSpinner from '../components/TableSpinner.jsx';
import RequestsForm from '../components/RequestsForm.jsx';
import Tabs from '../components/Tabs.jsx';
import Tab from '../components/Tab.jsx';
import { FaClipboardList, FaPlus, FaEdit, FaSearchPlus } from 'react-icons/fa';

const UserRequest = () => {
	const [requests, setRequests] = useState([]);
	const [pending, setPending] = useState(true);
	const [selectedTab, setSelectedTab] = useState('Mis solicitudes');

	const { handleAddRequest } = useRequests();

	const { user } = useSession();
	const { token, id } = JSON.parse(user);

	useEffect(() => {
		getUserRequests(token, id)
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
			width: '70px',
		},
		{
			name: 'Descripción',
			selector: (row) => row.description,
		},
		{
			name: 'Fecha',
			selector: (row) => new Date(row.date).toLocaleString('es-ES'),
		},
		{
			name: 'Status',
			selector: (row) => row.status.description,
			sortable: true,
			style: {
				textTransform: 'capitalize',
			},
		},
		{
			name: 'Reporte',
			button: true,
			cell: (row) =>
				row.status_id === 2 ? (
					<Link
						to={`/dashboard/solicitudes/${row.id}/reporte`}
						className="flex items-center"
					>
						<FaEdit className="w-5 h-5 text-green-500 mr-2" /> Crear
					</Link>
				) : null,
		},
		{
			name: 'Detalles',
			button: true,
			cell: (row) => ( <Link
						to={`/dashboard/solicitudes/${row.id}`}>
						<FaSearchPlus className="w-5 h-5 text-teal-400 mr-2" title="Ver detalles"/>
					</Link>
				)
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
						label: 'Mis solicitudes',
					},
					{
						icon: <FaPlus />,
						label: 'Nueva solicitud',
					},
				]}
				selected={selectedTab}
				setSelected={setSelectedTab}
			>
				<Tab isSelected={selectedTab === 'Mis solicitudes'}>
					<DataTable
						title="Mis solicitudes"
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
					<RequestsForm handleAddRequest={handleAddRequest} />
				</Tab>
			</Tabs>
		</>
	);
};

export default UserRequest;
