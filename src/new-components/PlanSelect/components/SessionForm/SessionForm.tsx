// Libraries
import React, {FormEvent, useEffect, useState} from 'react';
// Components
import Checkbox from 'src/new-components/Checkbox/Checkbox';
import Button, {ButtonVariant} from 'src/new-components/Button/Button';
// Styles
import styles from './SessionForm.module.scss';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";

interface SessionFormProps {
    sessions: any;
    openModalHandler: () => void;
}

const SessionForm = (props: SessionFormProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {sessions, openModalHandler} = props;
    const [session, setSession] = useState(sessions[0]?.id);

    const updateSessionHandler = (sessionID: number) => setSession(sessionID);
    const id = useParams();


    const submitHandler = (e: FormEvent) => {
        const selectedSession = sessions.find((item: any) => item.sessionID === session);

        if (selectedSession) {
            dispatch({
                type: 'SET_SESSION_IN_FORM',
                payload: {
                    sessionID: selectedSession?.sessionID,
                    name: selectedSession?.name,
                    time: selectedSession?.meetTime,
                    sessionPrice: selectedSession?.sessionPrice,
                    description: selectedSession?.description,
                    mentorID: selectedSession.mentorID
                },
            });
            dispatch({
                type: 'UPDATE_SESSION_ID',
                payload: {
                    sessionID: selectedSession?.sessionID,

                },
            });
            navigate(`/session-book/${id?.userID}`);
            e.preventDefault();
        };
    }

    return (
        <form onSubmit={submitHandler}>
            {sessions.map((item: any) => (
                <div key={item.sessionID}>
                    <Checkbox
                        classes={styles.input}
                        id='highlited'
                        name='highlited'
                        type='radio'
                        value={session === item.sessionID}
                        errorMessage={''}
                        isValid={true}
                        valueChangeHandler={() => updateSessionHandler(item.sessionID)}
                        label={
                            <span className={styles.label}>
								<strong>{item.name}</strong>
								<small>
									{item.meetTime} minut / {item.sessionPrice} zł
								</small>
							</span>
                        }
                    />
                </div>
            ))}
            <Button classes={styles.button} type='submit'>Umów spotkanie</Button>
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
