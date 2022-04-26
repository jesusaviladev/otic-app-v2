import { useState } from 'react';
import Spinner from '../components/Spinner.jsx';
import PasswordField from '../components/PasswordField.jsx';
import useSession from '../hooks/useSession.js';
import ErrorMessage from '../components/ErrorMessage.jsx';

const Login = () => {
	// refactorizar
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { handleLogin, loading, error } = useSession();

	const handleSubmit = (e) => {
		// iniciamos sesion

		const user = username.trim()
		const pass = password.trim()

		e.preventDefault();
		handleLogin(user, pass);
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
				{error && <ErrorMessage message={error.message} />}
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
					<PasswordField
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="mb-6 text-right">
				{/*	<a href="#" className="text-xs md:text-sm hover:text-yellow-400">
						¿Olvidaste tu contraseña?
					</a> */}
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
