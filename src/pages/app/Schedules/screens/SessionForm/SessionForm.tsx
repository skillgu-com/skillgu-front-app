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

const SessionForm = () => {
    const [scheduleNames, setScheduleNames] = useState([]);
    const [form, setForm] = useState({
        name: defaultInput,
        price: defaultInput,
        description: defaultInput,
        type: defaultInput,
        schedule: defaultInput,
    });

    const updateFormHandler = (name: string, value: any) => {
        setForm({...form, [name]: value});
    };

    const submitHandler = (e: FormEvent) => {
        e.preventDefault()
    }

    useEffect(() => {
        fetchAllSchedules().then(res => {
            setScheduleNames(res.data);
        })
    }, []);

    const schedules = scheduleNames.map((element: { id: any; name: any; }) => ({
        value: element.id,
        label: element.name
    }));



    return (
        <Container as={Tag.Section} classes={styles.wrapper}>
            <NavTitle>Szczegóły sesji</NavTitle>
            <form className={styles.form} onClick={submitHandler}>
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
                    options={[{value: 'test', label: 'Technical call'}]}
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
