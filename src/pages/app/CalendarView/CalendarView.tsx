import React, {useState} from 'react';
import {useEffect} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import Modal from '../../../component/Modal';
import MeetDetails from './containers/MeetDetails';
import {useQuery} from "@tanstack/react-query";
import
    getMentoringSessionsInDatesService
    from "../../../services/mentoringSessions/getMentoringSessionsInDates.service";

const localizer = momentLocalizer(moment);

const CalendarView = () => {
    const {data} = useQuery({
        queryKey: ['calendarEvents'],
        queryFn: () => getMentoringSessionsInDatesService({from: new Date(), to: new Date(), userId: '1'}),
    });

    console.log(data)


    return (
        <>
            <div>
                <h1>Kalendarz</h1>
            </div>
            <div className='calendar-wrapper'>
                <Calendar
                    localizer={localizer}
                    events={[
                        {
                            id: 0,
                            title: 'Rozmowa ekspercka',
                            allDay: true,
                            start: new Date(),
                            end: new Date(),
                        },
                        {
                            id: 1,
                            title: 'Przygotowanie do interview',
                            allDay: true,
                            start: new Date(),
                            end: new Date(),
                        },
                        {
                            id: 2,
                            title: 'Plan na nauke',
                            allDay: true,
                            start: new Date(),
                            end: new Date(),
                        },
                        {
                            id: 3,
                            title: 'Plan na nauke',
                            allDay: true,
                            start: new Date(),
                            end: new Date(),
                        },
                    ]}
                    startAccessor='start'
                    endAccessor='end'
                    style={{height: 500}}
                    components={{
                        eventWrapper: ({event}) => (
                            <Modal buttonClasses='rbc-event rbc-event-allday' trigger={event.title}>
                                <MeetDetails
                                    title={event.title}
                                    startDate={event.start}
                                    endDate={event.end}
                                    email={'test@test.pl'}
                                    phone={'123123123'}
                                    participants={['Jan Kowalski', 'Kowalski Jan']}
                                />
                            </Modal>
                        ),
                    }}
                />
            </div>
        </>
    );
};

export default CalendarView;
