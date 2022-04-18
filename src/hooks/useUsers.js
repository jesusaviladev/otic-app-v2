import { useState, useEffect, useCallback } from 'react';
import { getUsers, createUser, deleteUser } from '../services/users.services.js';
import useSession from '../hooks/useSession.js';

const useUsers = () => {

	const [users, setUsers] = useState([]);
	const [totalUsers, setTotalUsers] = useState(0)
	const [pending, setPending] = useState(true);

	const { user } = useSession();
	const { token } = JSON.parse(user);

	useEffect(() => {
		getUsers(token)
			.then((res) => {
				setPending(false);
				setUsers(res.data.users);
				setTotalUsers(res.data.pagination.total)
			})
			.catch((error) => {
				setPending(false);
				console.log(error);
			});
	}, []);

	const handleAddUser = useCallback((data) => {

		return createUser(token, data)
			.then(() => {
				setTotalUsers((prevState) => prevState + 1);
			})


	}, [])

	const handleDeleteUser = useCallback((id) => {

		return deleteUser(token, id)
			.then(() => {
				setUsers((prevState) =>
					prevState.filter((user) => user.id !== id)
				);
			setTotalUsers((prevState) => prevState - 1);
			})

	}, [])

	const handleNextPage = useCallback((page) => {
		setPending(true);
		return getUsers(token, page).then((res) => {
			setPending(false);
			setUsers(res.data.users);
			setTotalUsers(res.data.pagination.total);
		});
	}, []);

	return {
		users,
		totalUsers,
		pending,
		handleAddUser,
		handleDeleteUser,
		handleNextPage
	}
};

export default useUsers;
