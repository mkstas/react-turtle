import { Link } from "react-router-dom";
import styles from "./FormHeader.module.scss";

export const FormHeader = ({ title, linkCaption, linkPath }) => {
	return (
		<header className={styles.header}>
			<h1 className={styles.title}>{title}</h1>
			<Link className={styles.link} to={linkPath}>
				{linkCaption}
			</Link>
		</header>
	);
};
