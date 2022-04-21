import { useState, useEffect } from 'react';
import { getUserById } from '../services/users.services.js';
import useSession from '../hooks/useSession.js';
import Spinner from '../components/Spinner.jsx';
import StatsCard from '../components/StatsCard.jsx';
import ListItems from '../components/ListItems.jsx';

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
	<>
		<h1 className="font-medium text-2xl md:text-3xl capitalize my-5">
			Bienvenid@ {`${currentUser.name}`}
		</h1>

		<main>

			<div className="grid grid-cols-2 gap-4 my-5">
				<StatsCard title="Total de solicitudes" content="50"/>
				<StatsCard title="Total de reportes" content="30"/>
			</div>
			
			<div className="grid lg:grid-cols-3 gap-4">

				<section className="lg:col-span-2">

					<ListItems title="Ultimas solicitudes"/>

				</section>

				<aside>
								
					<ListItems title="Ultimos reportes"/>

				</aside>

			</div>

		</main>
	</>
	);
};

export default Home;
