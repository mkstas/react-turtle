import { useState } from 'react';
import { useEffect } from 'react';
import { useMemo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../../api/api';
import { AppContext } from '../../../context/AppContext';
import { EditorContext } from '../../../context/EditorContext';
import styles from './Preview.module.scss';

export function Preview() {
	const [userName, setUserName] = useState('');
	const { html, css, js, setHtml, setCss, setJs } = useContext(EditorContext);
	const { token, setToken, setAuthorized } = useContext(AppContext);
	const navigate = useNavigate();

	useEffect(() => {
		async function getUserData() {
			const response = await postData('/user', {
				token: token
			});

			setUserName(response.username);
		}

		getUserData();
	}, [token, setUserName]);

	async function clearCode() {
		setHtml('');
		setCss('');
		setJs('');

		await postData('/code', {
			action: 'delete',
			token: token
		});
	}

	async function saveCode() {
		await postData('/code', {
			action: 'post',
			token: token,
			html: html,
			css: css,
			js: js
		});
	}

	function logoutUser() {
		localStorage.removeItem('token');
		setAuthorized(false);
		setToken('');
		return navigate('/');
	}

	const document = useMemo(() => {
		if (!html && !css && !js) return

		return (
			`<!DOCTYPE html>
			<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<style>
						${css}
					</style>
				</head>
				<body>
					${html}
					<script>
						${js}
					</script>
				</body>
			</html>`
		);
	}, [html, css, js]);

	return (
		<div className={styles.wrapper}>
			<header className={styles.header}>
				<span className={styles.nickname}>{userName}</span>
				<button className={styles.save} onClick={clearCode}>
					<img className={styles.icon} src="./images/icons/clear.svg" alt="Удалить весь код" />
				</button>
				<button className={styles.save} onClick={saveCode}>
					<img className={styles.icon} src="./images/icons/save.svg" alt="Сохранить" />
				</button>
				<button className={styles.exit} onClick={logoutUser}>
					<img className={styles.icon} src="./images/icons/logout.svg" alt="Выход из аккаунта" />
					<span className={styles.logout}>Выйти</span>
				</button>
			</header>
			<div className={styles.content}>
				{document
					? <iframe className={styles.view} title="view" srcDoc={document} />
					: <div className={styles.loading}>Результат вашего кода отоброзится здесь</div>}
			</div>
		</div>
	);
}
