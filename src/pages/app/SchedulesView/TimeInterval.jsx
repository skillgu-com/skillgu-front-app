// Libraires
import React, {useState} from 'react';
// Components
import Input from '../../../component/Input';
import CustomButton from '../../../component/CustomButton';

const TimeInterval = (props) => {
	const {
		isAdditional,
		from: defaultFrom,
		to: defaultTo,
		updateHours,
		index,
		removeHours
	} = props;

	const [from, setFrom] = useState(defaultFrom);
	const [to, setTo] = useState(defaultTo);

	const updateFromHandler = (e) => {
		const value = e.target?.value;
		setFrom(value);
		updateHours(index, value, to);
	};

	const updateToHandler = (e) => {
		const value = e.target?.value;
		setTo(value);
		updateHours(index, from, value);
	};

	const removeHoursHandler = () => removeHours(index)

	return (
		<div>
			<Input
				id='name'
				name='from'
				type='time'
				placeholder='09:00'
				label='Od'
				required={false}
				value={from}
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
				value={to}
				// errorMessage={currentState.name.errorMessage}
				valueChangeHandler={updateToHandler}
			/>
			{isAdditional && <CustomButton _onClick={removeHoursHandler} color='danger'>Usuń</CustomButton>}
		</div>
	);
};

export default TimeInterval;
