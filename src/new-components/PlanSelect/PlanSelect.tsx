// Libraries
import React, {useEffect, useState} from 'react';
// Components
import Bookmarks from './components/Bookmarks/Bookmarks';
import SessionDescription from './components/SessionDescription/SessionDescription';
import SessionForm from './components/SessionForm/SessionForm';
import MentoringForm from './components/MentoringForm/MentoringForm';
// Styles
import styles from './PlanSelect.module.scss';
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";

export enum PlanTypes {
    Session = 'Session',
    Mentoring = 'Mentoring',
}

interface SessionData {
    id: number;
    name: string;
    sessionTime: number;
    sessionPrice: number;
    description: string;
    meetTime: any;
    mentorID: number;
}

interface PlanSelectProps {
    sessions: SessionData[];
    toggleModalHandler: (isOpen: boolean) => void;
}

const PlanSelect: React.FC<PlanSelectProps> = ({ sessions, toggleModalHandler }) => {
    const [planType, setPlanType] = useState(PlanTypes.Session);
    const [sessionPlanSelect, setSessionPlanSelect] = useState<SessionData[]>([]);


    useEffect(()=>{
        setSessionPlanSelect(sessions);
    })




    const changeTypeHandler = (type: PlanTypes) => setPlanType(type);

    return (
        <>
            <div className={styles.container}>
                <h4 className={styles.title}>Wybierz plan:</h4>
                <div className={styles.wrapper}>
                    <Bookmarks changeTypeHandler={changeTypeHandler} currentType={planType}/>
                    <div className={styles.content}>
                        {planType === PlanTypes.Session ? (
                            <SessionForm
                                sessions={sessionPlanSelect}
                                openModalHandler={() => toggleModalHandler(true)}
                            />
                        ) : (
                            <MentoringForm
                                options={[
                                    {
                                        id: 'mentoring01',
                                        name: 'Podstawowy',
                                        price: 150,
                                        description:
                                            'Dzielę się wiedzą, umiejętnościami i/lub doświadczeniem, wspierając tym samym swojego podopiecznego rozwój ',
                                        scope: [
                                            <>
                                                <strong>4 sesje </strong>mentoringowe na miesiąc (60 minut każda).
                                            </>,
                                            <>
                                                <strong>Nieograniczony dostęp do pytań i odpowiedzi </strong>przez
                                                czat.
                                            </>,

                                        ],
                                    },
                                    {
                                        id: 'mentoring02',
                                        name: 'Pro',
                                        price: 200,
                                        description:
                                            'Dzielę się wiedzą, umiejętnościami i/lub doświadczeniem, wspierając tym samym swojego podopiecznego rozwój ',
                                        scope: [
                                            <>
                                                <strong>4 sesje </strong>mentoringowe na miesiąc (60 minut każda).
                                            </>,
                                            <>
                                                <strong>Nieograniczony dostęp do pytań i odpowiedzi </strong>przez
                                                czat.
                                            </>,
                                            <>
                                                <strong>Odpowiedzi</strong> na Twoje zapytania
                                                <strong>w ciągu 24 godzin lub szybciej.</strong>
                                            </>,
                                            <>
                                                <strong>Bezpośrednie wsparcie praktyczne</strong> w realizacji
                                                Twoich projektów.
                                            </>,
                                        ],
                                    },
                                    {
                                        id: 'mentoring03',
                                        name: 'Pro+',
                                        price: 200,
                                        description:
                                            'Dzielę się wiedzą, umiejętnościami i/lub doświadczeniem, wspierając tym samym swojego podopiecznego rozwój ',
                                        scope: [
                                            <>
                                                <strong>4 sesje </strong>mentoringowe na miesiąc (60 minut każda).
                                            </>,
                                            <>
                                                <strong>Nieograniczony dostęp do pytań i odpowiedzi </strong>przez
                                                czat.
                                            </>,
                                            <>
                                                <strong>Odpowiedzi</strong> na Twoje zapytania
                                                <strong>w ciągu 24 godzin lub szybciej.</strong>
                                            </>,
                                            <>
                                                <strong>Bezpośrednie wsparcie praktyczne</strong> w realizacji
                                                Twoich projektów.
                                            </>,
                                        ],
                                    },
                                ]}
                            />
                        )}
                        <SessionDescription/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlanSelect;
