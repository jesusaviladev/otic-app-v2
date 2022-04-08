import { useState, useEffect } from 'react';
import { getUserRequests } from '../services/users.services.js';
import useSession from '../hooks/useSession.js';
import DataTable from 'react-data-table-component';
import NoDataComponent from '../components/NoDataComponent.jsx';
import TableSpinner from '../components/TableSpinner.jsx';
import RequestsForm from '../components/RequestsForm.jsx';
import Tabs from '../components/Tabs.jsx';
import Tab from '../components/Tab.jsx';
import { FaClipboardList, FaPlus } from 'react-icons/fa';

const UserRequest = () => {
	const [requests, setRequests] = useState([]);
	const [pending, setPending] = useState(true);
	const [selectedTab, setSelectedTab] = useState('Mis solicitudes');

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
			width: '30px',
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
		},
		{
			name: 'Usuario',
			selector: (row) => row.user_id,
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
					<RequestsForm />
				</Tab>
			</Tabs>
		</>
	);
};

export default UserRequest;
