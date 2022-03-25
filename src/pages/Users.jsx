import { useEffect, useState } from 'react';
import { getUsers } from '../services/users.services.js';
import useSession from '../hooks/useSession.js';
import DataTable from 'react-data-table-component';
import NoDataComponent from '../components/NoDataComponent.jsx';
import TableSpinner from '../components/TableSpinner.jsx';

const Users = () => {
	const [users, setUsers] = useState([]);
	const [pending, setPending] = useState(true);

	const { user } = useSession();
	const { token } = JSON.parse(user) 

	useEffect(() => {
		getUsers(token)
			.then((res) => {
				setPending(false);
				setUsers(res.data.users);
			})
			.catch((error) => {
				setPending(false);
				console.log(error);
			});
	}, []);

	const paginationComponentOptions = {
		rowsPerPageText: 'Filas por página',
	};

	const columns = [
		{
			name: 'ID',
			selector: (row) => row.id,
			width: '50px',
		},
		{
			name: 'Usuario',
			selector: (row) => row.username,
		},
		{
			name: 'Nombre',
			selector: (row) => row.name,
			style: {
				textTransform: 'capitalize',
			},
		},
		{
			name: 'Apellido',
			selector: (row) => row.surname,
			style: {
				textTransform: 'capitalize',
			},
		},
		{
			name: 'C.I.',
			selector: (row) => row.ci,
		},
		{
			name: 'Rol',
			selector: (row) => row.role_id,
		},
	];

	return (
		<>
			<DataTable
				title="Usuarios"
				columns={columns}
				data={users}
				pagination
				paginationComponentOptions={paginationComponentOptions}
				highlightOnHover
				pointerOnHover
				striped
				progressPending={pending}
				persistTableHead
				noDataComponent={<NoDataComponent />}
				progressComponent={<TableSpinner />}
			/>
		</>
	);
};

export default Users;
