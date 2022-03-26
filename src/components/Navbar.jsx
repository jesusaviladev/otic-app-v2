import useSession from '../hooks/useSession.js';
import { FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ children }) => {
	const { handleLogout } = useSession();

	return (
		<div className="bg-black p-4 flex justify-between items-center lg:justify-end">
			{children}
			<div className="flex items-center">
				<button onClick={() => handleLogout()}>Cerrar sesión</button>
				<i className="ml-4">
					<FaSignOutAlt />
				</i>
			</div>
		</div>
	);
};

export default Navbar;
