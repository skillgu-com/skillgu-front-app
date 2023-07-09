import React, {useState, useMemo} from 'react';
import Mentroship from './views/Mentorship/Mentroship';
import Sessions from './views/Sessions/Sessions';
import PlanPanelTabs from './components/PlanPanelTabs';

const PlansPanel = () => {
	// States
	const [currentTab, setCurrentTab] = useState('mentorship');
	// Handlers
	const onChangePlanHandler = (id) => setCurrentTab(id);
	// Views
	const currentView = useMemo(() => {
		switch (currentTab) {
			case 'mentorship':
				return <Mentroship />;
			case 'session':
				return <Sessions />;
			default:
				throw new Error(`Unknown view ${currentTab}`);
		}
	}, [currentTab]);

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
