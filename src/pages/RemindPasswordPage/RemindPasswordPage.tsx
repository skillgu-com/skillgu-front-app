// Libraries
import React, {useState} from 'react';

// import {loginGoogleUser} from '../../services/AuthenticationService';
// Components
import Button from '../../new-components/Button/Button';
import Checkbox from '../../new-components/Checkbox/Checkbox';
import Input, {defaultInput} from '../../new-components/Input/Input';
// Screen
import JoinScreen from '../../screens/JoinScreen/JoinScreen';
// Styles
import styles from './RemindPasswordPage.module.scss';

const RemindPasswordPage = () => {
	const [form, setForm] = useState({
		email: defaultInput,
		agreement: {...defaultInput, value: false},
	});

	const upadateFormHandler = (name: string, value: any) => {
		setForm({...form, [name]: value});
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();
		// TODO: Add API
	};

	return (
		<JoinScreen
			title='Zresetuj hasło'
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
					<Checkbox
						id='agreement'
						name='agreement'
						value={form.agreement.value}
						valueChangeHandler={upadateFormHandler}
						label='Akceptuję warunki'
					/>
					<Button type='submit' fullWidth classes={styles.submit}>
						Ustal nowe hasło
					</Button>
				</form>
			}></JoinScreen>
	);
};
export default RemindPasswordPage;
