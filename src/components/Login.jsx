import { useState } from 'react';
import Spinner from '../components/Spinner.jsx';
import useSession from '../hooks/useSession.js'

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [visible, setVisible] = useState(false);
	const { handleLogin, loading, error } = useSession()

	const handleSubmit = (e) => {
		e.preventDefault();
		handleLogin(username, password)
	};

	return (
			<div className="max-w-lg mx-auto bg-slate-700 rounded-lg shadow-lg p-6 sm:p-10">
				<div className="mb-14">
					<img
						src={'/assets/images/upt-logo-2.svg'}
						alt="logo"
						className="h-36 mx-auto mb-6"
					/>
					<h2 className="text-center text-2xl font-bold">Iniciar sesión</h2>
				</div>
				<form action="#" onSubmit={handleSubmit}>
					{error && 'Usuario o contraseña incorrectos'}
					<div className="flex flex-col justify-center mb-2">
						<div>
							<label htmlFor="username"></label>
							<input
								type="text"
								placeholder="Usuario"
								name="usuario"
								autoFocus
								className="w-full py-3 px-3 mb-1 bg-gray-800 shadow appearance-none rounded leading-tight outline-none focus:ring ring-red-600"
								onChange={(e) => setUsername(e.target.value)}
								value={username}
							/>
						</div>
						<div className="relative">
							<label htmlFor="password"></label>
							<input
								type={visible ? 'text' : 'password'}
								placeholder="Contraseña"
								name="password"
								className="w-full py-3 px-3 mb-1 bg-gray-800 shadow appearance-none rounded leading-tight outline-none focus:ring ring-red-600"
								onChange={(e) => setPassword(e.target.value)}
								value={password}
							/>
							<img
								src={
									visible
										? '/assets/icons/visibility-off.svg'
										: '/assets/icons/visibility.svg'
								}
								alt="visibility"
								className="absolute right-4 top-1/2 -translate-y-[0.9rem] hover:cursor-pointer"
								onClick={(e) => setVisible(!visible)}
							/>
						</div>
					</div>
					<div className="mb-6 text-right">
						<a href="#" className="text-xs md:text-sm hover:text-yellow-400">
							¿Olvidaste tu contraseña?
						</a>
					</div>
					<div className="mb-2">
						<button
							disabled={!!loading}
							className="flex justify-center appearance-none w-full p-3 bg-red-600 font-medium rounded-md hover:bg-red-700"
						>
							{loading ? <Spinner /> : 'Iniciar sesión'}
						</button>
					</div>
				</form>
			</div>
	);
};

export default Login;
