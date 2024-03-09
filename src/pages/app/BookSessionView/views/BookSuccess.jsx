import React from 'react';
import Confetti from 'react-confetti';
import {AddToCalendarButton} from 'add-to-calendar-button-react';
import {useSelector} from 'react-redux';

const BookSuccess = () => {
    const sessionProcess = useSelector((state) => state.connectionProcess.sessionStep);
    const sessionData = useSelector((state) => state.book.bookSessionState);
    const bookSession = useSelector((state) => state.book.bookSessionState);


    // Przekształć datę term na obiekt Date
    const termDate = new Date(sessionData?.term);

// Przekształć datę na format yyyy-mm-dd
    const startDate = termDate.toISOString().split('T')[0];

// Przekształć czas na format hh:mm
    const startTime = termDate.toTimeString().slice(0, 5);

// Oblicz czas końca na podstawie czasu startu i długości sesji
    const sessionLengthInMinutes = bookSession?.time; // Długość sesji w minutach
    const endTime = new Date(termDate.getTime() + sessionLengthInMinutes * 60000)
        .toTimeString()
        .slice(0, 5);


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
                    location='Online'
                    startDate={startDate}
                    endDate={startDate}
                    startTime={startTime}
                    endTime={endTime}
                    timeZone='America/Los_Angeles'
                    description={sessionProcess.sessionDescription}
                />
            </div>
        </div>
    );
};
export default BookSuccess;