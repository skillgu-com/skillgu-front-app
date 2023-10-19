// Libraries
import React, {useState} from 'react';
// Components
import Checkbox from '../../../component/Checkbox';
import CustomButton from '../../../component/CustomButton';
import TimeInterval from './TimeInterval';

const Hours = (props) => {
	const [isActive, setIsActive] = useState(props.value?.isActive);
	const [hourIndex, setHourIndex] = useState(1);

	const toggleActiveHandler = () => setIsActive(!isActive);

	const updateHours = (index, from, to, remove = false) => {
		const newHours = {
			[index]: remove
				? undefined
				: {
						from: from ?? props.value?.times[index].from,
						to: to ?? props.value?.times[index].to,
				  },
		};

		props.valueChangeHandler(props.name, {
			...props.value,
			times: {...props.value.times, ...newHours},
		});
	};

	const addHoursHandler = () => {
		const newIndex = hourIndex + 1;
		setHourIndex(newIndex);
		updateHours(
			newIndex,
			{value: '00:00', errorMessage: '', isValid: undefined},
			{value: '01:00', errorMessage: '', isValid: undefined}
		);
	};

	const removeHours = (index) => updateHours(index, undefined, undefined, true);




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
			{props.value?.times &&
				Object.keys(props.value.times)?.map(
					(time) =>
						props.value?.times[time] && (
							<TimeInterval
								key={time}
								index={+time}
								{...props.value?.times[time]}
								updateHours={updateHours}
								removeHours={removeHours}
								isAdditional={+time !== 0}
							/>
						)
				)}
		</div>
	);
};

export default Hours;
