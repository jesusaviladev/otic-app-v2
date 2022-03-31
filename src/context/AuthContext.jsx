import { createContext, useState } from 'react';

const AuthContext = createContext({ default: null });

export const AuthContextProvider = ({ children }) => {
	//proveedor del contexto para almacenar el usuario en sesión
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
