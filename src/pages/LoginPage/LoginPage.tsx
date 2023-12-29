// Libraries
import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import classNames from 'classnames';
import {jwtDecode} from 'jwt-decode';

// import {loginGoogleUser} from '../../services/AuthenticationService';
// Components
import Button from '../../new-components/Button/Button';
import {Text} from '../../new-components/typography/index';
import Checkbox from '../../new-components/Checkbox/Checkbox';
import Input, {defaultInput} from '../../new-components/Input/Input';
// Icons
import Google from '../../assets/icons/Google';
// Screen
import JoinScreen from '../../screens/JoinScreen/JoinScreen';
// Styles
import styles from './LoginPage.module.scss';
import {login, loginGoogle} from 'src/helpers/login';

const LoginPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [remember, setRemember] = useState(false);
	const [googleLogin, setGoogleLogin] = useState({click: () => {}});
	const [form, setForm] = useState({
		email: defaultInput,
		password: defaultInput,
	});

	const upadateFormHandler = (name: string, value: any) => {
		setForm({...form, [name]: value});
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();
		login(form.email.value, form.password.value, dispatch, navigate);
	};

	const handleGoogleLoginSuccess = (response: any) => {
		// console.log('Google login success', response.credential);
		const userObcjet: {email: any} = jwtDecode(response.credential);
		loginGoogle(response.credential, userObcjet?.email, dispatch, navigate);
	};

	const handleGoogleLoginFailure = (error: any) => {
		console.log('TT Google login failed', error);
		// Obsługa błędów logowania
	};

	useEffect(() => {
		if (!!!window.google) return;
		(window.google as any)?.accounts.id.initialize({
			client_id:
				'853231990547-b2o012vethlh2ooccr0fbrl8b9bqqh2g.apps.googleusercontent.com',
			callback: handleGoogleLoginSuccess,
		});

		const googleLoginButton = document.getElementById('signInDiv');
		(window.google as any).accounts.id.renderButton(googleLoginButton, {});

		const googleLoginWrapperButton: any =
			googleLoginButton?.querySelector('div[role=button]')!;

		setGoogleLogin({click: () => googleLoginWrapperButton.click()});
	}, [window.google]);

	return (
		<JoinScreen
			title='Zaloguj się'
			redirect={{text: 'Zarejestruj się', link: '/register'}}
			formContent={
				<form className={styles.formFields} onSubmit={handleSubmit}>
					<Input
						classes={styles.emailInput}
						id='email'
						name='email'
						type='email'
						required
						value={form.email.value}
						errorMessage={form.email.errorMessage}
						isValid={form.email.isValid}
						valueChangeHandler={upadateFormHandler}
						label='E-mail'
					/>
					<Input
						id='password'
						name='password'
						type='password'
						required
						value={form.password.value}
						valueChangeHandler={upadateFormHandler}
						label='Hasło'
					/>
					<div className={classNames(styles.inline)}>
						<Checkbox
							id='remember'
							name='remember'
							value={remember}
							valueChangeHandler={() => setRemember(!remember)}
							label='Zapamiętaj mnie'
						/>
						<Link to='/remind-password'>Przypomnij hasło</Link>
					</div>
					<Button type='submit' fullWidth classes={styles.submit}>
						Zaloguj się
					</Button>
				</form>
			}>
			<Text classes={styles.text}>
				lub <strong>zaloguj się</strong> z:
			</Text>
			<button className={styles.google} onClick={googleLogin.click}>
				<Google />
			</button>
			<div className={styles.off} id='signInDiv'></div>
		</JoinScreen>
	);
};
export default LoginPage;
