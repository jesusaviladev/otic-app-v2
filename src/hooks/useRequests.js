import { useState, useEffect, useCallback, useContext } from 'react';
import useSession from '../hooks/useSession.js';
import { getRequests, createRequest, deleteRequest } from '../services/requests.services.js';

const useRequests = () => {
	const { user } = useSession();
	const { token } = JSON.parse(user);

	const [requests, setRequests] = useState([])
	const [pending, setPending] = useState(true);

	useEffect(() => {
		getRequests(token)
			.then((res) => {
				setPending(false);
				setRequests(res.data.requests);
			})
			.catch((error) => {
				setPending(false);
				console.log(error);
			});
	}, []);

	const handleDeleteRequest = useCallback((id) => {
			return deleteRequest(token, id)
				.then((res) => {
					setRequests((prevState) =>
						prevState.filter((request) => request.id !== id)
					);
				})
		});

	const handleAddRequest = useCallback((data) => {
		return createRequest(data)
			.then((res) => {
				setRequests((prevState) => prevState.concat(res.data.request))
			})
	})

	return {
		requests,
		pending,
		handleDeleteRequest,
		handleAddRequest
	}
}

export default useRequests