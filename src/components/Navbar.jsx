import useSession from '../hooks/useSession.js'

const Navbar = ({ children }) => {

	const { handleLogout } = useSession()

	return (
		<div className="p-4 flex justify-between align-center lg:justify-end">
			{children}
			<button onClick={() => handleLogout()}>Cerrar sesión</button>
		</div>
	);
};

export default Navbar;
