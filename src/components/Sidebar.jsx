import { NavLink } from 'react-router-dom'

const Sidebar = (showMenu) => {
	return (
		<nav className={`bg-black lg:max-w-xs`}>
			<div className="p-4">
				<img src="/assets/images/upt-logo.svg" alt="logo" className="h-12 md:h-32"/>
			</div>
			<ul>
				<li>Solicitudes
					<ul>
						<li>
							<NavLink to="/">Ver solicitudes</NavLink>
						</li>
						<li>
							<NavLink to="/">Crear nueva solicitud</NavLink>
						</li>
					</ul>
				</li>
				<li>Reportes
					<ul>
						<li>
							<NavLink to="/">Ver reportes</NavLink>
						</li>
						<li>
							<NavLink to="/">Crear nuevo reporte</NavLink>
						</li>
					</ul>
				</li>
				<li>Equipos
					<ul>
						<li>
							<NavLink to="/">Inventario</NavLink>
						</li>
					</ul>
				</li>
				<li>Usuarios
					<ul>
						<li>
							<NavLink to="/">Ver usuarios</NavLink>
						</li>
						<li>
							<NavLink to="/">Nuevo usuario</NavLink>
						</li>
						<li>
							<NavLink to="/">Eliminar usuario</NavLink>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
	);
};

export default Sidebar;
