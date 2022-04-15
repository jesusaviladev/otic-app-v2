import { createContext, useState } from 'react'

const RequestsContext = createContext({ default: null })

export const RequestsContextProvider = ({ children }) => {

	const [requests, setRequests] = useState([])

	return (
		<RequestsContext.Provider value={{ requests, setRequests }}>
			{children}
		</RequestsContext.Provider>
		)
}

export default RequestsContext