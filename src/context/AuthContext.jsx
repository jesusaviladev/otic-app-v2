import { createContext, useState } from 'react';

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
