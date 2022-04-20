import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { getReports } from '../services/reports.services.js';
import useSession from '../hooks/useSession.js';
import DataTable from 'react-data-table-component';
import NoDataComponent from '../components/NoDataComponent.jsx';
import TableSpinner from '../components/TableSpinner.jsx';
import { FaEdit, FaTrash } from 'react-icons/fa';

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
			selector: (row) => row.user.username,
		},
		{
			name: 'Editar',
			button: true,
			cell: (row) => (
				<Link to={`/admin/reportes/${row.id}`}>
					<FaEdit className="w-5 h-5 text-green-500" />
				</Link>
			),
		},
		{
			name: 'Eliminar',
			button: true,
			cell: (row) => (
				<button>
					<FaTrash className="w-5 h-5 text-red-600" />
				</button>
			),
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
				progressPending={pending}
				persistTableHead
				noDataComponent={<NoDataComponent />}
				progressComponent={<TableSpinner />}
				theme="dark"
			/>
		</>
	);
};

export default Reports;
