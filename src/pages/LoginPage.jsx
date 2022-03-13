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
				<div className="h-16 flex justify-start sm:justify-between items-center px-4 sm:px-40">
					<a href="/">
						<img
							src={'/upt-logo.svg'}
							alt="heading"
							className="h-12"
						/>
					</a>
					<p className="text-md ml-8">
						Universidad Politécnica Territorial "José Félix Ribas"
					</p>
				</div>
			</header>
			<main className="min-h-screen">
				<h1 className="text-center font-medium text-3xl my-5">
					Oficina de tecnología, información y comunicación
				</h1>
				<Login />
			</main>
		</>
	);
};

export default LoginPage;
