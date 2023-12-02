import AppLayout from '../../../component/AppLayout';
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../../context/AuthContextProvider';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import Modal from '../../../component/Modal';
import MeetDetails from './containers/MeetDetails';
import {googleCalendar, startGoogleAuth} from "../../../services/GoogleService";
import axios from "axios";
import {getAllCalendarEvents} from "../../../services/CalendarService";
import {useSelector} from "react-redux";

const localizer = momentLocalizer(moment);
const CalendarView = () => {
    const userFromRedux = useSelector((state) => state.auth.user);


    useEffect(() => {
        getAllCalendarEvents().then(r => {
           console.log(r.data)
        });
    },[])

    console.log(userFromRedux.role);

    return (
        <AppLayout fluid>
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
        </AppLayout>
    );
};

export default CalendarView;
