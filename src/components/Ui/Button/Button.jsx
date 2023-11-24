import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

export function Button({ text, type = 'button', url = null }) {
	return (
		<>
			{
				url
					? (
						<Link className={styles.button} to={url}>
							{ text }
						</Link>
					) : (
						<button className={styles.button} type={type}>
							{ text }
						</button>
					)
			}
		</>
	);
}
