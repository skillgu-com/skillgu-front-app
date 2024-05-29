import React, {FormEvent, useCallback, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
// Components
import {NavTitle} from '@newComponents/typography';
import Container from '@newComponents/Container/Container';
import {defaultInput} from '@newComponents/Input/Input';
import Button from '@newComponents/Button/Button';
import MeetingType from '../../components/MeetingType/MeetingType';
import Checkbox from '@newComponents/Checkbox/Checkbox';
import WeekTime from '../../components/WeekTime/WeekTime';
// Types
import {Tag} from '@customTypes/tags';
// Styles
import styles from './ScheduleForm.module.scss';
import stylesSessions from '../SessionForm/SessionForm.module.scss';
import StepInput from '@newComponents/StepInput/StepInput';
import {createScheduleMeeting} from '@services/ScheduleService';
import {Controller, useForm} from "react-hook-form";
import {addMonths} from "date-fns";
import {Box, Collapse} from "@mui/material";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import Typography from "@mui/material/Typography";
import FormInputText from "@newComponents/_form/FormInputText/FormInputText";

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
type Day = typeof days[number];

type WeekdayInput = {
    isActivated: boolean;
    slots: { dateFrom: Date, dateTo: Date }[]
}

type FormInput = {
    name: string;
    slotLength: number;
    type: 'individual' | 'group';
    cancelAvailable: boolean;
    dateFrom: Date;
    dateTo: Date;
    participantsNumber: number; // only for group
    weekdays: Record<Day, WeekdayInput>,
}

const today = new Date();

const boxWithLabelSX = {
    display: 'grid',
    gap: 1,
}

const ScheduleForm = () => {
    const [form, setForm] = useState({
        name: defaultInput,
        time: {...defaultInput, value: 30},
        dateFrom: defaultInput,
        dateTo: defaultInput,
        resign: {...defaultInput, value: false},
        type: {value: 'individual'},
        groupAmount: {...defaultInput, value: 1},

        monday: {...defaultInput, value: false},
        tuesday: {...defaultInput, value: false},
        wednesday: {...defaultInput, value: false},
        thursday: {...defaultInput, value: false},
        friday: {...defaultInput, value: false},
        saturday: {...defaultInput, value: false},
        sunday: {...defaultInput, value: false},
    });

    const formHook = useForm<FormInput>({
        defaultValues: {
            name: '',
            slotLength: 30,
            type: 'individual',
            cancelAvailable: false,
            dateFrom: today,
            dateTo: addMonths(today, 1),
            participantsNumber: 1,
            weekdays: days.reduce((acc, day) => {
                acc[day] = {
                    isActivated: false,
                    slots: []
                }
                return acc;
            }, {} as Record<Day, WeekdayInput>)
        },
        mode: 'onBlur',
    })

    const selectedType = formHook.watch('type');

    const navigate = useNavigate();

    const updateFormHandler = useCallback(
        (name: string, value: any) => {
            if (name === 'dateFrom') {
                const fromDate = new Date(value.value).getTime();
                const toDate = new Date(form.dateTo.value).getTime();

                if (fromDate >= toDate || !!!fromDate)
                    return setForm({
                        ...form,
                        [name]: {...value, errorMessage: 'Nieprawidłowa data!'},
                    });
            }

            if (name === 'dateTo') {
                const fromDate = new Date(form.dateFrom.value).getTime();
                const toDate = new Date(value.value).getTime();

                if (fromDate > toDate || !!!toDate)
                    return setForm({
                        ...form,
                        [name]: {...value, errorMessage: 'Nieprawidłowa data!'},
                    });
            }

            setForm({...form, [name]: value});
        },
        [form]
    );

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        createScheduleMeeting(form).then((res) => {
            navigate('/schedules');
        }).catch(error => {
            console.error('Error creating schedule meeting:', error.response);


        });
    };

    const disabled = useMemo(() => {
        if (
            form.monday.value === false &&
            form.tuesday.value === false &&
            form.wednesday.value === false &&
            form.thursday.value === false &&
            form.friday.value === false &&
            form.saturday.value === false &&
            form.sunday.value === false
        )
            return true;

        if (
            (!!form.monday.value && !form.monday.isValid) ||
            (!!form.tuesday.value && !form.tuesday.isValid) ||
            (!!form.wednesday.value && !form.wednesday.isValid) ||
            (!!form.thursday.value && !form.thursday.isValid) ||
            (!!form.friday.value && !form.friday.isValid) ||
            (!!form.saturday.value && !form.saturday.isValid) ||
            (!!form.sunday.value && !form.sunday.isValid)
        )
            return true;

        if (
            form.name.isValid &&
            form.dateFrom.isValid &&
            form.dateTo.isValid &&
            (form.monday.value ||
                form.wednesday.value ||
                form.thursday.value ||
                form.tuesday.value ||
                form.friday.value ||
                form.saturday.value ||
                form.sunday.value)
        )
            return false;

        return true;
    }, [form]);

    return (
        <Container as={Tag.Section} classes={stylesSessions.wrapper}>
            <NavTitle>Szczegóły harmonogramu</NavTitle>
            <form className={stylesSessions.form} onSubmit={submitHandler}>
                <Box sx={boxWithLabelSX}>
                    <Typography variant='buttonMd'>Nazwa</Typography>
                    <FormInputText
                        name='name'
                        control={formHook.control}
                        formState={formHook.formState}
                        inputProps={{placeholder: 'Nazwa harmonogramu'}}
                        controllerProps={{rules: {required: 'To pole jest wymagane'}}}
                    />
                </Box>

                <Controller
                    control={formHook.control}
                    name='slotLength'
                    render={({field}) => (
                        <StepInput
                            minValue={15}
                            maxValue={120}
                            step={15}
                            measure='min'
                            label='Długość spotkania'
                            {...field}
                        />
                    )}
                />

                <Controller
                    control={formHook.control}
                    name='type'
                    render={({field}) => (
                        <MeetingType
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />

                <Collapse in={selectedType === 'group'}>
                    <Controller
                        control={formHook.control}
                        name='participantsNumber'
                        render={({field}) => (
                            <StepInput
                                minValue={1}
                                maxValue={5}
                                step={1}
                                label='Ilość uczestników'
                                {...field}
                            />
                        )}
                    />
                </Collapse>
                <Controller
                    control={formHook.control}
                    name='cancelAvailable'
                    render={({field}) => (
                        <Checkbox
                            id='cancelAvailable'
                            slide
                            label='Możliwość odwołania spotkania przez klienta'
                            name={field.name}
                            valueChangeHandler={(_, {value}) => field.onChange(value)}
                            value={field.value}

                        />
                    )}
                />
                <div>
                    <Typography variant='buttonMd' className={styles.fieldText}>Okres obowiązywania</Typography>
                    <div className={styles.date}>
                        {/*TODO Form datepicker - errors */}
                        <Controller
                            control={formHook.control}
                            name='dateFrom'
                            rules={{required: 'To pole jest wymagane'}}
                            render={({field}) => (
                                <DatePicker
                                    className={styles.dateInput}
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            control={formHook.control}
                            name='dateTo'
                            rules={{required: 'To pole jest wymagane'}}
                            render={({field}) => (
                                <DatePicker
                                    className={styles.dateInput}
                                    {...field}
                                />
                            )}
                        />
                    </div>
                </div>
                <WeekTime
                    day='Pn'
                    name={'monday'}
                    value={form.monday.value}
                    meetingTime={form.time.value}
                    valueChangeHandler={updateFormHandler}
                />
                <WeekTime
                    day='Wt'
                    name={'tuesday'}
                    value={form.tuesday.value}
                    meetingTime={form.time.value}
                    valueChangeHandler={updateFormHandler}
                />
                <WeekTime
                    day='Śr'
                    name={'wednesday'}
                    value={form.wednesday.value}
                    meetingTime={form.time.value}
                    valueChangeHandler={updateFormHandler}
                />
                <WeekTime
                    day='Czw'
                    name={'thursday'}
                    value={form.thursday.value}
                    meetingTime={form.time.value}
                    valueChangeHandler={updateFormHandler}
                />
                <WeekTime
                    day='Pt'
                    name={'friday'}
                    value={form.friday.value}
                    meetingTime={form.time.value}
                    valueChangeHandler={updateFormHandler}
                />
                <WeekTime
                    day='Sb'
                    name={'saturday'}
                    value={form.saturday.value}
                    meetingTime={form.time.value}
                    valueChangeHandler={updateFormHandler}
                />
                <WeekTime
                    day='Nd'
                    name={'sunday'}
                    value={form.sunday.value}
                    meetingTime={form.time.value}
                    valueChangeHandler={updateFormHandler}
                />

                <Button
                    classes={styles.formButton}
                    fullWidth
                    type='submit'
                    disableButton={disabled}>
                    Zapisz zmiany
                </Button>
            </form>
        </Container>
    );
};

export default ScheduleForm;
