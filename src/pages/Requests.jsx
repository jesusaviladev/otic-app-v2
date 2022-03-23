import { useState, useEffect } from 'react';
import { getRequests } from '../services/requests.services.js';
import useSession from '../hooks/useSession.js';
import DataTable from 'react-data-table-component';
import NoDataComponent from '../components/NoDataComponent.jsx';
import TableSpinner from '../components/TableSpinner.jsx'
import { FaEdit, FaTrash } from 'react-icons/fa';

const Requests = () => {
	const [requests, setRequests] = useState([]);
	const [pending, setPending] = useState(true)

	const { token } = useSession();

	useEffect(() => {
		getRequests(token)
			.then((res) => {
				setPending(false)
				setRequests(res.data.requests);
			})
			.catch((error) => {
				setPending(false)
				console.log(error)
			});
	}, []);

	const columns = [
		{
			name: 'ID',
			selector: (row) => row.id,
			width: '50px'
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
			width: '100px'
		},
		{
			name: 'Usuario',
			selector: (row) => row.user_id,
			width: '100px'
		},
		{
			name: 'Editar',
			button: true,
			cell: () => <button><FaEdit/></button>
		},
		{
			name: 'Eliminar',
			button: true,
			cell: () => <button><FaTrash/></button>
		}
	];

	const paginationComponentOptions = {
		rowsPerPageText: 'Filas por página',
	}


	return (
		<>
			<DataTable
			title="Solicitudes" 
			columns={columns} 
			data={requests} 
			pagination 
			paginationComponentOptions={paginationComponentOptions}
			highlightOnHover
			pointerOnHover
			striped
			progressPending={pending}
			persistTableHead
			noDataComponent={<NoDataComponent/>}
			progressComponent={<TableSpinner/>}
			/>
		</>
	);
};

export default Requests;
