import React from 'react';

const MentorshipTab = (props) => {
	const {name, id, onChangeHandler, currentPlan, text} = props;
	// JSX
	return (
		<label className='mentorship__tabs-item' data-current={currentPlan === id}>
			<input
				type='radio'
				id={id}
				name={name}
				onChange={() => onChangeHandler(id)}
				checked={currentPlan === id}
			/>
			<span>{text}</span>
		</label>
	);
};

export default MentorshipTab;
