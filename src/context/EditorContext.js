import { createContext, useState } from 'react';

const EditorContext = createContext();

function EditorProvider({ children }) {
	const [html, setHtml] = useState('');
	const [css, setCss] = useState('');
	const [js, setJs] = useState('');

	const values = { html, setHtml, css, setCss, js, setJs };

	return (
		<EditorContext.Provider value={values}>
			{ children }
		</EditorContext.Provider>
	);
}

export { EditorContext, EditorProvider };
