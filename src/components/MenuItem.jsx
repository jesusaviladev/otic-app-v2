import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const MenuItem = ({ title, icon, route, children }) => {
	const [open, setOpen] = useState(false);

	const link = route || '/#';

	return (
		<>
			<li onClick={() => setOpen(!open)}>
				<NavLink to={link}>
					<div className="bg-gray-800 cursor-pointer lg:hover:bg-red-600 lg:hover:border-l-4 lg:hover:border-yellow-300 flex items-center p-4">
						<i>{icon}</i>
						<span className="mx-4">{title}</span>
					</div>
				</NavLink>
			</li>
			{open && children}
		</>
	);
};

export default MenuItem;
