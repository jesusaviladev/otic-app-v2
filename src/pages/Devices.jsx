import { useState, useEffect } from 'react';
import { getDevices } from '../services/devices.services.js';
import useSession from '../hooks/useSession.js';
import DataTable from 'react-data-table-component';
import NoDataComponent from '../components/NoDataComponent.jsx';
import TableSpinner from '../components/TableSpinner.jsx';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Devices = () => {
	const [devices, setDevices] = useState([]);
	const [pending, setPending] = useState(true);

	const { user } = useSession();
	const { token, role } = JSON.parse(user);

	useEffect(() => {
		getDevices(token)
			.then((res) => {
				setPending(false);
				setDevices(res.data.devices);
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
			name: 'Serial',
			selector: (row) => row.serial,
		},
		{
			name: 'Tipo',
			selector: (row) => row.type,
			style: {
				textTransform: 'capitalize',
			},
		},
		{
			name: 'Nombre',
			selector: (row) => row.name,
			style: {
				textTransform: 'capitalize',
			},
		},
		{
			name: 'Editar',
			button: true,
			cell: (row) => (
				<Link to={`/admin/devices/${row.id}`}>
					<FaEdit className="w-5 h-5 text-green-500" />
				</Link>
			),
		},
		{
			name: 'Eliminar',
			button: true,
			cell: (row) => (
				<button onClick={() => {}}>
					<FaTrash className="w-5 h-5 text-red-600" />
				</button>
			),
			omit: role !== 'admin'
		},
	];

	const paginationComponentOptions = {
		rowsPerPageText: 'Filas por página',
	};

	return (
		<>
			<DataTable
				title="Equipos"
				columns={columns}
				data={devices}
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
		</>
	);
};

export default Devices;
