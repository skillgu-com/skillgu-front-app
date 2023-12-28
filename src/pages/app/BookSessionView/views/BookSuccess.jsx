import React from 'react';
import Confetti from 'react-confetti';
import CustomButton, {buttonTypes} from '../../../../component/CustomButton';
import {AddToCalendarButton} from 'add-to-calendar-button-react';
import {useSelector} from 'react-redux';

const BookSuccess = () => {
    // const userFromRedux = useSelector((state) => state.connectionProcess.sessionStep);
    const userFromRedux = useSelector((state) => state.calendar.calendarStep);
    const sessionProcess = useSelector((state) => state.connectionProcess.sessionStep);

    console.log(sessionProcess);

    return (
        <div className='book-success'>
            <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                recycle={false}
            />
            <h2 className='book-success__title book-payment__submit-session-price'>
                Twoje spotkanie zostało zarezerwowane!
            </h2>
            <div className='book-success__button'>
                <AddToCalendarButton
                    name={sessionProcess.sessionName}
                    options={['Apple', 'Google']}
                    location='World Wide Web'
                    startDate='2023-12-23'
                    endDate='2024-11-23'
                    startTime='11:15'
                    endTime='11:30'
                    timeZone='America/Los_Angeles'
                    description={sessionProcess.sessionDescription}
                />
            </div>
        </div>
    );
};

export default BookSuccess;
