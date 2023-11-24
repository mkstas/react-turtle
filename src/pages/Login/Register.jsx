import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated, easings } from 'react-spring';
import { AppContext } from '../../context/AppContext';
import { postData } from '../../api/api';
import { FormHeader } from '../../components/Introduction/FormHeader/FormHeader';
import { Input } from '../../components/Ui/Input/Input';
import { Button } from '../../components/Ui/Button/Button';
import styles from './Login.module.scss';

export function Register() {
	const [loaded, setLoaded] = useState(false);
	const { authorized, setAuthorized, setToken } = useContext(AppContext);
	const navigate = useNavigate();

	const [freeNickname, setFreeNicknmae] = useState(true);
	const [freeEmail, setFreeEmail] = useState(true);
	const [matchedPasswords, setMatchedPasswords] = useState(true);

	if (localStorage.getItem('token')) {
		setAuthorized(true);
		const token = JSON.parse(localStorage.getItem('token'));
		setToken(token);
	}

	useEffect(() => {
		if (authorized) {
			return navigate('/editor');
		}
		setLoaded(true);
	}, [authorized, loaded, navigate]);

	async function registerUser(e) {
		e.preventDefault();
		const formData = new FormData(e.target);

		if (formData.get('password') !== formData.get('password_confirm')) {
			setMatchedPasswords(false);
			return;
		}

		const data = {
			nickname: formData.get('nickname'),
			email: formData.get('email'),
			password: formData.get('password')
		}

		const response = await postData('/register', data);

		if (response.message === 'nickname') {
			setMatchedPasswords(true);
			setFreeNicknmae(false);
		} else if (response.message === 'email') {
			setFreeNicknmae(true);
			setFreeEmail(false);
		} else if(response.message === 'Success') {
			setFreeEmail(true);
			setAuthorized(true);
			localStorage.setItem('token', JSON.stringify(response.token));
		}
	}

	const inputs = {
		nickname: {
			caption: freeNickname ? 'Как вас называть?' : 'Никнейм уже занят',
			type: 'text',
			name: 'nickname',
			placeholder: 'User',
			required: true,
			isWrong: freeNickname
		},
		email: {
			caption: freeEmail ? 'Электронная почта' : 'Электронная почта уже занята',
			type: 'email',
			name: 'email',
			placeholder: 'user@mail.com',
			required: true,
			isWrong: freeEmail
		},
		password: {
			caption: 'Пароль',
			type: 'password',
			name: 'password',
			placeholder: 'password',
			required: true,
			isWrong: matchedPasswords
		},
		passwordConfirm: {
			caption: matchedPasswords ? 'Повторите пароль' : 'Пароли не совпадают',
			type: 'password',
			name: 'password_confirm',
			placeholder: 'password',
			required: true,
			isWrong: matchedPasswords
		}
	}

	const animateEmail = useSpring({
		from: {
			opacity: 0,
			transform: 'translate(-100%, 0)'
		},
		to: {
			opacity: 1,
			transform: 'translate(0, 0)'
		},
		config: {
			duration: 1000,
			easing: easings.easeInOutCubic
		},
		delay: 200
	});

	const animatePassword = useSpring({
		from: {
			opacity: 0,
			transform: 'translate(100%, 0)'
		},
		to: {
			opacity: 1,
			transform: 'translate(0, 0)'
		},
		config: {
			duration: 1000,
			easing: easings.easeInOutQuad
		},
		delay: 600
	});

	const animateButton = useSpring({
		from: {
			opacity: 0,
			transform: 'translate(0, 100%)'
		},
		to: {
			opacity: 1,
			transform: 'translate(0, 0)'
		},
		config: {
			duration: 1000,
			easing: easings.easeInOutCubic
		},
		delay: 1000
	});

	return (
		<div className={styles.wrapper}>
			<FormHeader
				title="Регистрация"
				linkCaption="Авторизация"
				linkPath="/signin"
			/>
			<form className={styles.form} method="post" onSubmit={registerUser}>
				<animated.fieldset className={styles.fieldset} data-direct="right" style={animateEmail}>
					<Input {...inputs.nickname} />
					<Input {...inputs.email} />
				</animated.fieldset>
				<animated.fieldset className={styles.fieldset} data-direct="right" style={animatePassword}>
					<Input {...inputs.password} />
					<Input {...inputs.passwordConfirm} />
				</animated.fieldset>

				<animated.div style={animateButton}>
					<Button text="Зарегестрироваться" type="submit" />
				</animated.div>
			</form>
		</div>
	);
}
