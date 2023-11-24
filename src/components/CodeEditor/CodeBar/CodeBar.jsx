import { useState, useContext, useEffect } from 'react';
import { EditorContext } from '../../../context/EditorContext';
import { HtmlEditor } from '../Editor/HtmlEditor';
import { CssEditor } from '../Editor/CssEditor';
import { JsEditor } from '../Editor/JsEditor';
import styles from './CodeBar.module.scss';
import { AppContext } from '../../../context/AppContext';
import { postData } from '../../../api/api';

export function CodeBar() {
	const { token } = useContext(AppContext);
	const { setHtml, setCss, setJs } = useContext(EditorContext);
	const [activeTab, setActiveTab] = useState('html');

	useEffect(() => {
		async function getCode() {
			const response = await postData('/code', {
				action: 'get',
				token: token
			});

			setHtml(response.html);
			setCss(response.css);
			setJs(response.js);
		}

		getCode();
	}, [setHtml, setCss, setJs, token]);

	return (
		<div className={styles.wrapper}>
			<nav className={styles.nav}>
				<button
					className={`${styles.tab} ${activeTab === 'html' ? styles.activeTab : ''}`}
					onClick={() => setActiveTab('html')}
				>
					HTML
				</button>
				<button
					className={`${styles.tab} ${activeTab === 'css' ? styles.activeTab : ''}`}
					onClick={() => setActiveTab('css')}
				>
					CSS
				</button>
				<button
					className={`${styles.tab} ${activeTab === 'js' ? styles.activeTab : ''}`}
					onClick={() => setActiveTab('js')}
				>
					JS
				</button>
			</nav>

			<div className={styles.editor}>
				{ activeTab === 'html' ? <HtmlEditor /> : null }
				{ activeTab === 'css' ? <CssEditor /> : null }
				{ activeTab === 'js' ? <JsEditor /> : null }
			</div>
		</div>
	);
}
