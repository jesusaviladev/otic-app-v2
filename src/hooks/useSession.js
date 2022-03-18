import { useContext, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import login from '../services/login.services.js';
import AuthContext from '../context/AuthContext.jsx'

const useSession = () => {

	const { token, setToken } = useContext(AuthContext)
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleLogin = useCallback((username, password) => {
		setLoading(true);
		login(username, password)
			.then((res) => {
				setLoading(false);
				const { token } = res.data
				setToken(token)
				window.sessionStorage.setItem('token', token)
				navigate('/dashboard', { replace: true })
			})
			.catch((error) => {
				setLoading(false);
				setError(true);
				console.log(error.response);
			})
	})

	const handleLogout = useCallback(() => {
		setToken(null)
		window.sessionStorage.deleteItem('token')
		navigate('/', { replace: true })
	})

	return {
		token,
		loading,
		error,
		handleLogin,
		handleLogout
	}
}

export default useSession