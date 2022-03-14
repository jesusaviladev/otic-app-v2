const Login = () => {
	return (
		<div className="min-w-screen mb-10 p-4">
			<div className="max-w-lg mx-auto bg-slate-700 rounded shadow-lg p-6 sm:p-10">
				<div className="mb-14">
					<img src={'/upt-logo.svg'} alt="logo" className="h-36 mx-auto mb-6" />
					<h2 className="text-center text-2xl font-bold">Iniciar sesión</h2>
				</div>
				<form action="#">
					<div className="flex flex-col justify-center mb-2">
						<div>
							<label htmlFor="username"></label>
							<input
								type="text"
								placeholder="Usuario"
								name="usuario"
								autoFocus
								className="w-full py-3 px-3 mb-1 bg-gray-800 shadow appearance-none rounded leading-tight outline-none focus:ring ring-sky-500"
							/>
						</div>
						<div className="relative">
							<label htmlFor="password"></label>
							<input
								type="password"
								placeholder="Contraseña"
								name="password"
								className="w-full py-3 px-3 mb-1 bg-gray-800 shadow appearance-none rounded leading-tight outline-none focus:ring ring-sky-500"
							/>
							<img 
							src="/assets/icons/visibility.svg" 
							alt="visibility"
							className="absolute right-4 top-1/2 -translate-y-[0.9rem] hover:cursor-pointer"
							/>
						</div>
					</div>
					<div className="mb-6 text-right text-sky-500">
						<a href="#" className="text-xs md:text-sm hover:text-sky-400">
							¿Olvidaste tu contraseña?
						</a>
					</div>
					<div className="mb-2">
						<button className="appearance-none w-full p-3 bg-sky-500 font-medium rounded-md hover:bg-sky-600">
							Iniciar sesión
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
