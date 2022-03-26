import useSession from '../hooks/useSession.js';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children, redirectPath, role }) => {
	let { user } = useSession();

	user = JSON.parse(user);

	if (!user) return <Navigate to={redirectPath} replace />;

	if (role && user.role !== role) return <Navigate to={redirectPath} />;

	return children || <Outlet />;
};

export default ProtectedRoute;
