// Libraries
import React, {useContext, useState} from 'react';
// Context
import {AuthContext} from '../../context/AuthContextProvider';
// Components
import Button from '../../new-components/Button/Button';
import Checkbox from '../../new-components/Checkbox/Checkbox';
import Input, {defaultInput} from '../../new-components/Input/Input';
// Screen
import JoinScreen from '../../screens/JoinScreen/JoinScreen';
// Styles
import styles from './RegisterPage.module.scss';

const RegisterPage = () => {
	const context = useContext(AuthContext);

	const [form, setForm] = useState({
		firstName: defaultInput,
		lastName: defaultInput,
		email: defaultInput,
		password: defaultInput,
		agreement: {
			...defaultInput,
			value: false,
		},
	});

	const upadateFormHandler = (name: string, value: any) => {
		setForm({...form, [name]: value});
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();
		context.register(
			form.firstName.value,
			form.lastName.value,
			form.email.value,
			form.password.value,
			form.agreement.value
		);
	};

	return (
		<JoinScreen
			title='Zarejestruj się'
			redirect={{text: 'Zaloguj się', link: '/login'}}
			formContent={
				<form className={styles.formFields} onSubmit={handleSubmit}>
					<Input
						classes={styles.input}
						id='firstName'
						name='firstName'
						type='text'
						required
						value={form.firstName.value}
						errorMessage={form.firstName.errorMessage}
						isValid={form.firstName.isValid}
						valueChangeHandler={upadateFormHandler}
						label='Imię'
					/>
					<Input
						classes={styles.input}
						id='lastName'
						name='lastName'
						type='text'
						required
						value={form.lastName.value}
						errorMessage={form.lastName.errorMessage}
						isValid={form.lastName.isValid}
						valueChangeHandler={upadateFormHandler}
						label='Nazwisko'
					/>
					<Input
						classes={styles.input}
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
						classes={styles.password}
						id='password'
						name='password'
						type='password'
						required
						value={form.password.value}
						valueChangeHandler={upadateFormHandler}
						label='Hasło'
					/>
					<Checkbox
						id='agreement'
						name='agreement'
						required
						value={form.agreement.value}
						valueChangeHandler={upadateFormHandler}
						label='Zapoznałem się z regulaminem i go akceptuje.'
					/>
					<Button type='submit' fullWidth classes={styles.submit}>
						Utwórz konto
					</Button>
				</form>
			}></JoinScreen>
	);
};
export default RegisterPage;
