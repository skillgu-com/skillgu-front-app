// Libraries
import React, {FormEvent, useState} from 'react';
// Components
import Checkbox from 'src/component/Checkbox';
import Button, { ButtonVariant } from 'src/new-components/Button/Button';
// Styles
import styles from './SessionForm.module.scss';

interface SessionFormProps {
	sessions: any; // Unknown type probably array of objects type of objcet also unknon
	openModalHandler: () => void;
}

const SessionForm = (props: SessionFormProps) => {
	const {sessions, openModalHandler} = props;

	const [session, setSession] = useState(sessions[0].id);

	const udateSessionHandler = (id: string) => setSession(id);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
  }

	return (
		<form onSubmit={submitHandler}>
			{sessions.map((item: any) => (
				<Checkbox
					classes={styles.input}
					id='highlited'
					name='highlited'
					type='radio'
					value={session === item.id}
					errorMessage={''}
					isValid={true}
					valueChangeHandler={() => udateSessionHandler(item.id)}
					label={item.label}
				/>
			))}
			<Button type='submit'>Umów spotkanie</Button>
			<Button type='button' variant={ButtonVariant.Outline} onClick={openModalHandler}>Zobacz wszystkie sesje</Button>
		</form>
	);
};

export default SessionForm;
