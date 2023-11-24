import { Button } from '../Ui/Button/Button';
import styles from './NotSign.module.scss';

export function NotSign() {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.message}>
					<h1 className={styles.title}>Вы не авторизванны</h1>
					<h2 className={styles.subtitle}>Для работы неообходимо войти в аккаунт</h2>
				</div>
				<Button url="/signin" text="Войти" />
			</div>
		</div>
	);
}
