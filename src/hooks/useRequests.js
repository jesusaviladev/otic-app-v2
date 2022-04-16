import { useState, useEffect, useCallback } from 'react';
import useSession from '../hooks/useSession.js';
import {
	getRequests,
	createRequest,
	deleteRequest,
} from '../services/requests.services.js';
import axios from 'axios';

const useRequests = () => {
	const { user } = useSession();
	const { token, role } = JSON.parse(user);

	const [requests, setRequests] = useState([]);
	const [pending, setPending] = useState(true);
	const [nextPage, setNextPage] = useState(null);

	useEffect(() => {
		if (role === 'admin') {
			getRequests(token)
				.then((res) => {
					setPending(false);
					setRequests(res.data.requests);
					setNextPage(res.data.page.next);
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
		});
	});

	const handleAddRequest = useCallback((data) => {
		return createRequest(token, data).then((res) => {
			const { request } = res.data;

			setRequests((prevState) => prevState.concat(request));
		});
	});

	const handleNextPage = (page, limit) => {
		console.log(page, limit)
		return axios({
			method: 'get',
			url: nextPage,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => {
			console.log(res);
			setRequests(res.data.requests);
			setNextPage(res.data.page.next);
		});
	};

	return {
		requests,
		pending,
		handleNextPage,
		handleDeleteRequest,
		handleAddRequest,
	};
};

export default useRequests;
