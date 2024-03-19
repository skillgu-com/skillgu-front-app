// Libraries
import React, {useState} from 'react';
// Components
import Checkbox from '../../../component/Checkbox';
import CustomButton from '../../../component/CustomButton';
import TimeInterval from './TimeInterval';

const Hours = (props) => {
	const [hourIndex, setHourIndex] = useState(0);

	const toggleActiveHandler = () =>
		props.valueChangeHandler(props.name, {
			...props.value,
			isActive: !props.value.isActive,
		});

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
			{value: '08:00', errorMessage: '', isValid: undefined},
			{value: '16:00', errorMessage: '', isValid: undefined}
		);

		console.log()
	};

	const removeHours = (index) => updateHours(index, undefined, undefined, true);

	return (
		<div className='schedule__hours'>
			<div className='schedule__hours-top'>
				<Checkbox
					valueChangeHandler={toggleActiveHandler}
					value={props.value.isActive}
					label={props.label}
					required={false}
					classes='contact-form__policy'
				/>
				<CustomButton as='button' _onClick={addHoursHandler}>Dodaj godziny</CustomButton>
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
