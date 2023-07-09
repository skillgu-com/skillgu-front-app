import React, {useState, useMemo} from 'react';
import Mentroship from './views/Mentorship/Mentroship';
import Sessions from './views/Sessions/Sessions';
import PlanPanelTabs from './components/PlanPanelTabs';

const SESSIONS_PLACEHOLDER_ARRAY = [
	{id: 'resume', minutes: 30, price: 200, text: 'Resume feedback'},
	{id: 'work', minutes: 30, price: 200, text: 'Work review'},
	{id: 'interview', minutes: 30, price: 200, text: 'Interview Preparation'},
	{id: 'consultation', minutes: 30, price: 200, text: 'Expert consultation'},
];

const PlansPanel = () => {
	// States
	const [currentTab, setCurrentTab] = useState('session');
	const [currentSession, setCurrentSession] = useState(
		SESSIONS_PLACEHOLDER_ARRAY[0].id
	);
	// Handlers
	const onChangePlanHandler = (id) => setCurrentTab(id);
	const onChangeSessionHandler = (id) => setCurrentSession(id);
	// Views
	const currentView = useMemo(() => {
		switch (currentTab) {
			case 'mentorship':
				return <Mentroship />;
			case 'session':
				return (
					<Sessions
						sessions={SESSIONS_PLACEHOLDER_ARRAY}
						currentSession={currentSession}
						onChangeHandler={onChangeSessionHandler}
					/>
				);
			default:
				throw new Error(`Unknown view ${currentTab}`);
		}
	}, [currentTab, currentSession]);

	return (
		<div className='plans-panel'>
			<div className='plans-panel__tabs'>
				<PlanPanelTabs
					id='mentorship'
					text='Plan mentorstwa'
					currentTab={currentTab}
					onChangeHandler={onChangePlanHandler}
				/>
				<PlanPanelTabs
					id='session'
					text='Sesja'
					currentTab={currentTab}
					onChangeHandler={onChangePlanHandler}
				/>
			</div>
			<div className='plans-panel__content'>{currentView}</div>
		</div>
	);
};

export default PlansPanel;
