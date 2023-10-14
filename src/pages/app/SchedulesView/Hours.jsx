// Libraries
import React, {useState} from 'react';
// Components
import Checkbox from '../../../component/Checkbox';
import CustomButton from '../../../component/CustomButton';
import TimeInterval from './TimeInterval';

const Hours = (props) => {
	const [isActive, setIsActive] = useState(false);
	const [hours, setHours] = useState({0: {from: null, to: null}});
	const [hourIndex, setHourIndex] = useState(1);

	const toggleActiveHandler = () => setIsActive(!isActive);
	const addHoursHandler = () => {
		setHourIndex(hourIndex + 1);
		setHours({...hours, [hourIndex]: {from: null, to: null}});
	};

	const updateHours = (index, from, to) => {
		setHours({...hours, [index]: {from, to}});
	};

	const removeHours = (index) => setHours({...hours, [index]: undefined});

	return (
		<div className='schedule__hours'>
			<div className='schedule__hours-top'>
				<Checkbox
					valueChangeHandler={toggleActiveHandler}
					value={isActive}
					label={props.label}
					required={false}
					classes='contact-form__policy'
				/>
				<CustomButton _onClick={addHoursHandler}>Dodaj godziny</CustomButton>
			</div>
			{Object.keys(hours).map(
				(time) =>
					hours[time] && (
						<TimeInterval index={+time} {...hours[time]} updateHours={updateHours} removeHours={removeHours} isAdditional={+time !== 0} />
					)
			)}
		</div>
	);
};

export default Hours;
