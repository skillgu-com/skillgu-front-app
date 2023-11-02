import React, {useEffect, useMemo, useState} from 'react';
import MentorShip from './views/Mentorship/MentorShip';
import Sessions from './views/Sessions/Sessions';
import PlanPanelTabs from './components/PlanPanelTabs';
import {useParams} from "react-router-dom";
import {getMeetingPlanPanelSchedule} from "../../services/MeetingCreatorService";

const SESSIONS_PLACEHOLDER_ARRAY = [];
const MENTORSHIP_PLACEHOLDER_ARRAY = {
    lite: {
        id: 123,
        monthlyPrice: 300,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi vero, ipsam quidem sunt totam saepe facere perferendis distinctio necessitatibus quo.',
        benefits: ['1 rozmowa miesięcznie'],
    },
    standard: {
        id: 123,
        monthlyPrice: 300,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi vero, ipsam quidem sunt totam saepe facere perferendis distinctio necessitatibus quo.',
        benefits: [
            '1 rozmowa miesięcznie',
            'Nielimitowane pytania',
            'Odpowiedzi 2 razy dziennie',
            '7 dni za darmo',
        ],
    },
};

const PlansPanel = () => {
    // States
    const {userID} = useParams();
    const [currentTab, setCurrentTab] = useState('mentorship');
    const [currentSession, setCurrentSession] = useState([]);
    const [sessionFromApi, setSessionFromApi] = useState([]);

    useEffect(() => {
        getMeetingPlanPanelSchedule(userID).then((res) => {
            const sessionFromApi = res.data.map((element) => ({
                id: element.sessionType,
                minutes: element.sessionTime,
                price: element.sessionPrice,
                text: element.description,
                mentorID: element.mentorID,
            }));
            const updatedSessions = [...SESSIONS_PLACEHOLDER_ARRAY, ...sessionFromApi];
            setSessionFromApi(updatedSessions);
        });
    }, []);

    const onChangePlanHandler = (id) => setCurrentTab(id);
    const onChangeSessionHandler = (id) => setCurrentSession(id);
    // Views
    const currentView = useMemo(() => {
        switch (currentTab) {
            case 'mentorship':
                return <MentorShip plans={MENTORSHIP_PLACEHOLDER_ARRAY}/>;
            case 'session':
                return (
                    <Sessions
                        sessions={sessionFromApi}
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