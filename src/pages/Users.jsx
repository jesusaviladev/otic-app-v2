import { useEffect, useState } from 'react';
import { getUsers } from '../services/users.services.js';
import useSession from '../hooks/useSession.js';
import DataTable from 'react-data-table-component';
import NoDataComponent from '../components/NoDataComponent.jsx';
import TableSpinner from '../components/TableSpinner.jsx';
import useModal from '../hooks/useModal.js';
import Modal from '../components/Modal.jsx';
import Button from '../components/Button.jsx';
import UsersForm from '../components/UsersForm.jsx'

const Users = () => {
	const [users, setUsers] = useState([]);
	const [pending, setPending] = useState(true);

	const { user } = useSession();
	const { token } = JSON.parse(user);

	const { showModal, toggleModal } = useModal();

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
			<div className="flex justify-end p-3 text-white">
				<Button onClick={toggleModal}>Nuevo usuario</Button>
			</div>
			<DataTable
				title="Usuarios"
				columns={columns}
				data={users}
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
			{showModal && <Modal onClose={toggleModal}>
				<UsersForm onClose={toggleModal}/>
			</Modal>}
		</>
	);
};

export default Users;
