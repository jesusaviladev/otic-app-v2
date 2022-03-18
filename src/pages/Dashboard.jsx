import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { FaBars } from 'react-icons/fa'
import { useState } from 'react'

const Dashboard = () => {

	const [ showMenu, setShowMenu ] = useState(false)

	return (
		<>
			<Header>
				<FaBars className="w-6 h-6 md:w-8 md:h-8 cursor-pointer"/>
			</Header>

			<main className="bg-gray-200">
				<Sidebar />
			</main>
		</>
	);
};

export default Dashboard;
