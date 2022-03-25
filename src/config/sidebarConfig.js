import {
	FaHome,
	FaClipboardList,
	FaClipboardCheck,
	FaDesktop,
	FaUser,
} from 'react-icons/fa';

export const adminSidebar = [
	{
		title: 'Inicio',
		route: '/admin/',
		icon: FaHome()
	},
	{
		title: 'Solicitudes',
		route: '/admin/solicitudes',
		icon: FaClipboardList()
	},
	{
		title: 'Reportes',
		route: '/admin/reportes',
		icon: FaClipboardCheck()
	},
	{
		title: 'Equipos',
		route: '/admin/equipos',
		icon: FaDesktop()
	},
	{
		title: 'Usuarios',
		route: '/admin/usuarios',
		icon: FaUser()
	},

]

export const userSidebar = [
	{
		title: 'Inicio',
		route: '/dashboard/',
		icon: FaHome()
	},
	{
		title: 'Mis solicitudes',
		route: '/dashboard/solicitudes',
		icon: FaClipboardList()
	},
	{
		title: 'Mis reportes',
		route: '/dashboard/reportes',
		icon: FaClipboardCheck()
	},
	{
		title: 'Equipos',
		route: '/dashboard/equipos',
		icon: FaDesktop()
	},
]

