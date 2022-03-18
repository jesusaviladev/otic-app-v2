import { Link, Navigate } from 'react-router-dom';
import useSession from '../hooks/useSession.js'

const LandingPage = () => {

	const { token } = useSession()

	if(token) return <Navigate to="/dashboard"/>

	return (
		<>
			<h1>Landing Page</h1>

			<Link to="/login">Iniciar sesión</Link>
		</>
		)
}

export default LandingPage