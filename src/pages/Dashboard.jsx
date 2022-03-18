import Header from '../components/Header.jsx'
import Sidebar from '../components/Sidebar.jsx'

const Dashboard = () => {
	return (
		<>

			<Header>
				<img
					src={'/assets/images/upt-logo-2.svg'}
					alt="heading"
					className="h-8 md:h-12"
				/>	
			</Header>

			<main className="bg-gray-200">
				<Sidebar/>
			</main>
		</>
	);
};

export default Dashboard;
