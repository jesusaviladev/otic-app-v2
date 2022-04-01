import useSession from '../hooks/useSession.js';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children, redirectPath, role }) => {
	// rutas protegidas
	// recuperamos el usuario en sesión
	let { user } = useSession();

	user = JSON.parse(user);

	// si no hay un usuario, redireccionamos
	if (!user) return <Navigate to={redirectPath} replace />;
	
	// si el usuario no tiene el rol adecuado, redireccionamos
	if (role && user.role !== role) return <Navigate to={redirectPath} />;

	return children || <Outlet />;
};

export default ProtectedRoute;
