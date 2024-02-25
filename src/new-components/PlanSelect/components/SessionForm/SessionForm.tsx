// Libraries
import React, {FormEvent, useState} from 'react';
// Components
import Checkbox from 'src/new-components/Checkbox/Checkbox';
import Button, {ButtonVariant} from 'src/new-components/Button/Button';
// Styles
import styles from './SessionForm.module.scss';
import {useNavigate, useParams} from "react-router-dom";

interface SessionFormProps {
	sessions: any; // Unknown type probably array of objects type of object also unknown
	openModalHandler: () => void;
}

const SessionForm = (props: SessionFormProps) => {
	const navigate = useNavigate();

	const {sessions, openModalHandler} = props;

	const [session, setSession] = useState(sessions[0]?.id);

	const updateSessionHandler = (id: string) => setSession(id);

	const id = useParams();

	const submitHandler = (e: FormEvent) => {
		navigate(`/session-book/${id?.userID}`);
		e.preventDefault();
	};

	return (
		<form onSubmit={submitHandler}>
			{sessions.map((item: any) => (
				<div key={item.id}>
					<Checkbox
						classes={styles.input}
						id='highlited'
						name='highlited'
						type='radio'
						value={session === item.id}
						errorMessage={''}
						isValid={true}
						valueChangeHandler={() => updateSessionHandler(item.id)}
						label={
							<span className={styles.label}>
								<strong>{item.name}</strong>
								<small>
									{item.time} minut / {item.price} zł
								</small>
							</span>
						}
					/>
				</div>
			))}
			<Button  classes={styles.button}type='submit'>Umów spotkanie</Button>
			<Button classes={styles.button}
				type='button'
				variant={ButtonVariant.Outline}
				onClick={openModalHandler}>
				Zobacz wszystkie sesje
			</Button>
		</form>
	);
};

export default SessionForm;
