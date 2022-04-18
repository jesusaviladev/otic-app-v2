import { useState, useRef, useMemo } from 'react';
import useUsers from '../hooks/useUsers.js';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import NoDataComponent from '../components/NoDataComponent.jsx';
import TableSpinner from '../components/TableSpinner.jsx';
import UsersForm from '../components/UsersForm.jsx';
import Tabs from '../components/Tabs.jsx';
import Tab from '../components/Tab.jsx';
import { FaUser, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import useModal from '../hooks/useModal.js';
import ConfirmModal from '../components/ConfirmModal.jsx';
import Toast from '../components/Toast.jsx';

const Users = () => {
	const [selectedTab, setSelectedTab] = useState('Usuarios');
	const [successDelete, setSuccessDelete] = useState(false);

	const { showModal, toggleModal } = useModal();

	const { users, pending, totalUsers, handleAddUser, handleDeleteUser, handleNextPage } = useUsers();

	const selectedItemRef = useRef(null);

	const handleDelete = (id) => {
		selectedItemRef.current = id;
		toggleModal();
	};

	const confirmModalAction = (id) => {
		handleDeleteUser(id)
			.then(() => {
				toggleModal();
				setSuccessDelete(true);
			})
			.catch((err) => {
				toggleModal();
				console.log(err);
			});
	}

	const paginationComponentOptions = {
		noRowsPerPage: true,
		rowsPerPageText: 'Filas por página',
	};

	const columns = useMemo(() => [
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
			cell: (row) => (
				<button onClick={() => handleDelete(row.id)}>
					<FaTrash className="w-5 h-5 text-red-600" />
				</button>
			),
		},
	]);

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
						paginationServer
						paginationComponentOptions={paginationComponentOptions}
						paginationTotalRows={totalUsers}
						onChangePage={(page) => handleNextPage(page)}
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
					<UsersForm handleAddUser={handleAddUser} />
				</Tab>

				{showModal && (
					<ConfirmModal
						onClose={toggleModal}
						onConfirm={() => confirmModalAction(selectedItemRef.current)}
						message="¿Desea eliminar este usuario?"
					/>
				)}
				{successDelete && (
					<Toast
						message="Eliminado correctamente"
						onClick={() => setSuccessDelete(false)}
					/>
				)}
			</Tabs>
		</>
	);
};

export default Users;
