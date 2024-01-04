// Libraries
import React, {useState} from 'react';
// Components
import AppHeader from 'src/new-components/AppHeader/AppHeader';
import Container from 'src/new-components/Container/Container';
import {Title, Text} from 'src/new-components/typography';
import Input, {defaultInput} from '../../../new-components/Input/Input';
import Button, {ButtonVariant} from '../../../new-components/Button/Button';
// Types
import {Tag} from 'src/types/tags';
import {
	TitleTag,
	TitleVariant,
} from 'src/new-components/typography/Title/Title';
// Styles
import styles from './Settings.module.scss';
import classNames from 'classnames';
import Checkbox from 'src/new-components/Checkbox/Checkbox';

const Settings = () => {
	const [form, setForm] = useState({
		firstName: defaultInput,
		lastName: defaultInput,
		position: defaultInput,
		location: defaultInput,
		linkedin: defaultInput,
		instagram: defaultInput,
		facebook: defaultInput,
		x: defaultInput,
		www: defaultInput,
		description: defaultInput,
		highlited: {...defaultInput, value: false},
		hidden: {...defaultInput, value: false},
	});

	const [mentorForm, setMentorForm] = useState({
		titles: defaultInput,
		skills: defaultInput,
		services: defaultInput,
		market: defaultInput,
	});

	const [profileForm, setProfileForm] = useState({
		email: defaultInput,
		password: defaultInput,
		phone: defaultInput,
	});

	const upadateFormHandler = (name: string, value: any) => {
		setForm({...form, [name]: value});
	};

	const upadateMentorFormHandler = (name: string, value: any) => {
		setMentorForm({...mentorForm, [name]: value});
	};

	const upadateProfileFormHandler = (name: string, value: any) => {
		setProfileForm({...profileForm, [name]: value});
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
						<Input
							classes={classNames(styles.input, styles.textarea)}
							id='description'
							name='description'
							as='textarea'
							value={form.description.value}
							errorMessage={form.description.errorMessage}
							isValid={form.description.isValid}
							valueChangeHandler={upadateFormHandler}
							label='Opis'
						/>
						<Input
							classes={styles.input}
							id='linkedin'
							name='linkedin'
							type='text'
							value={form.linkedin.value}
							errorMessage={form.linkedin.errorMessage}
							isValid={form.linkedin.isValid}
							valueChangeHandler={upadateFormHandler}
							label='Linked In'
						/>
						<Input
							classes={styles.input}
							id='facebook'
							name='facebook'
							type='text'
							value={form.facebook.value}
							errorMessage={form.facebook.errorMessage}
							isValid={form.facebook.isValid}
							valueChangeHandler={upadateFormHandler}
							label='Facebook'
						/>
						<Input
							classes={styles.input}
							id='x'
							name='x'
							type='text'
							value={form.x.value}
							errorMessage={form.x.errorMessage}
							isValid={form.x.isValid}
							valueChangeHandler={upadateFormHandler}
							label='X'
						/>
						<Input
							classes={styles.input}
							id='instagram'
							name='instagram'
							type='text'
							value={form.instagram.value}
							errorMessage={form.instagram.errorMessage}
							isValid={form.instagram.isValid}
							valueChangeHandler={upadateFormHandler}
							label='Instagram'
						/>
						<Input
							classes={styles.input}
							id='www'
							name='www'
							type='text'
							value={form.www.value}
							errorMessage={form.www.errorMessage}
							isValid={form.www.isValid}
							valueChangeHandler={upadateFormHandler}
							label='Strona internetowa'
						/>
						<div></div>
						<Checkbox
							classes={styles.input}
							id='highlited'
							name='highlited'
							value={form.highlited.value}
							errorMessage={form.highlited.errorMessage}
							isValid={form.highlited.isValid}
							valueChangeHandler={upadateFormHandler}
							label='Chcę być promowany'
						/>
						<Checkbox
							classes={styles.input}
							id='hidden'
							name='hidden'
							value={form.hidden.value}
							errorMessage={form.hidden.errorMessage}
							isValid={form.hidden.isValid}
							valueChangeHandler={upadateFormHandler}
							label='Ukryj mnie przed innymi mentorami'
						/>
						<div className={styles.formSubmit}>
							<Button type='submit'>Zapisz zmiany</Button>
						</div>
					</form>
				</section>
				<section className={styles.section}>
					<Title tag={TitleTag.h2} variant={TitleVariant.standard}>
						Twoje specjalizacje
					</Title>
					<form className={styles.form}>
						<Input
							classes={styles.input}
							id='titles'
							name='titles'
							type='text'
							value={mentorForm.titles.value}
							errorMessage={mentorForm.titles.errorMessage}
							isValid={mentorForm.titles.isValid}
							valueChangeHandler={upadateMentorFormHandler}
							label='Tematy mentoringu'
						/>
						<Input
							classes={styles.input}
							id='skills'
							name='skills'
							type='text'
							value={mentorForm.skills.value}
							errorMessage={mentorForm.skills.errorMessage}
							isValid={mentorForm.skills.isValid}
							valueChangeHandler={upadateMentorFormHandler}
							label='Umiejętności'
						/>
						<Input
							classes={styles.input}
							id='services'
							name='services'
							type='text'
							value={mentorForm.services.value}
							errorMessage={mentorForm.services.errorMessage}
							isValid={mentorForm.services.isValid}
							valueChangeHandler={upadateMentorFormHandler}
							label='Usługi'
						/>
						<Input
							classes={styles.input}
							id='market'
							name='market'
							type='text'
							value={mentorForm.market.value}
							errorMessage={mentorForm.market.errorMessage}
							isValid={mentorForm.market.isValid}
							valueChangeHandler={upadateMentorFormHandler}
							label='Branża'
						/>
						<div className={styles.formSubmit}>
							<Button type='submit'>Zapisz zmiany</Button>
						</div>
					</form>
				</section>
				<section className={styles.section}>
					<Title tag={TitleTag.h2} variant={TitleVariant.standard}>
						Twoje konto
					</Title>
					<form className={styles.form}>
						<Input
							classes={styles.input}
							id='email'
							name='email'
							type='email'
							value={profileForm.email.value}
							errorMessage={profileForm.email.errorMessage}
							isValid={profileForm.email.isValid}
							valueChangeHandler={upadateProfileFormHandler}
							label='E-mail'
						/>
						<Input
							classes={styles.input}
							id='phone'
							name='phone'
							type='phone'
							value={profileForm.phone.value}
							errorMessage={profileForm.phone.errorMessage}
							isValid={profileForm.phone.isValid}
							valueChangeHandler={upadateProfileFormHandler}
							label='Numer telefonu'
						/>
						<Input
							classes={styles.input}
							id='password'
							name='password'
							type='password'
							value={profileForm.password.value}
							errorMessage={profileForm.password.errorMessage}
							isValid={profileForm.password.isValid}
							valueChangeHandler={upadateProfileFormHandler}
							label='Nowe hasło'
						/>
						<div className={styles.formSubmit}>
							<Button type='submit'>Zapisz zmiany</Button>
						</div>
					</form>
				</section>
				<section className={styles.section}>
					<Title tag={TitleTag.h2} variant={TitleVariant.standard}>
						Usuń konto
					</Title>
					<Text>Konto zostanie trwale usunięte!</Text>
					<form className={styles.form}>
						<div className={styles.formSubmit}>
							<Button type='submit' variant={ButtonVariant.Danger}>
								Usuń konto
							</Button>
						</div>
					</form>
				</section>
			</Container>
		</>
	);
};

export default Settings;
