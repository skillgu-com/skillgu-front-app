// Libraries
import React, {useEffect, useState} from 'react';
// Components
import Bookmarks from './components/Bookmarks/Bookmarks';
import SessionDescription from './components/SessionDescription/SessionDescription';
import SessionForm from './components/SessionForm/SessionForm';
import MentoringForm from './components/MentoringForm/MentoringForm';
// Styles
import styles from './PlanSelect.module.scss';
import {getSessionTypes} from "../../services/KeyValuesService";
import {useDispatch, useSelector} from "react-redux";
import {fetchMentorSession} from "../../services/SessionService";
import {useParams} from "react-router-dom";
import {fetchUserIDByEmail} from "../../services/UserProfileService";
import sessionReducer from "../../reducers/sessionProcessReducer";

export enum PlanTypes {
    Session = 'Session',
    Mentoring = 'Mentoring',
}

interface Session {
    id: number;
    name: string;
    time: number; // lub string, jeśli oczekujesz czasu w innym formacie
    price: number; // lub string, jeśli ceny są formatowane jako tekst
}

interface PlanSelectProps {
    toggleModalHandler: (isOpen: boolean) => void;
}

const PlanSelect = (props: PlanSelectProps) => {
    const dispatch = useDispatch();
    const {toggleModalHandler} = props;
    const id = useParams();


    const [sessionPlanSelect, setSessionPlanSelect] = useState<Session[]>([]);



    const [planType, setPlanType] = useState(PlanTypes.Session);

    useEffect(() => {
        fetchMentorSession(id?.userID).then(res => {
            const formattedSessions = res?.data.map((element: { id: { toString: () => any; }; name: any; sessionTime: any; sessionPrice: any; }) => ({
                id: element?.id.toString(),
                name: element.name,
                time: element.sessionTime,
                price: element.sessionPrice,
            }));

            setSessionPlanSelect(formattedSessions);

        });
    }, [id?.userID, dispatch]);


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
