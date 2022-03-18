import Login from '../components/Login.jsx';
import Banner from '../components/Banner.jsx';
import Header from '../components/Header.jsx';

const LoginPage = () => {
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
						Universidad Politécnica Territorial
						<span className="font-bold">{` "José Félix Ribas"`}</span>
					</p>
				</div>
			</Header>
			<main>
				<h1 className="text-center font-bold text-3xl md:text-4xl my-10 px-3 sm:mt-20">
					Oficina de tecnología, información y comunicación
				</h1>
				<div className="min-w-screen mb-10 px-4">
					<Login />
				</div>
			</main>
		</>
	);
};

export default LoginPage;
