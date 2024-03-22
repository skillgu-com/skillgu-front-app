import React, {FormEvent, useState} from 'react';
// Components
import {NavTitle} from '@newComponents/typography';
import Container from '@newComponents/Container/Container';
import Input, {defaultInput} from '@newComponents/Input/Input';
import Button from '@newComponents/Button/Button';
import Time from '../../components/Time/Time';
import MeetingType from '../../components/MeetingType/MeetingType';
import Checkbox from '@newComponents/Checkbox/Checkbox';
import WeekTime from '../../components/WeekTime/WeekTime';
// Types
import {Tag} from '@customTypes/tags';
// Styles
import styles from './ScheduleForm.module.scss';
import stylesSessions from '../SessionForm/SessionForm.module.scss';
import {createScheduleMeeting} from "../../../../../services/ScheduleService";

const ScheduleForm = () => {
    const [form, setForm] = useState({
        name: defaultInput,
        dateFrom: defaultInput,
        dateTo: defaultInput,
        resign: {...defaultInput, value: false},
        type: {value: 'individual'},
        time: {value: 30},
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
    });



    const updateFormHandler = (name: string, value: any) => {
        if (name === 'dateFrom') {
            const fromDate = new Date(value.value).getTime();
            const toDate = new Date(form.dateTo.value).getTime();

            if (fromDate >= toDate)
                return setForm({
                    ...form,
                    [name]: {...value, errorMessage: 'Nieprawidłowa data!'},
                });
        }

        if (name === 'dateTo') {
            const fromDate = new Date(form.dateTo.value).getTime();
            const toDate = new Date(value.value).getTime();

            if (fromDate > toDate)
                return setForm({
                    ...form,
                    [name]: {...value, errorMessage: 'Nieprawidłowa data!'},
                });
        }

        setForm({...form, [name]: value});
    };


    const updateWeekTimeHandler = (day: string, times: any[]) => {

        const updatedTimes = times.map(time => ({ from: time.from, to: time.to }));

        setForm({...form, [day.toLowerCase()]: updatedTimes});
    };

    const submitHandler = (e: any) => {
        e.preventDefault();
        createScheduleMeeting(form).then(()=> {

        })
    };


    return (
        <Container as={Tag.Section} classes={stylesSessions.wrapper}>
            <NavTitle>Szczegóły harmonogramu</NavTitle>
            <form className={stylesSessions.form} onSubmit={submitHandler}>
                <Input
                    id='name'
                    name='name'
                    type='text'
                    placeholder={'nazwa harmonogramu'}
                    value={form.name.value}
                    errorMessage={form.name.errorMessage}
                    isValid={form.name.isValid}
                    valueChangeHandler={updateFormHandler}
                    label='Nazwa'
                />
                <Time value={form.time.value} valueChangeHandler={updateFormHandler}/>
                <MeetingType
                    value={form.type.value}
                    updateFormHandler={updateFormHandler}
                />
                <Checkbox
                    id='resign'
                    name='resign'
                    value={form.resign.value}
                    valueChangeHandler={updateFormHandler}
                    slide
                    label='Możliwość odwołania spotkania przez klienta'
                />

                <div>
                    <span className={styles.fieldText}>Okres obowiązywania</span>
                    <div className={styles.date}>
                        <Input
                            classes={styles.dateInput}
                            id='dateFrom'
                            name='dateFrom'
                            type='date'
                            value={form.dateFrom.value}
                            errorMessage={form.dateFrom.errorMessage}
                            isValid={form.dateFrom.isValid}
                            valueChangeHandler={updateFormHandler}
                        />
                        <span className={styles.fieldText}>-</span>
                        <Input
                            classes={styles.dateInput}
                            id='dateTo'
                            name='dateTo'
                            type='date'
                            value={form.dateTo.value}
                            errorMessage={form.dateTo.errorMessage}
                            isValid={form.dateTo.isValid}
                            valueChangeHandler={updateFormHandler}
                        />
                    </div>
                </div>
                <WeekTime day='Pn' updateTimes={(times) => updateWeekTimeHandler('Monday', times)} />
                <WeekTime day='Wt' updateTimes={(times) => updateWeekTimeHandler('Tuesday', times)} />
                <WeekTime day='Śr' updateTimes={(times) => updateWeekTimeHandler('Wednesday', times)} />
                <WeekTime day='Cz' updateTimes={(times) => updateWeekTimeHandler('Thursday', times)} />
                <WeekTime day='Pt' updateTimes={(times) => updateWeekTimeHandler('Friday', times)} />
                <WeekTime day='Sb' updateTimes={(times) => updateWeekTimeHandler('Saturday', times)} />
                <WeekTime day='Nd' updateTimes={(times) => updateWeekTimeHandler('Sunday', times)} />

                <Button classes={styles.formButton} fullWidth type='submit'>
                    Zapisz zmiany
                </Button>
            </form>
        </Container>
    );
};

export default ScheduleForm;
