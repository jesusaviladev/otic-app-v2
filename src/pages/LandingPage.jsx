import { Link, Navigate } from 'react-router-dom';
import useSession from '../hooks/useSession.js';
import Header from '../components/Header.jsx';
import Banner from '../components/Banner.jsx';

const LandingPage = () => {
	const { token } = useSession();

	if (token) return <Navigate to="/dashboard" />;

	return (
		<>
			<Header>
				<Banner />
			</Header>
			<h1>Sistema de gestión de servicios OTIC</h1>

			<Link to="/login">Iniciar sesión</Link>
		</>
	);
};

export default LandingPage;
