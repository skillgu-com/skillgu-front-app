import React from 'react';

const SessionItem = (props) => {
	const {id, name, minutes, price, isChecked} = props;

	return (
		<li className='session__list-item'>
			<label>
				<input type='radio' name='session-type' id={id} checked={isChecked} />
				<span className='session__name'>{name}</span>
				<span className='session__details'>{minutes} minut, {price} zł za sesję</span>
			</label>
		</li>
	);
};

export default SessionItem;
