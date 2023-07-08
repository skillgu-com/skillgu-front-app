import React from 'react';

const MentorshipTab = (props) => {
	const {name, id, onChangeHandler, currentPlan} = props;
	// JSX
	return (
		<label className='mentorship__tabs-item'>
			<input
				type='radio'
				id={id}
				name={name}
				onChange={onChangeHandler}
				checked={currentPlan === id}
			/>
		</label>
	);
};

export default MentorshipTab;
