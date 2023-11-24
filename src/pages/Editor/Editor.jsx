import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { EditorProvider } from '../../context/EditorContext';
import { CodeBar } from '../../components/CodeEditor/CodeBar/CodeBar';
import { Preview } from '../../components/CodeEditor/Preview/Preview';
import { NotSign } from '../../components/NotSign/NotSign';
import styles from './Editor.module.scss';

export function Editor() {
	const { authorized, setAuthorized, setToken } = useContext(AppContext);

	if (localStorage.getItem('token')) {
		setAuthorized(true);
		const token = JSON.parse(localStorage.getItem('token'));
		setToken(token);
	}

	return (
		<>
			{authorized
				? (
					<EditorProvider>
						<div className={styles.wrapper}>
							<CodeBar />
							<Preview />
						</div>
					</EditorProvider>
				) : (
					<NotSign />
				)}
		</>
	);
}
