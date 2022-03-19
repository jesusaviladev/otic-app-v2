import Banner from '../components/Banner.jsx';
import Header from '../components/Header.jsx';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<>
			<Header>
				<Banner />
			</Header>
			<main className="flex flex-col justify-center align-center h-96">
				<h1 className="flex justify-center align-center mb-8 divide-x divide-gray-600/50 font-extrabold text-3xl sm:text-7xl">
					<span className="text-red-500 px-5">404</span>
					<span className="px-2">No encontrado</span>
				</h1>
				<p className="text-center px-2">
					El recurso que ha solicitado no ha sido encontrado
				</p>
				<Link to="/">Volver a inicio</Link>
			</main>
		</>
	);
};

export default NotFound;
