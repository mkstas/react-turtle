import styles from './Input.module.scss';

export function Input({ isWrong, type, name, caption = '', placeholder = '', required = false }) {
	const attrs = { type, name, placeholder, required };

	return (
		<label className={styles.label}>
			<span className={`${styles.caption} ${!isWrong ? styles.caption_wrong : ''}`}>{caption}</span>
			<input
				className={`${styles.input} ${!isWrong ? styles.input_wrong : ''}`}
				autoComplete="off"
				{...attrs}
			/>
		</label>
	);
}
