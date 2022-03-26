import { useState, useEffect } from 'react';
import { getUserReports } from '../services/users.services.js';
import useSession from '../hooks/useSession.js';
import DataTable from 'react-data-table-component';
import NoDataComponent from '../components/NoDataComponent.jsx';
import TableSpinner from '../components/TableSpinner.jsx';

const UserReports = () => {
	const [reports, setReports] = useState([]);
	const [pending, setPending] = useState(true);

	const { user } = useSession();
	const { token, id } = JSON.parse(user);

	useEffect(() => {
		getUserReports(token, id)
			.then((res) => {
				setPending(false);
				setReports(res.data.reports);
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
			name: 'Comentario',
			selector: (row) => row.comment,
		},
		{
			name: 'Fecha',
			selector: (row) => row.date,
		},
	];

	const paginationComponentOptions = {
		rowsPerPageText: 'Filas por página',
	};

	return (
		<>
			<DataTable
				title="Mis reportes"
				columns={columns}
				data={reports}
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

export default UserReports;
