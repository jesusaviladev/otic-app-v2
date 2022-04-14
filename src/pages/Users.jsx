import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../services/users.services.js';
import useSession from '../hooks/useSession.js';
import DataTable from 'react-data-table-component';
import NoDataComponent from '../components/NoDataComponent.jsx';
import TableSpinner from '../components/TableSpinner.jsx';
import UsersForm from '../components/UsersForm.jsx';
import Tabs from '../components/Tabs.jsx';
import Tab from '../components/Tab.jsx';
import { FaUser, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import useModal from '../hooks/useModal.js';
import ConfirmModal from '../components/ConfirmModal.jsx';

const Users = () => {
	const [users, setUsers] = useState([]);
	const [pending, setPending] = useState(true);
	const [selectedTab, setSelectedTab] = useState('Usuarios');

	const { showModal, toggleModal } = useModal();

	const { user } = useSession();
	const { token } = JSON.parse(user);

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
			selector: (row) => row.role.name,
			style: {
				textTransform: 'capitalize',
			},
		},
		{
			name: 'Editar',
			button: true,
			cell: (row) => (
				<Link to={`/admin/usuarios/${row.id}`}>
					<FaEdit className="w-5 h-5 text-green-500" />
				</Link>
			),
		},
		{
			name: 'Eliminar',
			button: true,
			cell: () => (
				<button onClick={toggleModal}>
					<FaTrash className="w-5 h-5 text-red-600" />
				</button>
			),
		},
	];

	return (
		<>
			<Tabs
				tabs={[
					{
						icon: <FaUser />,
						label: 'Usuarios',
					},
					{
						icon: <FaPlus />,
						label: 'Nuevo usuario',
					},
				]}
				selected={selectedTab}
				setSelected={setSelectedTab}
			>
				<Tab isSelected={selectedTab === 'Usuarios'}>
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
				</Tab>
				<Tab isSelected={selectedTab === 'Nuevo usuario'}>
					<UsersForm />
				</Tab>

				{showModal && (
					<ConfirmModal
						onClose={toggleModal}
						message="¿Desea eliminar este usuario?"
					>
						Usuario Eliminar
					</ConfirmModal>
				)}
			</Tabs>
		</>
	);
};

export default Users;
