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
			<h1 className="text-center font-bold text-3xl md:text-6xl my-10 px-3 sm:mt-20">Sistema de gestión de soporte técnico</h1>

			<div className="flex justify-center itemsc-center p-4">
				<Link to="/login" className="px-6 py-2 rounded bg-red-600 font-bold">Iniciar sesión</Link>
			</div>
		</>
	);
};

export default LandingPage;
