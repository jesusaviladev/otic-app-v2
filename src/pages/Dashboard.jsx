import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx';
import { FaBars } from 'react-icons/fa'
import { useState } from 'react'

const Dashboard = () => {

	const [ showMenu, setShowMenu ] = useState(false)

	return (
		<>
			<Header>
				<Navbar>
					<FaBars className="w-6 h-6 md:w-8 md:h-8 cursor-pointer lg:hidden" onClick={() => setShowMenu(!showMenu)}/>
				</Navbar>
			</Header>

			<main className="bg-gray-200 lg:flex">
				<Sidebar show={showMenu} />
				<div className="text-black min-h-screen flex-grow">
					Home
				</div>
			</main>
		</>
	);
};

export default Dashboard;
