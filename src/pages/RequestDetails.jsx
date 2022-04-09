import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import useSession from '../hooks/useSession.js';
import { getRequestById } from '../services/requests.services.js'

const RequestDetails = () => {

	const { id } = useParams()

	const { user } = useSession();

	const { token } = JSON.parse(user);

	const [request, setRequest] = useState([]) 

	useEffect(() => {


	getRequestById(token, id)
	.then(res => {
		setRequest(prevRequest => prevRequest.concat(res.data.request))
	})
	.catch(err => console.log(err))

	}, [])

	console.log(request)

	return (
		<>
		<h2>Editar solicitud {id}</h2>

		<form>
			

		</form>

		<Link to="/admin/solicitudes">Volver</Link>
		</>
		)
}

export default RequestDetails