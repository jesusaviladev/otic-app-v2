import { useState, useEffect } from 'react';
import { getUserRequests } from '../services/users.services.js';
import useSession from '../hooks/useSession.js';
import DataTable from 'react-data-table-component';
import NoDataComponent from '../components/NoDataComponent.jsx';
import TableSpinner from '../components/TableSpinner.jsx';

const UserRequest = () => {
	const [requests, setRequests] = useState([]);
	const [pending, setPending] = useState(true);

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
	];

	const paginationComponentOptions = {
		rowsPerPageText: 'Filas por página',
	};

	return (
		<>
			<DataTable
				title="Mis solicitudes"
				columns={columns}
				data={requests}
				pagination
				paginationComponentOptions={paginationComponentOptions}
				highlightOnHover
				pointerOnHover
				striped
				progressPending={pending}
				persistTableHead
				noDataComponent={<NoDataComponent />}
				progressComponent={<TableSpinner />}
				theme="dark"
			/>
		</>
	);
};

export default UserRequest;
