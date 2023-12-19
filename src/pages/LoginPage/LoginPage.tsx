// Libraries
import React, {useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {jwtDecode} from 'jwt-decode';

import {AuthContext} from '../../context/AuthContextProvider';
// import {loginGoogleUser} from '../../services/AuthenticationService';
// Components
import Button from '../../new-components/Button/Button';
import {Text} from '../../new-components/typography/index';
import Checkbox from '../../new-components/Checkbox/Checkbox';
import Input, {defaultInput} from '../../new-components/Input/Input';
// Screen
import JoinScreen from '../../screens/JoinScreen/JoinScreen';
// Styles
import styles from './LoginPage.module.scss';

const LoginPage = () => {
	const context = useContext(AuthContext);

	const [form, setForm] = useState({
		email: defaultInput,
		password: defaultInput,
	});

	const upadateFormHandler = (name: string, value: any) => {
		setForm({...form, [name]: value});
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();
		context.login(form.email.value, form.password.value);
	};

	const handleGoogleLoginSuccess = (response: any) => {
		// console.log('Google login success', response.credential);
		const userObcjet: {email: any} = jwtDecode(response.credential);
		context?.loginGoogle(response.credential, userObcjet?.email);
	};

	const handleGoogleLoginFailure = (error: any) => {
		console.log('TT Google login failed', error);
		// Obsługa błędów logowania
	};

	useEffect(() => {
		(window.google as any)?.accounts.id.initialize({
			client_id:
				'853231990547-b2o012vethlh2ooccr0fbrl8b9bqqh2g.apps.googleusercontent.com',
			callback: handleGoogleLoginSuccess,
		});
		(window.google as any).accounts.id.renderButton(
			document.getElementById('signInDiv'),
			{
				theme: 'outline',
				size: 'large',
			}
		);
	}, []);

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
							value={false}
							valueChangeHandler={() => {
								return;
							}}
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
			<div>
				<div id='signInDiv'></div>
			</div>
		</JoinScreen>
	);
};
export default LoginPage;
