import React, {FC, useEffect, useState} from "react";
import {ServiceMentoringOptionCard} from "src/components/Cards/ServiceMentoringOptionCard";

import {useParams} from "react-router-dom";
import Container from "src/components/Container/Container";

import {Actions, Team, UserDetails} from "../BookSession/components";
import {useQuery} from "@tanstack/react-query";
import getSubscriptionService, {
    getSubscriptionServiceKeyGenerator
} from "@services/subscription/getSubscription.service";
import Box from "@mui/material/Box";
import NavigateBackButton from "src/components/NavigateBackButton/NavigateBackButton";
import sharedStyles from "src/styles/sharedStyles/selectSessionDatesPage.module.scss";
import {Tag} from "@customTypes/tags";
import {getMentorProfileByID, getMentorProfileByIDKeyGenerator} from "@services/mentor/fetchMentorServices.service";
import SelectedSlotsCounter from "src/components/SelectedSlotsCounter/SelectedSlotsCounter";
import FAQ from "src/components/FAQ/Accordion/Accordion";
import {faqRows} from "../BookSession/config";
import {useBookingReducer} from "src/reducers/booking";
import WeeklyCalendarPicker from "src/components/WeeklyCalendarPicker/WeeklyCalendarPicker";
import Typography from "@mui/material/Typography";
import useCalendarLogic from "./_logic/useCalendarLogic";
import useUserInputLogic from "./_logic/useUserInputLogic";
import {parseUserFromJwt} from "../../../helpers/parseUserFromJwt";


const MenteeSubscriptionDetailPage: FC = () => {
    const {mentorshipId, subscriptionId} = useParams() as { mentorshipId: string, subscriptionId: string };
    const [bookingState, dispatchBookingAction] = useBookingReducer();
    const [isUserDetailsFilled, setIsUserDetailsFilled] = useState(false);
    const [state] = useBookingReducer();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState(""); // To store user's email from token if logged in


    const {data: subscriptionData} = useQuery({
        queryKey: getSubscriptionServiceKeyGenerator(mentorshipId),
        queryFn: () => getSubscriptionService(mentorshipId),
    });

    const {data: mentorData} = useQuery({
        // subscriptionData will be defined, it's checked in the enabled property
        queryKey: getMentorProfileByIDKeyGenerator(subscriptionData?.mentorId!),
        // subscriptionData will be defined, it's checked in the enabled property
        queryFn: () => getMentorProfileByID(subscriptionData?.userId!),
        enabled: !!subscriptionData?.userId,
    });
    const planTitlesMap = {basic: 'Podstawowy', advanced: 'Zaawansowany', pro: 'Pro'};
    type PlanKey = keyof typeof planTitlesMap;
    const getPlanTitle = (plan: string): string => {
        return planTitlesMap[plan as PlanKey] || '';
    };


    useEffect(() => {
        const token = localStorage.getItem("jwttoken");
        if (token) {
            setIsLoggedIn(true);
            const userData = parseUserFromJwt(token);
            setUserEmail(userData?.email);
            setIsUserDetailsFilled(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleUserDetailsFilled = (filled: boolean) => {
        setIsUserDetailsFilled(filled);
    };

    useEffect(() => {
        dispatchBookingAction({
            type: 'UPDATE_MENTOR_ID',
            payload: {mentorId: subscriptionData?.mentorId || ''}
        });


        dispatchBookingAction({
            type: 'UPDATE_MENTORSHIP_ID',
            payload: {mentorshipId: subscriptionData?.mentorshipPlan?.id || ''}
        });

        dispatchBookingAction({
            type: 'UPDATE_SUBSCRIPTION_SCHEDULE_ID',
            payload: { scheduleId: subscriptionData?.mentorshipPlan?.scheduleId || 100 }
        });

        if (subscriptionId != null) {
            dispatchBookingAction({
                type: 'UPDATE_SUBSCRIPTION_ID',
                payload: {subscriptionId: subscriptionId || ''}
            });
        }
    }, [subscriptionData?.mentorId, subscriptionData?.mentorshipPlan?.id, subscriptionId]);
    const {
        onCalendarNavigate,
        mentorAvailabilitySlots
    } = useCalendarLogic(subscriptionData?.mentorId, subscriptionData?.mentorshipPlan.id);

    const {
        onSubmit,
        onEventClick,
        refToScrollOrError
    } = useUserInputLogic(subscriptionData?.availableSessionSlots || 0);

    return (
        <Container as={Tag.Div}>
            <Box sx={{margin: '24px 16px'}}>
                <NavigateBackButton/>
            </Box>
            <div className={sharedStyles.wrapper}>
                <main ref={refToScrollOrError} className={sharedStyles.main}>
                    <Typography variant='subtitle2'>Wybierz terminy i godziny zajęć w ramach mentoringu</Typography>
                    <section>
                        <WeeklyCalendarPicker
                            onEventClick={onEventClick}
                            onNavigate={onCalendarNavigate}
                            events={mentorAvailabilitySlots}
                            selectedEventsId={bookingState.slots ? bookingState.slots.map(({id}) => id) : null}
                        />
                        <div className={sharedStyles.formWrapper}>
                            <UserDetails onFilled={handleUserDetailsFilled} isLoggedIn={isLoggedIn}/>
                            <Team/>
                        </div>
                        <Actions onSubmit={onSubmit} disabled={!isUserDetailsFilled || !state.consents}/>
                        <FAQ title="FAQ" elements={faqRows}/>
                    </section>
                </main>
                <aside>
                    {subscriptionData && (
                        <ServiceMentoringOptionCard
                            mentorProfileReview={mentorData && {
                                firstName: mentorData.firstName,
                                lastName: mentorData.lastName,
                                profileImage: mentorData.profileImage,
                                jobPosition: mentorData.jobPosition,
                                reviewsAvgRate: mentorData.reviewsAvgRate,
                            }}
                            id={subscriptionData.mentorId}
                            title={getPlanTitle(subscriptionData.mentorshipPlan.title)}
                            subtitle={subscriptionData.mentorshipPlan.subtitle}
                            price={subscriptionData.mentorshipPlan.price}
                            descriptionRows={subscriptionData.mentorshipPlan.descriptionRows}
                            variant={subscriptionData.mentorshipPlan.variant}
                            providesMaterials={subscriptionData.mentorshipPlan.providesMaterials}
                            mentoringDescription={subscriptionData.mentorshipPlan.mentoringDescription}
                            responseTimeHours={subscriptionData.mentorshipPlan.responseTimeHours}
                            sessionDurationMinutes={subscriptionData.mentorshipPlan.sessionDurationMinutes}
                            sessionsPerMonth={subscriptionData.mentorshipPlan.sessionsPerMonth}
                            scheduleId={subscriptionData.mentorshipPlan.scheduleId}
                            selected
                        />
                    )}
                    <SelectedSlotsCounter
                        selectedSlots={bookingState.slots.map(({date}) => date)}
                        slotsToSelect={subscriptionData?.availableSessionSlots || 0}
                        errorMessage={bookingState.slotsError}
                    />
                </aside>
            </div>
        </Container>
    );
}

export default MenteeSubscriptionDetailPage;