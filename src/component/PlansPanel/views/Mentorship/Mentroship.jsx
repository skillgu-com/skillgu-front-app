import React, {useState} from 'react';
import MentorshipTab from './components/MentorshipTab';
import MentorshipPlan from './components/MentorshipPlan';

const Mentroship = (props) => {
	const {plans} = props;
	// States
	const [currentPlan, setCurrentPlan] = useState('little');
	// Handlers
	const changePlanHandler = (id) => setCurrentPlan(id);
	// Plan views
	const plansViews = () => {
		const plansTypes = Object.keys(plans);

		return plansTypes.map((planKey) => (
			<MentorshipPlan
				isCurrent={planKey === currentPlan}
				planProps={plans[planKey]}
			/>
		));
	};
	// JSX
	return (
		<div className='plans-panel__content-mentorship mentorship'>
			<div className='mentorship__tabs'>
				<MentorshipTab
					id='litle'
					name='litle'
					onChange={changePlanHandler}
					currentPlan={currentPlan}
				/>
				<MentorshipTab
					id='standard'
					name='standard'
					onChange={changePlanHandler}
					currentPlan={currentPlan}
				/>
			</div>
			{plansViews}
		</div>
	);
};

export default Mentroship;
