import { createContext, useState } from 'react';

const AuthContext = createContext({ default: null });

export const AuthContextProvider = ({ children }) => {
	const [token, setToken] = useState(
		() => sessionStorage.getItem('token') || null
	);

	return (
		<AuthContext.Provider value={{ token, setToken }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
