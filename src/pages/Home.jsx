import { useState, useEffect } from 'react';
import { getUserById } from '../services/users.services.js';
import useSession from '../hooks/useSession.js';
import Spinner from '../components/Spinner.jsx';

const Home = () => {
	const [currentUser, setCurrentUser] = useState([]);
	const [loading, setLoading] = useState(true);
	const { user } = useSession();
	const { token, id } = JSON.parse(user);

	useEffect(() => {
		getUserById(token, id)
			.then((res) => {
				setCurrentUser(res.data.user);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	}, []);

	if (loading) return <Spinner color="white" />;

	return (
		<h1 className="font-medium text-2xl md:text-3xl capitalize">
			Bienvenid@ {`${currentUser.name}`}
		</h1>
	);
};

export default Home;
