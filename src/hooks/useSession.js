import { useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import login from '../services/login.services.js';
import AuthContext from '../context/AuthContext.jsx';

const useSession = () => {
	// hook para iniciar sesión, cerrar sesión y recuperar el usuario en sesión
	const { user, setUser } = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	const handleLogin = useCallback((username, password) => {
		setLoading(true);
		login(username, password)
			.then((res) => {
				const user = res.data;
				setLoading(false);
				const userInfo = JSON.stringify(user);
				setUser(userInfo);
				window.sessionStorage.setItem('user', userInfo);

				if (user.role === 'admin') {
					navigate('/admin', { replace: true });
				} else {
					navigate('/dashboard', { replace: true });
				}
			})
			.catch((err) => {
				setLoading(false);
				if (err.response) {
					const { error } = err.response.data;
					setError({ message: error });
				} else {
					setError({ message: 'Parece que algo va mal, intentalo más tarde' });
				}
			});
	});

	const handleLogout = useCallback(() => {
		setUser(null);
		window.sessionStorage.removeItem('user');
		navigate('/', { replace: true });
	});

	return {
		user,
		loading,
		error,
		handleLogin,
		handleLogout,
	};
};

export default useSession;
