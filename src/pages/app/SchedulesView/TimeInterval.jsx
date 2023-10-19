// Libraires
import React from 'react';
// Components
import Input from '../../../component/Input';
import CustomButton from '../../../component/CustomButton';

const TimeInterval = (props) => {
	const {
		isAdditional,
		from: {value: defaultFrom},
		to: {value: defaultTo},
		updateHours,
		index,
		removeHours
	} = props;

	const updateFromHandler = (name, value) => {
		updateHours(index, value);
	};

	const updateToHandler = (name, value) => {
		updateHours(index, undefined, value);
	};

	const removeHoursHandler = () => removeHours(index)

	return (
		<div className='schedule__hours-interval'>
			<Input
				id='name'
				name='from'
				type='time'
				placeholder='09:00'
				label='Od'
				required={false}
				value={defaultFrom}
				// errorMessage={currentState.name.errorMessage}
				valueChangeHandler={updateFromHandler}
			/>
			<Input
				id='name'
				name='to'
				type='time'
				placeholder='10:00'
				label='Do'
				required={false}
				value={defaultTo}
				// errorMessage={currentState.name.errorMessage}
				valueChangeHandler={updateToHandler}
			/>
			{isAdditional && <CustomButton _onClick={removeHoursHandler} color='danger'>Usuń</CustomButton>}
		</div>
	);
};

export default TimeInterval;
