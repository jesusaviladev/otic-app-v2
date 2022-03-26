import { Link, Navigate } from 'react-router-dom';
import useSession from '../hooks/useSession.js';
import Header from '../components/Header.jsx';
import Banner from '../components/Banner.jsx';
import Button from '../components/Button.jsx';

const LandingPage = () => {
	const { user } = useSession();

	if (user) {
		const { role } = JSON.parse(user);

		if (role === 'admin') {
			return <Navigate to="/admin" />;
		} else {
			return <Navigate to="/dashboard" />;
		}
	}

	return (
		<>
			<Header>
				<Banner />
			</Header>
			<h1 className="text-center font-bold text-3xl md:text-6xl my-10 px-3 sm:mt-20">
				Sistema de gestión de soporte técnico
			</h1>

			<div className="flex justify-center itemsc-center p-4">
				<Button href="/login">Iniciar sesión</Button>
			</div>
		</>
	);
};

export default LandingPage;
