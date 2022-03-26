import { useState, useEffect } from 'react';
import { getReports } from '../services/reports.services.js';
import useSession from '../hooks/useSession.js';
import DataTable from 'react-data-table-component';
import NoDataComponent from '../components/NoDataComponent.jsx';
import TableSpinner from '../components/TableSpinner.jsx';

const Reports = () => {
	const [reports, setReports] = useState([]);
	const [pending, setPending] = useState(true);

	const { user } = useSession();
	const { token } = JSON.parse(user);

	useEffect(() => {
		getReports(token)
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
		{
			name: 'Usuario asignado',
			selector: (row) => row.user_id,
		},
	];

	const paginationComponentOptions = {
		rowsPerPageText: 'Filas por página',
	};

	return (
		<>
			<DataTable
				title="Reportes"
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
			/>
		</>
	);
};

export default Reports;
