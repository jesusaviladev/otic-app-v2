import { useState, useEffect } from 'react';
import { getDevices } from '../services/devices.services.js';
import useSession from '../hooks/useSession.js';
import DataTable from 'react-data-table-component';
import NoDataComponent from '../components/NoDataComponent.jsx';
import TableSpinner from '../components/TableSpinner.jsx';

const Devices = () => {
	const [devices, setDevices] = useState([]);
	const [pending, setPending] = useState(true);

	const { user } = useSession();
	const { token } = JSON.parse(user);

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
			name: 'serial',
			selector: (row) => row.serial,
		},
		{
			name: 'type',
			selector: (row) => row.type,
		},
		{
			name: 'name',
			selector: (row) => row.name,
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
