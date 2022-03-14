import Login from '../components/Login.jsx';

const LoginPage = () => {
	return (
		<>
			<header className="bg-neutral-900 shadow-sm">
				<div className="bg-black flex justify-center">
					<img
						src={'assets/heading.png'}
						alt="heading"
						className="w-[34rem] h-10"
					/>
				</div>
				<div className="flex justify-evenly md:justify-between items-center px-6 py-1 sm:px-40">
					<a href="/">
						<img src={'/upt-logo.svg'} alt="heading" className="h-12" />
					</a>
					<p className="text-xs md:text-base font-light">
						Universidad Politécnica Territorial {`"José Félix Ribas"`}
					</p>
				</div>
			</header>
			<main>
				<h1 className="text-center font-bold text-3xl md:text-4xl my-5 sm:mt-20 sm:mb-10">
					Oficina de tecnología, información y comunicación
				</h1>
				<Login />
			</main>
		</>
	);
};

export default LoginPage;
