import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
// Components
import {NavTitle} from '@newComponents/typography';
import Container from '@newComponents/Container/Container';
import WeekTime from './_components/WeekTime/WeekTime';
// Types
import {Tag} from '@customTypes/tags';
// Styles
import stylesSessions from '../SessionForm/SessionForm.module.scss';
import {SubmitHandler, useForm} from "react-hook-form";
import {addMonths, format, setDay, setHours, setMinutes} from "date-fns";
import {Button} from "@mui/material";
import {ScheduleFormInputT} from "./_types/ScheduleFormInputT";
import {type WeekdayT, weekdays} from "./_types/WeekdayT";
import {WeekdayInputT} from "./_types/WeekdayInputT";
import ScheduleFormGeneralSettings from "./_components/ScheduleFormGeneralSettings/ScheduleFormGeneralSettings";


const today = new Date();

const defaultSlot = {
    dateFrom: setHours(setMinutes(today, 0), 9),
    dateTo: setHours(setMinutes(today, 0), 17)
}

const ScheduleForm = () => {
    // TODO rwd

    const {formState, control, clearErrors, watch, getValues, handleSubmit} = useForm<ScheduleFormInputT>({
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
            }, {} as Record<WeekdayT, WeekdayInputT>)
        },
        mode: 'onSubmit',
    })

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<ScheduleFormInputT> = useCallback((data) => {
        console.log('DONE')
        // createScheduleMeeting(data).then(() => {
        //     navigate('/schedules');
        // }).catch(error => {
        //     console.error('Error creating schedule meeting:', error.response);
        // });
    }, [navigate]);

    const weekdaysValue = watch('weekdays');

    return (
        <Container as={Tag.Section} classes={stylesSessions.wrapper}>
            <NavTitle>Szczegóły harmonogramu</NavTitle>
            <form className={stylesSessions.form} onSubmit={handleSubmit(onSubmit)}>

                <ScheduleFormGeneralSettings formControl={control} formWatch={watch} formState={formState}/>
                {weekdays.map((name, index) => {
                    const weekdayDate = setDay(today, index + 1);
                    return (
                        <WeekTime
                            key={name}
                            label={format(weekdayDate, 'EEEEEE')}
                            baseName={`weekdays.${name}`}
                            formControl={control}
                            formGetValues={getValues}
                            formClearErrors={clearErrors}
                            isRowActivated={weekdaysValue[name].isActivated}
                        />
                    )
                })}
                <Button
                    sx={{mt: 2}}
                    fullWidth
                    variant='contained'
                    type='submit'
                    disabled={!formState.isValid}
                >
                    Zapisz zmiany
                </Button>
            </form>
        </Container>
    );
};

export default ScheduleForm;
