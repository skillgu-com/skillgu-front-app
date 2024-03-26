import React, {FormEvent, useEffect, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
// Components
import {NavTitle} from '@newComponents/typography';
import Container from '@newComponents/Container/Container';
import Input, {defaultInput} from '@newComponents/Input/Input';
import Button from '@newComponents/Button/Button';
// Types
import {Tag} from '@customTypes/tags';
// Styles
import styles from './SessionForm.module.scss';
import Select from '@newComponents/Select/Select';
import {fetchAllSchedules} from "../../../../../services/ScheduleService";
import {createSession, getSessionTypes} from "../../../../../services/SessionService";

const SessionForm = () => {
    const [scheduleNames, setScheduleNames] = useState([]);
    const [sessionTypes, setSessionTypes] = useState([]);

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

        console.log(form)
        createSession(form).then(() => {
            navigate('/schedules');
        })
    };

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
                    placeholder='60'
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
