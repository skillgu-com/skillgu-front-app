import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
// Components

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
import Container from "../../../../../components/Container/Container";
import NavTitle from "../../../../../components/typography/NavTitle/NavTitle";
import {createScheduleMeeting, editMentorSchedule, ScheduleDTO} from "@services/scheduleService";


const today = new Date();

const defaultSlot = {
    dateFrom: setHours(setMinutes(today, 0), 9),
    dateTo: setHours(setMinutes(today, 0), 17)
};

const revalidatingTimeout: Record<string, ReturnType<typeof setTimeout>> = {};

const ScheduleForm = () => {
    const navigate = useNavigate();    const { scheduleId } = useParams<{ scheduleId: string }>();

    // const [data, setData] = useState<any>(null);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const {formState, control, clearErrors, watch, getValues, handleSubmit, trigger,} = useForm<ScheduleFormInputT>({
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
        mode: 'onChange',
    })
    const weekdaysValue = watch('weekdays');
    const meetingLengthValue = watch('meetingLength');

    const onSubmit: SubmitHandler<ScheduleFormInputT> = useCallback((data) => {
        createScheduleMeeting(data).then(() => {navigate('/schedules');
        }).catch(error => {
            console.error('Error creating schedule meeting:', error.response);
        });
    }, [navigate]);

    const revalidate = useCallback((path: string) => () => {
        const timeoutId = revalidatingTimeout[path]
        if (timeoutId) clearTimeout(timeoutId);

        revalidatingTimeout[path] = setTimeout(() => {
            trigger(path as keyof ScheduleFormInputT);
        }, 10);
    }, []);


    useEffect(() => {
        // revalidate weekdays when meeting length changes or weekdaysValue changes
        revalidate('weekdays')();
    }, [meetingLengthValue]);


    useEffect(() => {
        if (scheduleId) {
            setIsEdit(true);
            const fetchData = async () => {
                try {
                    // TODO po implementacji, do wyrzucenia ten const !!! !!!
                    const updatedData: ScheduleDTO = {
                        scheduleName: 'Nowy Harmonogram test',
                        scheduleStartDay: '2024-07-01',
                        scheduleEndDay: '2024-07-31',
                        meetTime: 50,
                        resign: false,
                        type: 'individual',
                        participant: 5,
                        weekTimes: {
                            MONDAY: [
                                {
                                    from: { time: '21:00' },
                                    to: { time: '22:00' }
                                }
                            ],
                            WEDNESDAY: [
                                {
                                    from: { time: '09:00' },
                                    to: { time: '15:00' }
                                }
                            ],
                            THURSDAY: [
                                {
                                    from: { time: '09:00' },
                                    to: { time: '15:00' }
                                }
                            ],
                            FRIDAY: [
                                {
                                    from: { time: '09:00' },
                                    to: { time: '15:00' }
                                }
                            ]
                        }
                    };

                    const result = await editMentorSchedule(scheduleId,updatedData);

                    // setData(result);
                } catch (error) {
                    console.error('Error fetching schedule data:', error);
                }
            };
            fetchData();
        } else {
            setIsEdit(false);
        }
    }, [scheduleId]);


    return (
        <Container as={Tag.Section} classes={stylesSessions.wrapper}>
            <NavTitle>Szczegóły harmonogramu</NavTitle>
            <form className={stylesSessions.form} onSubmit={handleSubmit(onSubmit)}>

                <ScheduleFormGeneralSettings formControl={control} formWatch={watch} formState={formState}/>
                <div>
                    {weekdays.map((name, index) => {
                        const weekdayDate = setDay(today, index + 1);
                        const baseName = `weekdays.${name}`
                        return (
                            <WeekTime
                                key={name}
                                label={format(weekdayDate, 'EEEEEE')}
                                baseName={baseName}
                                formControl={control}
                                formGetValues={getValues}
                                formClearErrors={clearErrors}
                                isRowActivated={weekdaysValue[name].isActivated}
                                revalidate={revalidate(baseName)}
                            />
                        )
                    })}
                </div>
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
