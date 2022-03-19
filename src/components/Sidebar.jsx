import { NavLink } from 'react-router-dom';
import SidebarHeader from './SidebarHeader.jsx';
import Menu from './Menu.jsx';
import SubMenu from './SubMenu.jsx';
import MenuItem from './MenuItem.jsx';

const Sidebar = ({ showMenu }) => {

	return (
		<div className="bg-black lg:max-w-xs text-gray-100 min-h-screen">
			<SidebarHeader>
				<img src="/assets/images/upt-logo.svg" alt="logo" className="h-20" />
			</SidebarHeader>
			<Menu>
				<MenuItem title="Inicio"/>
				<MenuItem title="Solicitudes">
					<SubMenu>
						<MenuItem title="Ver solicitudes"/>
						<MenuItem title="Nueva solicitud"/>
					</SubMenu>
				</MenuItem>
				<MenuItem title="Reportes">
					<SubMenu>
						<MenuItem title="Ver Reportes"/>
						<MenuItem title="Nuevo Reporte"/>
					</SubMenu>
				</MenuItem>
				<MenuItem title="Equipos">
					<SubMenu>
						<MenuItem title="Inventario"/>
					</SubMenu>
				</MenuItem>
				<MenuItem title="Usuarios">
					<SubMenu>
						<MenuItem title="Ver usuarios"/>
						<MenuItem title="Nuevo usuario"/>
						<MenuItem title="Eliminar usuario"/>
					</SubMenu>
				</MenuItem>
			</Menu>
		</div>
	);
};

export default Sidebar;
