import { createContext, useState } from 'react';

const AppContext = createContext();

function AppProvider({ children }) {
	const [token, setToken] = useState('');
	const [authorized, setAuthorized] = useState(false);

	const values = {
		token, setToken,
		authorized, setAuthorized
	};

	return (
		<AppContext.Provider value={values}>
			{ children }
		</AppContext.Provider>
	);
}

export { AppContext, AppProvider };
