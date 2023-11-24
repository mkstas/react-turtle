import styles from './Example.module.scss';

export function Example({ title, action, imageUrl, alt }) {
	return (
		<div className={styles.example}>
			<div className={styles.text}>
				<h3 className={styles.title}>{title}</h3>
				<h4 className={styles.subtitle}>{action}</h4>
			</div>
			<picture className={styles.picture}>
				<img className={styles.image} src={imageUrl} alt={alt} />
			</picture>
		</div>
	);
}
