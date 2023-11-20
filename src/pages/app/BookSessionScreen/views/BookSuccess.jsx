import React from 'react';
import Confetti from 'react-confetti';
import CustomButton, {buttonTypes} from '../../../../component/CustomButton';
import {AddToCalendarButton} from 'add-to-calendar-button-react';
import {useSelector} from 'react-redux';

const BookSuccess = () => {
	const userFromRedux = useSelector(
		(state) => state.connectionProcess.sessionStep
	);

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
					name='Title'
					options={['Apple', 'Google']}
					location='World Wide Web'
					startDate='2023-11-23'
					endDate='2023-11-23'
					startTime='10:15'
					endTime='23:30'
					timeZone='America/Los_Angeles'
				/>
			</div>
		</div>
	);
};

export default BookSuccess;
