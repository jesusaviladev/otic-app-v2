import Banner from '../components/Banner.jsx';
import Header from '../components/Header.jsx';
import Button from '../components/Button.jsx';

const NotFound = () => {
	return (
		<>
			<Header>
				<Banner />
			</Header>
			<main className="flex flex-col justify-center items-center h-96">
				<h1 className="flex justify-center items-center mb-8 divide-x divide-gray-600/50 font-extrabold text-3xl sm:text-7xl">
					<span className="text-red-500 px-5">404</span>
					<span className="px-2">No encontrado</span>
				</h1>
				<p className="text-center px-2">
					El recurso que ha solicitado no ha sido encontrado
				</p>
				<div className="flex justify-center itemsc-center p-4">
					<Button href="/">Volver al inicio</Button>
				</div>
			</main>
		</>
	);
};

export default NotFound;
