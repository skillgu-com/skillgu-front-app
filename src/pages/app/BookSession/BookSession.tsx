// Libraries
import React, {useEffect, useRef, useState} from "react";
// Components
import {Actions, Calendar, SelectedDate, SelectedService, Team, UserDetails,} from "./components";
import {Payment} from "./components/Payment/Payment";
// Types
// Styles
import styles from "./BookSession.module.scss";
import {useDispatch} from "react-redux";
import clx from 'classnames'
//
import {faqRows} from "./config";
import FAQ from "src/components/FAQ/Accordion";
import {useBookingReducer} from "src/reducers/booking";
import {fetchMentorShip} from "@services/mentor/fetchMentorServices.service";
import {useLocation} from "react-router-dom";

interface BookSessionProps {
    payment?: boolean;
}

interface SessionState {
    id: number;
    sessionType: string;
    sessionPrice: number;
    description: string;
    meetTime: number;
    mentorID: number;
}

const BookSession = ({payment}: BookSessionProps) => {
    const [term, setTerm] = useState<Date | undefined>(undefined);
    const selectTermHandler = (term: Date) => {
        setTerm(term);
    };

    const [state] = useBookingReducer();
    const dispatch = useDispatch();

    const location = useLocation();


    const formattedDate = term ? term.toLocaleDateString() : "";
    const formattedTime = term ? term.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) : "";

    const fetchInitialRef = useRef<boolean>(false);

    const element = location.state as SessionState;

    useEffect(() => {
        if (element) {
            const {id, sessionType, sessionPrice, description, meetTime, mentorID} = element;

            dispatch({
                type: 'SET_SESSION_IN_FORM',
                payload: {
                    sessionID: id,
                    name: sessionType,
                    time: meetTime,
                    sessionPrice: sessionPrice,
                    description: description,
                    mentorID: mentorID,
                },
            });
        }
    }, [dispatch, element]);

    const mentorTest = {
        avatar_url: "https://cdn.pixabay.com/photo/2023/03/29/19/32/man-7886201_1280.jpg",
        description: "Figma ipsum component variant main layer. Boolean distribute pencil content scrolling blur outline variant. Frame rotate device draft variant italic plugin union stroke.",
        id: "1",
        name: "Marek",
        price: 50,
        profession: "UX/UI Designer w Google",
        reviewsAvgRate: 5,
        reviewsCount: 10,
        skills: ['Figma', 'UX Design', 'UI Design', 'Design Thinking', 'Tag 1', 'Tag 2', 'Tag 3'],
        special: "Szybko odpowiada",
        specialVariant: "success",
        title: "Nauczę Cię dizajnować jak PRO"
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const mentoring = await fetchMentorShip({mentorId: "1"});
                const mentors = await fetch(`/search-mentor-results-mocked.json`).then((d) => d.json());

                if (mentoring.success && mentoring.mentoring.length) {
                    dispatch({
                        type: "SET_SERVICE",
                        payload: {service: mentoring.mentoring[0]},
                    });
                }
                if (
                    mentors && "mentors" in mentors && mentors.mentors && Array.isArray(mentors.mentors) && mentors.mentors.length
                ) {
                    dispatch({
                        type: "SET_MENTOR",
                        payload: {mentor: mentorTest},
                    });
                }
            } catch (e) {
                console.error("Failed to load mentor/service data.");
            }
            fetchInitialRef.current = true;
        };

        if (!fetchInitialRef.current) {
            fetchInitialData();
        }
    }, [dispatch]);

    return (
        <>
            <div className={styles.wrapper}>
                {payment ? null : (
                    <aside>
                        <SelectedService/>
                        <SelectedDate selectedDate={formattedDate} selectedTime={formattedTime}/>
                    </aside>
                )}

                <main className={clx(styles.main, {
                    [styles.mainFullWidth]: payment,
                })}>
                    {payment ? (
                        <section className={styles.sectionPayment}>
                            <Payment/>
                        </section>
                    ) : (
                        <section>
                            <Calendar selectTermHandler={selectTermHandler}/>

                            <div>
                                <h3 className={styles.title}>Szczegóły sesji</h3>

                                <div className={styles.formWrapper}>
                                    <UserDetails/>

                                    <Team/>
                                </div>
                            </div>

                            <Actions/>
                        </section>
                    )}

                    <section>
                        <FAQ title="FAQ" elements={faqRows}/>
                    </section>
                </main>
            </div>
        </>
    );
};

export default BookSession;
