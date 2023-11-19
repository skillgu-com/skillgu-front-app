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
import { Link, useParams } from 'react-router-dom';

const DATES_PLACEHOLDER = [
	{
		id: '1',
		date: new Date(),
		hours: [
			{id: '11', hour: '16:30'},
			{id: '12', hour: '17:30'},
		],
	},
	{
		id: '2',
		date: new Date(),
		hours: [
			{id: '21', hour: '16:00'},
			{id: '22', hour: '17:00'},
		],
	},
	{
		id: '3',
		date: new Date(),
		hours: [
			{id: '31', hour: '16:00'},
			{id: '32', hour: '17:00'},
		],
	},
	{
		id: '4',
		date: new Date(),
		hours: [
			{id: '41', hour: '16:00'},
			{id: '42', hour: '17:00'},
		],
	},
	{
		id: '5',
		date: new Date(),
		hours: [
			{id: '51', hour: '16:00'},
			{id: '52', hour: '17:00'},
		],
	},
	{
		id: '6',
		date: new Date(),
		hours: [
			{id: '61', hour: '16:10'},
			{id: '62', hour: '16:20'},
			{id: '63', hour: '16:30'},
			{id: '64', hour: '16:30'},
			{id: '65', hour: '16:40'},
			{id: '66', hour: '16:50'},
			{id: '67', hour: '17:00'},
		],
	},
	{
		id: '7',
		date: new Date(),
		hours: [
			{id: '71', hour: '16:00'},
			{id: '72', hour: '17:00'},
		],
	},
];

const BookForm = ({changeStepBookHandler}) => {
    const {id} = useParams()
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [day, setDay] = useState(null);
	const [hour, setHour] = useState(null);
	const [message, setMessage] = useState('');
	const userFromRedux = useSelector(
		(state) => state.connectionProcess.sessionStep
	);

	const bookForm = {
		firstName: firstName,
		lastName: lastName,
		email: email,
		day: day,
		hour: hour,
		message: message,
	};

	useEffect(() => {
		userFromRedux.sessionID &&
			getAllScheduleMeetingTimeDetails(userFromRedux.sessionID).then((res) => {});
	}, [userFromRedux.sessionID]);

	const handleNextStep = () => {
		changeStepBookHandler(bookForm);
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
							<path d='m274-450 248 248-42 42-320-320 320-320 42 42-248 248h526v60H274Z' />
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
								id='firstName'
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
						{DATES_PLACEHOLDER.map(
							({id, date, hours}) =>
								hours.length > 0 && (
									<li key={'d' + id}>
										<DayRadio
											date={date}
											spots={hours.length}
											name='day'
											id={id}
											selectedId={day}
											onChangeHandler={handleDay}
										/>
									</li>
								)
						)}
					</ScrollContainer>

					{DATES_PLACEHOLDER.map(({id, date, hours}) => (
						<ul className='book-form__hours' key={'h' + id} data-visible={day === id}>
							{hours.map((item) => (
								<li key={item.id}>
									<DayRadio
										name='dayHour'
										{...item}
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
