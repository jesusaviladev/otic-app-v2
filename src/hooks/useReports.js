import { useState, useEffect, useCallback } from 'react';
import { getReports, deleteReport } from '../services/reports.services.js';
import useSession from '../hooks/useSession.js';

const useReports = () => {

	const [reports, setReports] = useState([]);
	const [pending, setPending] = useState(true);
	const [totalReports, setTotalReports] = useState(0);

	const { user } = useSession();
	const { token } = JSON.parse(user);

	useEffect(() => {
		getReports(token)
			.then((res) => {
				setPending(false);
				setReports(res.data.reports);
				setTotalReports(res.data.pagination.total)
			})
			.catch((error) => {
				setPending(false);
				console.log(error);
			});
	}, []);

	const handleDeleteReport = useCallback((id) => {

		return deleteReport(token, id)
		.then((res) => {
			setReports((prevState) =>
				prevState.filter((report) => report.id !== id)
			);
			setTotalReports((prevState) => prevState - 1);
		});

	}, [])

	const handleNextPage = useCallback((page) => {
			setPending(true);
			return getReports(token, page).then((res) => {
				setPending(false);
				setReports(res.data.reports);
				setTotalReports(res.data.pagination.total)
			});
	}, []);

	return {
		reports,
		pending,
		totalReports,
		handleDeleteReport,
		handleNextPage
	}
}

export default useReports