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
import {
    fetchMentorShip,
    getMentorProfileByID,
    getMentorProfileByMentorId
} from "@services/mentor/fetchMentorServices.service";
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


    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                // Fetch mentor data from API
                const mentorData = await getMentorProfileByMentorId(element?.opt.mentorID);
                dispatch({
                    type: "SET_SERVICE",
                    payload: { service: element?.opt },
                });
                if (mentorData && mentorData.firstName && mentorData.lastName) {
                    // Structure the data as needed for the dispatch
                    const mentor = {
                        avatar_url: mentorData.profileImage || "default_avatar_url", // Add a default URL if needed
                        description: mentorData.description || "No description available",
                        id: mentorData.id || "N/A",
                        name: `${mentorData.firstName} ${mentorData.lastName}`,
                        price: mentorData.price || 0,
                        profession: mentorData.jobPosition || "No profession specified",
                        reviewsAvgRate: mentorData.reviewsAvgRate || 0,
                        reviewsCount: mentorData.reviewsCount || 0,
                        skills: mentorData.skills || [],
                        special: mentorData.special || "",
                        specialVariant: mentorData.specialVariant || "success",
                        title: mentorData.title || "No title available"
                    };
                    dispatch({
                        type: "SET_MENTOR",
                        payload: { mentor },
                    });
                }
            } catch (e) {
                console.error("Failed to load mentor/service data.", e);
            }
            fetchInitialRef.current = true;
        };

        fetchInitialData();
    }, [element?.opt.mentorID, dispatch]);

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
