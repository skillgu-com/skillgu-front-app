// Libraries
import React, {useEffect, useRef, useState} from "react";
import {Link, Path, useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
// Components
import {Actions, Calendar, SelectedDate, SelectedService, Team, UserDetails,} from "./components";
import {Payment} from "./components/Payment/Payment";
import Container from "src/components/Container/Container";
import Arrow from "@icons/Arrow";
// Types
import {Tag} from "@customTypes/tags";
// Styles
import bookSessionStyles from "./BookSession.module.scss";
import sharedStyles from "./../../../styles/sharedStyles/selectSessionDatesPage.module.scss";
import clx from 'classnames'
//
import {faqRows} from "./config";
import FAQ from "src/components/FAQ/Accordion/Accordion";
import {useBookingReducer} from "src/reducers/booking";
import {fetchMentorShip} from "@services/mentor/fetchMentorServices.service";
import NavigateBackButton from "../../../components/NavigateBackButton/NavigateBackButton";
import Box from "@mui/material/Box";

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

type LocationStateTypes = {
    opt: SessionState;
    from: Path
}

const BookSession = ({payment}: BookSessionProps) => {
    const [term, setTerm] = useState<Date | undefined>(undefined);
    const selectTermHandler = (term: Date) => {
        setTerm(term);
    };

    const [state] = useBookingReducer();
    const dispatch = useDispatch();

    const formattedDate = term ? term.toLocaleDateString() : "";
    const formattedTime = term ? term.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) : "";

    const fetchInitialRef = useRef<boolean>(false);

    const location = useLocation();
    const element = location.state as LocationStateTypes;


    useEffect(() => {
        if (element?.opt) {
            const {id, sessionType, sessionPrice, description, meetTime, mentorID} = element.opt;

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
        name: "Chujek",
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
                // const mentoring = await fetchMentorShip({mentorId: "1"});
                const mentors = await fetch(`/search-mentor-results-mocked.json`).then((d) => d.json());
                dispatch({
                    type: "SET_SERVICE",
                    payload: {service: element?.opt},
                });
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


    const navigate = useNavigate();
    const onSubmit = () => {
        navigate(`/session-book/1/payment`);
    }

    return (
        <>
            {!payment ? <Container as={Tag.Div}>
                <Box sx={{ margin: '24px 16px' }}>
                    <NavigateBackButton label='Powrót do profilu mentora' customTarget={element?.from || '/search-mentors'} />
                </Box>
            </Container> : null}
            <Container as={Tag.Div}>
                <div className={sharedStyles.wrapper}>
                    {payment ? null : (
                        <aside>
                            <SelectedService/>
                            <SelectedDate selectedDate={formattedDate} selectedTime={formattedTime}/>
                        </aside>
                    )}

                    <main className={clx(sharedStyles.main, {
                        [bookSessionStyles.mainFullWidth]: payment,
                    })}>
                        {payment ? (
                            <section className={bookSessionStyles.sectionPayment}>
                                <Payment/>
                            </section>
                        ) : (
                            <section>
                                <Calendar selectTermHandler={selectTermHandler}/>
                                <div>
                                    <h3 className={sharedStyles.title}>Szczegóły sesji</h3>

                                    <div className={sharedStyles.formWrapper}>
                                        <UserDetails/>
                                        <Team/>
                                    </div>
                                </div>
                                <Actions onSubmit={onSubmit}/>
                            </section>
                        )}

                        <section>
                            <FAQ title="FAQ" elements={faqRows}/>
                        </section>
                    </main>
                </div>
            </Container>
        </>
    );
};

export default BookSession;
