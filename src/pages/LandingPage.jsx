import { Navigate } from 'react-router-dom';
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

			<main className="flex flex-col lg:flex-row justify-center items-center p-4 lg:p-10">
				<div className="flex flex-col justify-start items-center lg:items-start mb-10 lg:ml-16">
					<h1 className="text-center lg:text-left font-bold text-3xl md:text-6xl my-5 lg:my-10">
						Sistema de Gestión de Soporte Técnico
					</h1>
					<h2 className="text-lg text-center lg:text-left font-light my-2 lg:my-6">
						Oficina de Tecnología, Información y Comunicación
					</h2>
					<Button href="/login">Iniciar sesión</Button>
				</div>

				<img
					src="/assets/images/desktop.svg"
					alt="desktop illustration"
					className="md:max-w-lg lg:max-w-xl xl:max-w-2xl saturate-200"
				/>
				
			</main>

		</>
	);
};

export default LandingPage;
