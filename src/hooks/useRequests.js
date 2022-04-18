import { useState, useEffect, useCallback } from 'react';
import useSession from '../hooks/useSession.js';
import {
	getRequests,
	createRequest,
	deleteRequest,
} from '../services/requests.services.js';

const useRequests = () => {
	const { user } = useSession();
	const { token, role } = JSON.parse(user);

	const [requests, setRequests] = useState([]);
	const [pending, setPending] = useState(true);
	const [totalRequests, setTotalRequests] = useState(0);

	useEffect(() => {
		if (role === 'admin') {
			getRequests(token)
				.then((res) => {
					setPending(false);
					setRequests(res.data.requests);
					setTotalRequests(res.data.page.total);
				})
				.catch((error) => {
					setPending(false);
					console.log(error);
				});
		}
	}, []);

	const handleDeleteRequest = useCallback((id) => {
		return deleteRequest(token, id).then((res) => {
			setRequests((prevState) =>
				prevState.filter((request) => request.id !== id)
			);
			setTotalRequests((prevState) => prevState - 1);
		});
	}, []);

	const handleAddRequest = useCallback((data) => {
		return createRequest(token, data).then(() => {
			setTotalRequests((prevState) => prevState + 1);
		});
	}, []);

	const handleNextPage = useCallback((page) => {
		setPending(true);
		return getRequests(token, page).then((res) => {
			setPending(false);
			setRequests(res.data.requests);
			setTotalRequests(res.data.page.total);
		});
	}, []);

	return {
		requests,
		pending,
		totalRequests,
		handleNextPage,
		handleDeleteRequest,
		handleAddRequest,
	};
};

export default useRequests;
