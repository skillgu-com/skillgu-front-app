import React from 'react';
import {useNavigate} from 'react-router-dom';
// Components
import {NavTitle} from '@newComponents/typography';
import Container from '@newComponents/Container/Container';
import MeetingType from '../../components/MeetingType/MeetingType';
import Checkbox from '@newComponents/Checkbox/Checkbox';
import WeekTime from '../../components/WeekTime/WeekTime';
// Types
import {Tag} from '@customTypes/tags';
// Styles
import styles from './ScheduleForm.module.scss';
import stylesSessions from '../SessionForm/SessionForm.module.scss';
import StepInput from '@newComponents/StepInput/StepInput';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {addMonths, format, setDay, setHours, setMinutes} from "date-fns";
import {Box, Button, Collapse} from "@mui/material";
import Typography from "@mui/material/Typography";
import FormInputText from "@newComponents/_form/FormInputText/FormInputText";
import FormDatePicker from "@newComponents/_form/FormDatePicker/FormDatePicker";
import {createScheduleMeeting} from "@services/ScheduleService";

const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
export type Weekday = typeof weekdays[number];

type WeekdayInput = {
    isActivated: boolean;
    slots: { dateFrom: Date, dateTo: Date }[]
}

export type ScheduleFormInput = {
    name: string;
    meetingLength: number;
    type: 'individual' | 'group';
    cancelAvailable: boolean;
    dateFrom: Date;
    dateTo: Date;
    participantsNumber: number; // only for group
    weekdays: Record<Weekday, WeekdayInput>,
}

const today = new Date();

const boxWithLabelSX = {
    display: 'grid',
    gap: 1,
}

const defaultSlot = {
    dateFrom: setHours(setMinutes(today, 0), 9),
    dateTo: setHours(setMinutes(today, 0), 17)
}

const ScheduleForm = () => {
    // TODO rwd
    // TODO optimize

    const form = useForm<ScheduleFormInput>({
        defaultValues: {
            name: '',
            meetingLength: 30,
            type: 'individual',
            cancelAvailable: false,
            dateFrom: today,
            dateTo: addMonths(today, 1),
            participantsNumber: 1,
            weekdays: weekdays.reduce((acc, day) => {
                acc[day] = {
                    isActivated: false,
                    slots: [defaultSlot]
                }
                return acc;
            }, {} as Record<Weekday, WeekdayInput>)
        },
        mode: 'onChange',
    })

    const selectedType = form.watch('type');

    const selectedDateFrom = form.watch('dateFrom');
    const selectedDateTo = form.watch('dateTo');

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<ScheduleFormInput> = (data) => {
        // createScheduleMeeting(data).then(() => {
        //     navigate('/schedules');
        // }).catch(error => {
        //     console.error('Error creating schedule meeting:', error.response);
        // });
    };

    console.log('render')

    return (
        <Container as={Tag.Section} classes={stylesSessions.wrapper}>
            <NavTitle>Szczegóły harmonogramu</NavTitle>
            <form className={stylesSessions.form} onSubmit={form.handleSubmit(onSubmit)}>
                <Box sx={boxWithLabelSX}>
                    <Typography variant='buttonMd'>Nazwa</Typography>
                    <FormInputText
                        name='name'
                        control={form.control}
                        formState={form.formState}
                        inputProps={{placeholder: 'Nazwa harmonogramu'}}
                        controllerProps={{rules: {required: 'To pole jest wymagane'}}}
                    />
                </Box>

                <Controller
                    control={form.control}
                    name='meetingLength'
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
                    control={form.control}
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
                        control={form.control}
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
                    control={form.control}
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
                        <FormDatePicker
                            formState={form.formState}
                            name='dateFrom'
                            control={form.control}
                            controllerProps={{rules: {required: 'To pole jest wymagane'}}}
                            inputProps={{maxDate: selectedDateTo}}
                        />
                        <FormDatePicker
                            formState={form.formState}
                            name='dateTo'
                            control={form.control}
                            controllerProps={{rules: {required: 'To pole jest wymagane'}}}
                            inputProps={{minDate: selectedDateFrom}}
                        />
                    </div>
                </div>
                {weekdays.map((name, index) => {
                    const weekdayDate = setDay(new Date(), index + 1);
                    return (
                        <WeekTime
                            key={name}
                            label={format(weekdayDate, 'EEEEEE')}
                            baseName={`weekdays.${name}`}
                            form={form}
                        />
                    )
                })}
                    <Button
                        sx={{ mt: 2}}
                        fullWidth
                        variant='contained'
                        type='submit'
                    >
                        Zapisz zmiany
                    </Button>
            </form>
        </Container>
    );
};

export default ScheduleForm;
