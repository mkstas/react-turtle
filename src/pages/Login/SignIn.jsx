import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated, easings } from 'react-spring';
import { AppContext } from '../../context/AppContext';
import { postData } from '../../api/api';
import { FormHeader } from '../../components/Introduction/FormHeader/FormHeader';
import { Input } from '../../components/Ui/Input/Input';
import { Button } from '../../components/Ui/Button/Button';
import styles from './Login.module.scss';

export function SignIn() {
	const [loaded, setLoaded] = useState(false);
	const { authorized, setAuthorized, setToken } = useContext(AppContext);
	const navigate = useNavigate();

	const [trueEmail, setTrueEmail] = useState(true);
	const [truePassword, setTruePassword] = useState(true);

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

	async function loginUser(e) {
		e.preventDefault();
		const formData = new FormData(e.target);

		const data = {
			email: formData.get('email'),
			password: formData.get('password')
		}

		const response = await postData('/login', data);

		if (response.message === 'email') {
			setTrueEmail(false);
		} else if (response.message === 'password') {
			setTrueEmail(true);
			setTruePassword(false);
		} else if(response.message === 'Success') {
			setTruePassword(true);
			setAuthorized(true);
			setToken(response.token)
			localStorage.setItem('token', JSON.stringify(response.token));
		}
	}

	const inputs = {
		email: {
			caption: trueEmail ? 'Электронная почта' : 'Неверная электронная почта',
			type: 'email',
			name: 'email',
			placeholder: 'user@mail.com',
			required: true,
			isWrong: trueEmail
		},
		password: {
			caption: truePassword ? 'Пароль' : 'Неверный пароль',
			type: 'password',
			name: 'password',
			placeholder: 'password',
			required: true,
			isWrong: truePassword
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
		<>
			{loaded
				? (
					<div className={styles.wrapper}>
						<FormHeader
							title="Авторизация"
							linkCaption="Регистрация"
							linkPath="/register"
						/>
						<form className={styles.form} method="post" onSubmit={loginUser}>
							<animated.fieldset className={styles.fieldset} data-direct="right" style={animateEmail}>
								<Input {...inputs.email} />
							</animated.fieldset>
							<animated.fieldset className={styles.fieldset} data-direct="right" style={animatePassword}>
								<Input {...inputs.password} />
							</animated.fieldset>

							<animated.div style={animateButton}>
								<Button text="Войти" type="submit" />
							</animated.div>
						</form>
					</div>
				) : (
					<></>
				)
			}
		</>
	);
}
