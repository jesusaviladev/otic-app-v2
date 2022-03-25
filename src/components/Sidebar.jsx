import SidebarHeader from './SidebarHeader.jsx';
import Menu from './Menu.jsx';
import MenuItem from './MenuItem.jsx';

const Sidebar = ({ show, setShow, items }) => {
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
				{
					items.map(item => <MenuItem
						icon={item.icon}
						title={item.title}
						route={item.route}
						key={item.title}
						/>)
				}
			</Menu>
		</div>
	);
};

export default Sidebar;
