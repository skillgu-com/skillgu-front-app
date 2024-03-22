import React, {FormEvent, useEffect, useState} from 'react';
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
        description: defaultInput,
        sessionTypeId: defaultInput,
        schedule: defaultInput,
    });

    const updateFormHandler = (name: string, value: any) => {
        setForm({...form, [name]: value});
    };

    const submitHandler = (e: FormEvent) => {
        createSession(form);
        e.preventDefault()
    }


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



    return (
        <Container as={Tag.Section} classes={styles.wrapper}>
            <NavTitle>Szczegóły sesji</NavTitle>
            <form className={styles.form} onSubmit={submitHandler}>
                <Input
                    id='name'
                    name='name'
                    type='text'
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
                    placeholder='60'
                    value={form.price.value}
                    errorMessage={form.price.errorMessage}
                    isValid={form.price.isValid}
                    valueChangeHandler={updateFormHandler}
                    label='Cena za sesję [zł]'
                />
                <Select
                    options={sessionType}
                    value={form?.sessionTypeId?.value}
                    valueChangeHandler={updateFormHandler}
                    name='sessionTypeId'
                    id='sessionTypeId'
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
                    id='description'
                    name='description'
                    as='textarea'
                    placeholder={'Opisz sesję...'}
                    value={form.description.value}
                    errorMessage={form.description.errorMessage}
                    isValid={form.description.isValid}
                    valueChangeHandler={updateFormHandler}
                    label='Opis sesji'
                />
                <Button classes={styles.formButton} fullWidth type='submit'>
                    Zapisz zmiany
                </Button>
            </form>
        </Container>
    );
};

export default SessionForm;
