import React, {useEffect, useState} from 'react';
import {ScrollContainer} from 'react-indiana-drag-scroll';

import {Grid, TextField, TextArea} from '@mui/material';
import CustomButton, {
    buttonColors,
    buttonTypes,
} from '../../../../component/CustomButton';
import DayRadio from './components/DayRadio';
import {useSelector} from 'react-redux';
import {getAllScheduleMeetingTimeDetails} from '../../../../services/MeetingCreatorService';
import {Link, useParams} from 'react-router-dom';
import {getAllMentorCalendarEvents} from "../../../../services/CalendarService";

const DATES_PLACEHOLDER = [
    {
        id: '1',
        date: new Date(),
        hours: [
            {id: '11', hour: '16:30'},
            {id: '12', hour: '17:30'},
        ],
    },
    // {
    //     id: '2',
    //     date: new Date(),
    //     hours: [
    //         {id: '21', hour: '16:00'},
    //         {id: '22', hour: '17:00'},
    //     ],
    // }
];

const BookForm = ({changeStepBookHandler}) => {
    const {id} = useParams()
    const [firstName, setFirstName] = useState('');
    const [dataApiFromBackend, setDataApiFromBackend] = useState('');
    const [eventName, setEventName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [day, setDay] = useState(null);
    const [hour, setHour] = useState(null);
    const [message, setMessage] = useState('');
    const userFromRedux = useSelector((state) => state.connectionProcess.sessionStep);

    const [calendarEvents, setCalendarEvents] = useState([]);
    const [combinedData, setCombinedData] = useState([]); // Dodaj deklarację useState

    useEffect(() => {
        userFromRedux.sessionID &&
        getAllMentorCalendarEvents(userFromRedux.mentorID).then((res) => {
            const dataFromApi = res.data;
            const combinedData = [];

            console.log(res.data);

            dataFromApi.forEach((item, index) => {
                const startDate = new Date(item.scheduleStartDay);
                const endDate = new Date(item.scheduleEndDay);
                const dateRange = getDateRange(startDate, endDate);

                dateRange.forEach((date, subIndex) => {
                    const hoursForDay = item.weekAvailabilityResponses.map(element => ({
                        id: element.weekAvailabilityId,
                        fromTime: element.fromTime,
                        toTime: element.toTime,
                        weekDay: element.weekDay.replace("time", ""),
                    }));

                    combinedData.push({
                        id: `${index + 1}-${subIndex + 1}`,
                        date,
                        hours: hoursForDay,
                    });
                });
            });



            setCombinedData(combinedData);
        });
    }, [userFromRedux.mentorID]);

    function getDateRange(startDate, endDate) {
        const dateRange = [];
        const currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            dateRange.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dateRange;
    }


    const [calendarForm, setCalendarForm] = useState({
        eventName: '',
        location: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        timeZone: ''
    });


    const handleChange = (event) => {
        const {name, value} = event.target;
        setCalendarForm((element) => ({
            ...element,
            [name]: value,
        }));
    };

    const handleNextStep = () => {
        changeStepBookHandler(calendarForm);
    };

    const handleFirstName = (event) => {
        event.preventDefault();
        setFirstName(event.target.value);
    };
    const handleLastName = (event) => {
        event.preventDefault();
        setLastName(event.target.value);
    };
    const handleEmail = (event) => {
        event.preventDefault();
        setEmail(event.target.value);
    };
    const handleDay = (id) => {
        setDay(id);
        setHour(null);
    };
    const handleHour = (id) => {
        setHour(id);
    };

    const handleTextAreaChange = (event) => {
        setMessage(event.target.value);
    };

    return (
        <form className='book-form'>
            <div className='book-form__data'>
                <div className='book-form__group'>
                    <Link to={`/session-details/${id}`} className='book-payment__submit-button'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            height='48'
                            viewBox='0 -960 960 960'
                            width='48'>
                            <path d='m274-450 248 248-42 42-320-320 320-320 42 42-248 248h526v60H274Z'/>
                        </svg>
                        <span>Cofnij</span>
                    </Link>
                    <h2 className='book-form__title'>Contact Information</h2>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete='given-name'
                                name='firstName'
                                required
                                fullWidth
                                id='eventName'
                                label='Imię'
                                autoFocus
                                value={firstName}
                                onChange={handleFirstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id='lastName'
                                label='Nazwisko'
                                name='lastName'
                                autoComplete='family-name'
                                value={lastName}
                                onChange={handleLastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id='email'
                                label='Email'
                                name='email'
                                autoComplete='email'
                                value={email}
                                onChange={handleEmail}
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className='book-form__group'>
                    <h2 className='book-form__title'>Szczegóły spotkania</h2>
                    <p className='book-form__text'>Wybierz dzień oraz godzinę spotkania.</p>


                    <ScrollContainer className='book-form__days'>
                        {combinedData.map(
                            ({id, date, hours}) =>
                                hours.length > 0 && (
                                    <li key={'d' + id}>
                                        <DayRadio
                                            name='days'
                                            id={id}
                                            days={id}
                                            date={date}
                                            weekDayCells={hours.length}
                                            selectedId={day}
                                            weekDays={hours}
                                            onChangeHandler={handleDay}
                                        />
                                    </li>
                                )
                        )}
                    </ScrollContainer>

                    {combinedData.map(({id, hours}) => (
                        <ul className='book-form__hours' key={'h' + id} data-visible={day === id}>
                            {hours.map((element) => (
                                <li key={element.id}>
                                    <DayRadio
                                        name='dayHour'
                                        {...element}
                                        selectedId={hour}
                                        onChangeHandler={handleHour}
                                    />
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
                <div className='book-form__group'>
                    <label className='book-form__text' htmlFor='message'>
                        <b>Wiadomość do</b>
                    </label>
                    <textarea
                        name='message'
                        id='message'
                        cols='30'
                        rows='10'
                        value={message}
                        onChange={handleTextAreaChange}></textarea>
                </div>
            </div>
            <div className='book-form__submit'>
                <div className='book-form__group'>
                    <h2 className='book-form__title'>Podsumowanie</h2>
                    <div className='book-form__submit-container'>
                        <div className='submit-container__mentor'>
                            <div className='submit-container__mentor-image'>
                                <img
                                    src='https://cdn.pixabay.com/photo/2021/12/22/01/40/male-6886494_960_720.jpg'
                                    alt='mentor'
                                />
                            </div>
                            <h3 className='submit-container__mentor-title'>Nazwa sesji</h3>
                            <h4 className='submit-container__mentor-subtitle'>
                                Mentor - Nazwa Mentora
                            </h4>
                        </div>
                        <ul className='submit-container__info'>
                            <li className='submit-container__info-item'>
                                <span>Cena</span>
                                <span>{userFromRedux.sessionPrice}</span>
                            </li>
                            <li className='submit-container__info-item'>
                                <span>Czas</span>
                                <span>{userFromRedux.sessionMinutes} minut</span>
                            </li>
                        </ul>
                        <CustomButton _onClick={handleNextStep} type={buttonTypes.submit}>
                            Zamów i zapłać
                        </CustomButton>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default BookForm;
