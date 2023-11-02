import React, {useState} from 'react';
// Components
import CustomButton from '../../../../component/CustomButton';
import Input from '../../../../component/Input';

const MeetDetails = (props) => {
	const {title, startDate, endDate, email, phone, participants} = props;
	const [newDate, setNewDate] = useState({
		value: '',
		errorMessage: '',
		isValid: undefined,
	});

	const rescheduleHandler = (e) => {
		e.preventDefault();
	};

	return (
		<div className='meet-details'>
			<h3 className='app__title'>Szczegóły wydarzenia</h3>
			<p className='meet-details__element'>
				<strong>Temat:</strong> {title}
			</p>
			<p className='meet-details__element'>
				<strong>Data rozpoczęcia:</strong> {startDate?.toLocaleDateString()}
			</p>
			<p className='meet-details__element'>
				<strong>Data zakończenia:</strong> {endDate?.toLocaleDateString()}
			</p>
			<h3 className='app__title'>Lista uczestników</h3>
			<p className='meet-details__element'>
				<strong>Imię i nazwisko:</strong>{' '}
				{participants?.map(
					(name, index) => `${name}${participants?.length - 1 === index ? '' : ', '}`
				)}
			</p>
			<p className='meet-details__element'>
				<strong>E-mail:</strong> <a href={`mailto:${email}`}>{email}</a>
			</p>
			<p className='meet-details__element'>
				<strong>Telefon:</strong> <a href={`tel:${phone}`}>{phone}</a>
			</p>
			<hr />
			<h3 className='app__title'>Przełóż</h3>
			<p className='app__text'>
				Wybierz nowy termin spotkania. Spotkanie zostanie automatycznie przełożone.
			</p>
			<form onSubmit={rescheduleHandler}>
				<Input
					id='scheduleStartNewDay'
					type='date'
					name='scheduleStartNewDay'
					label='Nowy termin spotkania'
					value={newDate.value}
					errorMessage={newDate.errorMessage}
					valueChangeHandler={(_name, value) => setNewDate(value)}
				/>
				<CustomButton as='submit'>Potwierdź nowy termin</CustomButton>
			</form>
			<hr />
			<CustomButton color='danger' classes='meet-details__cancel'>
				Odwołaj
			</CustomButton>
		</div>
	);
};

export default MeetDetails;
