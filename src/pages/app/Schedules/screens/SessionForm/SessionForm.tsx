import React, {FormEvent, useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
// Components
// Types
import {Tag} from '@customTypes/tags';
// Styles
import styles from './SessionForm.module.scss';
import {fetchAllSchedules} from "@services/scheduleService";
import Container from "../../../../../components/Container/Container";
import NavTitle from "../../../../../components/typography/NavTitle/NavTitle";
import Input, {defaultInput} from "../../../../../components/Input/Input";
import Select from "../../../../../components/Select/Select";
import Button from "../../../../../components/Button/Button";
import {createSession, getSessionTypes, SessionDTO, editMentorSingleSession} from "@services/session/sessionService";

const SessionForm = () => {
    const [scheduleNames, setScheduleNames] = useState([]);
    const [sessionTypes, setSessionTypes] = useState([]);
    // const [data, setData] = useState<any>(null);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const {sessionId} = useParams<{ sessionId: string }>();
    const [sessionData, setSessionData] = useState<SessionDTO>({
        sessionName: '',
        sessionPrice: 0,
        sessionType: 0,
        scheduleID:0,
        sessionDescription: ''
    });


    const [form, setForm] = useState({
        name: defaultInput,
        price: defaultInput,
        message: defaultInput,
        type: defaultInput,
        schedule: defaultInput,
    });

    useEffect(() => {
        fetchAllSchedules().then(res => {
            setScheduleNames(res.data);
        })
        getSessionTypes().then(res => {
            setSessionTypes(res.data);
        })
    }, []);

    const sessionType = sessionTypes.map((element: { id: any; name: any; }) => ({
        value: element.id,
        label: element.name
    }));


    const schedules = scheduleNames.map((element: { id: any; scheduleName: any; }) => ({
        value: element.id,
        label: element.scheduleName
    }));

    const navigate = useNavigate();

    const updateFormHandler = (name: string, value: any) => {
        setForm({...form, [name]: value});
    };

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        createSession(form).then(() => {
            navigate('/schedules');
        })
    };

    useEffect(() => {
        if (sessionId) {
            setIsEdit(true);
            const fetchData = async () => {
                try {
                    const result = await editMentorSingleSession(sessionId, sessionData);

                    // setData(result);
                } catch (error) {
                    console.error('Error fetching schedule data:', error);
                }
            };
            fetchData();
        } else {
            setIsEdit(false);
        }
    }, [sessionId]);

    const disabled = useMemo(() => {
        if (
            form.name.isValid &&
            form.message.isValid &&
            form.price.isValid &&
            !!form.schedule &&
            !!form.type
        )
            return false;
        return true;
    }, [form]);

    return (
        <Container as={Tag.Section} classes={styles.wrapper}>
            <NavTitle>Szczegóły sesji</NavTitle>
            <form className={styles.form} onSubmit={submitHandler}>
                <Input
                    id='name'
                    name='name'
                    type='text'
                    required
                    placeholder={'nazwa sesji'}
                    value={form.name.value}
                    errorMessage={form.name.errorMessage}
                    isValid={form.name.isValid}
                    valueChangeHandler={updateFormHandler}
                    label='Nazwa'
                />
                <Input
                    id='price'
                    name='price'
                    type='number'
                    required
                    placeholder='100'
                    value={form.price.value}
                    errorMessage={form.price.errorMessage}
                    isValid={form.price.isValid}
                    valueChangeHandler={updateFormHandler}
                    label='Cena za sesję [zł]'
                />
                <Select
                    options={sessionType}
                    value={form?.type?.value}
                    valueChangeHandler={updateFormHandler}
                    name='type'
                    id='type'
                    label='Sortowanie'
                    spanLabel='Typ spotkania'
                />
                <Select
                    options={schedules}
                    value={form?.schedule?.value}
                    valueChangeHandler={updateFormHandler}
                    name='schedule'
                    id='schedule'
                    label='nazwa harmonogramu'
                    spanLabel='Harmonogram'
                />
                <Input
                    id='message'
                    name='message'
                    required
                    as='textarea'
                    placeholder={'Opisz sesję...'}
                    value={form.message.value}
                    errorMessage={form.message.errorMessage}
                    isValid={form.message.isValid}
                    valueChangeHandler={updateFormHandler}
                    label='Opis sesji'
                />
                <Button classes={styles.formButton} fullWidth type='submit' disableButton={disabled}>
                    Zapisz zmiany
                </Button>
            </form>
        </Container>
    );
};

export default SessionForm;
