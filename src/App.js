import { Route, Routes } from 'react-router-dom';
import { NotFound } from './pages/NotFound/NotFound';
import { Intro } from './pages/Intro/Intro';
import { SignIn } from './pages/Login/SignIn';
import { Register } from './pages/Login/Register';
import { Editor } from './pages/Editor/Editor';

export function App() {
	return (
		<Routes>
			<Route
				path="*"
				element={ <NotFound /> }
			/>
			<Route
				path="/"
				element={ <Intro /> }
			/>
			<Route
				path="/signin"
				element={ <SignIn /> }
			/>
			<Route
				path="/register"
				element={ <Register /> }
			/>
			<Route
				path="/editor"
				element={ <Editor />}
			/>
		</Routes>
	);
}
