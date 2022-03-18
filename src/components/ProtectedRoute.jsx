import useSession from '../hooks/useSession.js'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {

	const { token } = useSession()

	if(!token) return <Navigate to="/" replace/>

	return children
}

export default ProtectedRoute