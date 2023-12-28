// Libraries
import React, {useState} from 'react';
// Components
import AppHeader from 'src/new-components/AppHeader/AppHeader';
import Container from 'src/new-components/Container/Container';
import {Title} from 'src/new-components/typography';
import Input, {defaultInput} from '../../../new-components/Input/Input';
import Button from '../../../new-components/Button/Button';
// Types
import {Tag} from 'src/types/tags';
import {
	TitleTag,
	TitleVariant,
} from 'src/new-components/typography/Title/Title';
// Styles
import styles from './Settings.module.scss';

const Settings = () => {
	const [form, setForm] = useState({
		firstName: defaultInput,
		lastName: defaultInput,
		phone: defaultInput,
		email: defaultInput,
		position: defaultInput,
		location: defaultInput,
	});

	const upadateFormHandler = (name: string, value: any) => {
		setForm({...form, [name]: value});
	};

	return (
		<>
			<AppHeader title='Ustawienia użytownika' text='Zarządzaj swoimi danymi.' />
			<Container as={Tag.Main} classes={styles.wrapper}>
				<section className={styles.section}>
					<Title tag={TitleTag.h2} variant={TitleVariant.standard}>
						Twoje dane
					</Title>
					<form className={styles.form}>
						<Input
							classes={styles.input}
							id='firstName'
							name='firstName'
							type='text'
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
							value={form.email.value}
							errorMessage={form.email.errorMessage}
							isValid={form.email.isValid}
							valueChangeHandler={upadateFormHandler}
							label='E-mail'
						/>
						<Input
							classes={styles.input}
							id='phone'
							name='phone'
							type='phone'
							value={form.phone.value}
							errorMessage={form.phone.errorMessage}
							isValid={form.phone.isValid}
							valueChangeHandler={upadateFormHandler}
							label='Numer telefonu'
						/>
						<Input
							classes={styles.input}
							id='position'
							name='position'
							type='text'
							value={form.position.value}
							errorMessage={form.position.errorMessage}
							isValid={form.position.isValid}
							valueChangeHandler={upadateFormHandler}
							label='Stanowisko'
						/>
						<Input
							classes={styles.input}
							id='location'
							name='location'
							type='text'
							value={form.location.value}
							errorMessage={form.location.errorMessage}
							isValid={form.location.isValid}
							valueChangeHandler={upadateFormHandler}
							label='Loklizacja'
						/>
						<div className={styles.formSubmit}>
							<Button type='submit'>Zapisz zmiany</Button>
						</div>
					</form>
				</section>
				<section className={styles.section}>
					<Title tag={TitleTag.h2} variant={TitleVariant.standard}>
						Social media
					</Title>
				</section>
			</Container>
		</>
	);
};

export default Settings;
