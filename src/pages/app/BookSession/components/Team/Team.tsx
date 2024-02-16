// Libraries
import React from 'react';
// Components
import Input from 'src/new-components/Input/Input';
// Styles
import styles from '../BookForm/BookForm.module.scss';
import stylesTeam from './Team.module.scss'

interface TeamProps {
	limit: number;
	updateFormHandler: (name: string, value: any) => void;
}

const Team = (props: TeamProps) => {
	const {updateFormHandler} = props;
	
	return (
		<div>
			<div className={styles.formSection}>
				<Input
					id='email'
					name='email'
					type='email'
					placeholder={'E-mail'}
					value={''}
					// errorMessage={form.email.errorMessage}
					// isValid={form.email.isValid}
					valueChangeHandler={updateFormHandler}
				/>
				<Input
					id='nip'
					name='nip'
					type='nip'
					placeholder={'NIP'}
					value={''}
					// errorMessage={form.nip.errorMessage}
					// isValid={form.nip.isValid}
					valueChangeHandler={updateFormHandler}
				/>
				<Input
					id='message'
					name='message'
					as='textarea'
					placeholder={'Wiadomość'}
					classes={styles.textarea}
					value={''}
					// errorMessage={form.phone.errorMessage}
					// isValid={form.phone.isValid}
					valueChangeHandler={updateFormHandler}
				/>
			</div>
			<button className={stylesTeam.button}>+Dodaj kolejną osobę</button>
		</div>
	);
};

export default Team;
