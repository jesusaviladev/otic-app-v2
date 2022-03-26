import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { adminSidebar, userSidebar } from '../config/sidebarConfig.js';
import useSession from '../hooks/useSession.js';

const Dashboard = () => {
	const [showMenu, setShowMenu] = useState(false);

	let { user } = useSession();

	user = JSON.parse(user);

	const config = user.role === 'admin' ? adminSidebar : userSidebar;

	return (
		<>
			<Header>
				<Navbar>
					<FaBars
						className="w-6 h-6 md:w-8 md:h-8 cursor-pointer lg:hidden"
						onClick={() => setShowMenu(!showMenu)}
					/>
				</Navbar>
			</Header>

			<main className="bg-gray-100 lg:flex">
				<Sidebar
					show={showMenu}
					setShow={() => setShowMenu(!showMenu)}
					items={config}
				/>
				<div className="text-black min-h-screen flex-grow p-4">
					<Outlet />
				</div>
			</main>
		</>
	);
};

export default Dashboard;
