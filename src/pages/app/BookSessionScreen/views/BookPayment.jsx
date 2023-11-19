import React from 'react';
import {Grid, TextField} from '@mui/material';

import CustomButton, {buttonTypes} from '../../../../component/CustomButton';
import {useSelector} from 'react-redux';
import {createSession} from '../../../../services/MeetingCreatorService';
import {useNavigate} from 'react-router-dom';

const BookPayment = ({changeStepHandler}) => {
	const userFromRedux = useSelector(
		(state) => state.connectionProcess.sessionStep
	);

	const navigate = useNavigate();
	const createSessionRequest = {
		mentorID: userFromRedux.mentorID,
		sessionTypeID: userFromRedux.sessionTypeID,
	};

	const handleButtonClick = (e) => {
        e.preventDefault()
		createSession(createSessionRequest).then(() => {
		}).catch(error => {
            console.log(error.message);
        });
        changeStepHandler(3);
		// navigate('/home');
	};

	return (
		<div className='book-payment'>
			<div className='book-payment__submit'>
				<button
					onClick={() => changeStepHandler(1)}
					className='book-payment__submit-button'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						height='48'
						viewBox='0 -960 960 960'
						width='48'>
						<path d='m274-450 248 248-42 42-320-320 320-320 42 42-248 248h526v60H274Z' />
					</svg>
					<span>Cofnij</span>
				</button>
				<h2 className='book-payment__submit-session-name'>
					Nazwa sesji: {userFromRedux.sessionName}
				</h2>
				<h3 className='book-payment__submit-session-price'>
					Cena sesji: {userFromRedux.sessionPrice} zł
				</h3>
				<h4 className='book-payment__submit-session-submit'>
					Czas sesji ({userFromRedux.sessionMinutes} minut) z mentorem
				</h4>
				<div className='book-payment__submit-image'>
					<img
						src='https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg'
						alt='mentor'
					/>
				</div>
			</div>
			<form className='book-payment__form'>
				<h5 className='book-payment__form-title'>Płatność Kartą</h5>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							id='email'
							label='Numer karty'
							placeholder='1234 1234 1234 1234'
							name='email'
							autoComplete='email'
							// value={email}
							// onChange={handleEmail}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							autoComplete='given-name'
							name='firstName'
							required
							fullWidth
							id='firstName'
							label='Data'
							placeholder='MM / YY'
							autoFocus
							// value={firstName}
							// onChange={handleFirstName}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							fullWidth
							id='lastName'
							label='CVC'
							placeholder='123'
							name='lastName'
							autoComplete='family-name'
							// value={lastName}
							// onChange={handleLastName}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							id='name'
							label='Imię i nazwisko z karty'
							name='name'
							autoComplete='name'
							// value={email}
							// onChange={handleEmail}
						/>
					</Grid>
					<Grid item xs={12}>
						<CustomButton type='submit' _onClick={handleButtonClick}>
							zapłać
						</CustomButton>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default BookPayment;
