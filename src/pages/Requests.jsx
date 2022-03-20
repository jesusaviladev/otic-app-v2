import { useState, useEffect } from 'react';
import { getRequests } from '../services/requests.services.js';
import useSession from '../hooks/useSession.js';
import DataTable from 'react-data-table-component';

const Requests = () => {
	const [requests, setRequests] = useState([]);

	const { token } = useSession();

	useEffect(() => {
		getRequests(token)
			.then((res) => {
				setRequests(res.data.requests);
			})
			.catch((error) => console.log(error));
	}, []);

	const columns = [
		{
			name: 'ID',
			selector: (row) => row.id,
		},
		{
			name: 'Descripcion',
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


	return (
		<>
			<h1>Solicitudes</h1>
			<DataTable columns={columns} data={requests}/>
		</>
	);
};

export default Requests;
