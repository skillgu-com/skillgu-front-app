import React from 'react';

const PlanPanelTabs = (props) => {
	const {id, text, onChangeHandler, currentTab} = props;

	return (
		<label className='plans-panel__tabs-item'>
			<input
				type='radio'
				name='plan-type'
				id={id}
				onChange={() => onChangeHandler(id)}
				checked={currentTab === id}
			/>
			<span>{text}</span>
		</label>
	);
};

export default PlanPanelTabs;
