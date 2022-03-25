import SidebarHeader from './SidebarHeader.jsx';
import Menu from './Menu.jsx';
import MenuItem from './MenuItem.jsx';
import {
	FaHome,
	FaClipboardList,
	FaClipboardCheck,
	FaDesktop,
	FaUser,
} from 'react-icons/fa';

const Sidebar = ({ show, setShow }) => {
	const className = show ? 'translate-x-0' : '-translate-x-full';

	return (
		<div
			className={
				`bg-black text-gray-100 absolute z-50 lg:static lg:translate-x-0 w-full min-h-screen lg:text-left lg:max-w-xs transition-transform duration-300 ` +
				className
			}
			onClick={() => setShow()}
		>
			<SidebarHeader>
				<img src="/assets/images/upt-logo-2.svg" alt="logo" className="h-20" />
			</SidebarHeader>
			<Menu>
				<MenuItem icon={<FaHome />} title="Inicio" route="/dashboard/" />
				<MenuItem
					icon={<FaClipboardList />}
					title="Solicitudes"
					route="/dashboard/solicitudes"
				/>
				<MenuItem
					icon={<FaClipboardCheck />}
					title="Reportes"
					route="/dashboard/reportes"
				/>
				<MenuItem
					icon={<FaDesktop />}
					title="Equipos"
					route="/dashboard/equipos"
				/>
				<MenuItem
					icon={<FaUser />}
					title="Usuarios"
					route="/admin/usuarios"
				/>
			</Menu>
		</div>
	);
};

export default Sidebar;
