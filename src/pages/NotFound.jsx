import Banner from '../components/Banner.jsx';
import Header from '../components/Header.jsx';

const NotFound = () => {
	return (
		<>
			<Header>
				<Banner />
				<div className="max-w-4xl mx-auto py-2 flex justify-around lg:justify-between items-center">
					<a href="/">
						<img
							src={'/assets/images/upt-logo-2.svg'}
							alt="heading"
							className="h-8 md:h-12"
						/>
					</a>
					<p className="text-xs md:text-base font-extralight">
						Universidad Politécnica Territorial{' '}
						<span className="font-bold">{` "José Félix Ribas"`}</span>
					</p>
				</div>
			</Header>
			<main className="flex flex-col justify-center align-center h-96">
				<h1 className="flex justify-center align-center mb-8 divide-x divide-gray-600/50 font-extrabold text-3xl sm:text-7xl">
					<span className="text-red-500 px-5">404</span>
					<span className="px-2">No encontrado</span>
				</h1>
				<p className="text-center px-2">
					El recurso que ha solicitado no ha sido encontrado
				</p>
			</main>
		</>
	);
};

export default NotFound;
