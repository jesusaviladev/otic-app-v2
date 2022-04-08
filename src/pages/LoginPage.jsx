import Login from '../components/Login.jsx';
import Banner from '../components/Banner.jsx';
import Header from '../components/Header.jsx';

const LoginPage = () => {
	return (
		<>
			<Header>
				<Banner />
			</Header>
			<main>
				<h1 className="text-center font-bold text-3xl md:text-4xl my-10 px-3 sm:mt-20">
					Oficina de Tecnología, Información y Comunicación
				</h1>
				<div className="min-w-screen mb-10 px-4">
					<Login />
				</div>
			</main>
		</>
	);
};

export default LoginPage;
