import { Button } from '../../components/Ui/Button/Button';
import styles from './NotFound.module.scss';

export function NotFound() {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.message}>
					<h1 className={styles.title}>Ничего не найдено</h1>
					<h2 className={styles.subtitle}>Похоже, данной страницы не существует...</h2>
				</div>
				<Button url="/" text="Вернуться на сайт" />
			</div>
		</div>
	);
}
