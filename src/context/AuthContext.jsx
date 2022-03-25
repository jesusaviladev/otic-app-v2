import { createContext, useState, useEffect } from 'react';
import { getUserById } from '../services/users.services.js'

const AuthContext = createContext({ default: null });

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(
		() => sessionStorage.getItem('user') || null
	);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
