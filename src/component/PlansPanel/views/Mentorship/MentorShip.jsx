import React, {useState, useMemo} from 'react';
import MentorshipTab from './components/MentorshipTab';
import MentorshipPlan from './components/MentorshipPlan';

const MentorShip = (props) => {
	const {plans} = props;

	// States
	const [currentPlan, setCurrentPlan] = useState('lite');
	// Handlers
	const changePlanHandler = (id) => setCurrentPlan(id);
	// Plan views
	const plansViews = useMemo(() => {
		if (!plans) return;
		const plansTypes = Object.keys(plans);

		return plansTypes?.map((planKey) => (
			<MentorshipPlan
				key={planKey}
				isCurrent={planKey === currentPlan}
				planProps={plans[planKey]}
			/>
		));
	}, [plans, currentPlan]);
	// JSX
	return (
		<div className='mentorship'>
			<div className='mentorship__tabs'>
				<MentorshipTab
					id='lite'
					name='plan'
					text='Lite Plan'
					onChangeHandler={changePlanHandler}
					currentPlan={currentPlan}
				/>
				<MentorshipTab
					id='standard'
					name='plan'
					text='Standard Plan'
					onChangeHandler={changePlanHandler}
					currentPlan={currentPlan}
				/>
			</div>
			{plansViews}
		</div>
	);
};

export default MentorShip;
