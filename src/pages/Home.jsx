import { useState, useEffect } from 'react';
import { getUserById, getUserRequests } from '../services/users.services.js';
import { getRequests } from '../services/requests.services.js'
import { getReports } from '../services/reports.services.js'
import useSession from '../hooks/useSession.js';
import Spinner from '../components/Spinner.jsx';
import StatsCard from '../components/StatsCard.jsx';
import RequestsList from '../components/RequestsList.jsx';
import ReportsList from '../components/ReportsList.jsx';

const Home = () => {
	const [currentUser, setCurrentUser] = useState([]);
	const [requests, setRequests] = useState([])
	const [totalRequests, setTotalRequests] = useState(0)
	const [pendingRequests, setPendingRequests] = useState(0)
	const [userRequests, setUserRequests] = useState([])
	const [reports, setReports] = useState([])
	const [totalReports, setTotalReports] = useState(0)
	const [loading, setLoading] = useState(true);
	const { user } = useSession();
	const { token, id, role } = JSON.parse(user);

	useEffect(() => {
		getUserRequests(token, id)
			.then((res) => {
				setCurrentUser(res.data);
				setLoading(false);

				if(res.data.requests.length > 0){
					const pending = res.data.requests.filter(request => request.status_id === 2)
					setPendingRequests(pending)
					setUserRequests(res.data.requests.reverse().slice(0, 6))
				}
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		if(role === 'admin'){
			getRequests({ token, page: 1, limit: 5, sortBy: 'date', orderBy: 'desc'})
				.then((res) => {
					setRequests(res.data.requests);
					setTotalRequests(res.data.page.total)
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	useEffect(() => {

		if(role === 'admin'){
			getReports({ token, limit: 5, sortBy: 'date', orderBy: 'desc'})
				.then((res) => {
					setReports(res.data.reports)
					setTotalReports(res.data.pagination.total)
				})
				.catch((err) => console.log(err))
		}

	}, [])

	if (loading) return <Spinner color="white" />;

	return (
	<>
		<h1 className="font-medium text-2xl md:text-3xl capitalize my-5">
			Bienvenid@ {`${currentUser.name}`}
		</h1>

		<main>

			{
				role === 'admin' ? 
				<>
					<div className="grid grid-cols-2 gap-4 my-5">
						<StatsCard title="Total de solicitudes" content={totalRequests}/>
						<StatsCard title="Total de reportes" content={totalReports}/>
					</div> 
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

						<section className="lg:col-span-2">

							<RequestsList title="Ultimas solicitudes" requests={requests} link={'/admin/solicitudes'}/>

						</section>

						<aside>
							
							<ReportsList title="Ultimos reportes" reports={reports} link={'/admin/reportes'}/>

						</aside>

					</div>
				</>
				: 	<>

					<div className="my-5">
						<StatsCard title="Solicitudes pendientes" content={pendingRequests.length}/>
					</div>

					<section>
						
						<RequestsList title="Ultimas solicitudes asignadas" requests={userRequests} link="/dashboard/solicitudes"/>

					</section>

					</>
			}

		</main>
	</>
	);
};

export default Home;
