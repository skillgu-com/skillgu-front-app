import React, {FC, useCallback, useRef, useState} from "react";
import {ServiceMentoringOptionCard} from "../../../components/Cards/ServiceMentoringOptionCard";

import { useParams} from "react-router-dom";
import Container from "src/components/Container/Container";

import {Actions, Team, UserDetails} from "../BookSession/components";
import {useQuery} from "@tanstack/react-query";
import getSubscriptionService, {
    getSubscriptionServiceKeyGenerator
} from "@services/subscription/getSubscription.service";
import Box from "@mui/material/Box";
import NavigateBackButton from "../../../components/NavigateBackButton/NavigateBackButton";
import sharedStyles from "./../../../styles/sharedStyles/selectSessionDatesPage.module.scss";
import {Tag} from "@customTypes/tags";
import {getMentorProfileByID, getMentorProfileByIDKeyGenerator} from "@services/mentor/fetchMentorServices.service";
import SelectedSlotsCounter from "../../../components/SelectedSlotsCounter/SelectedSlotsCounter";
import FAQ from "../../../components/FAQ/Accordion/Accordion";
import {faqRows} from "../BookSession/config";
import getMentorAvailabilityByMentorIdService, {
    getMentorAvailabilityByMeetingIdServiceKeyGenerator
} from "@services/mentoringSessions/getMentorAvailabilityByMentorIdService";
import {useBookingReducer} from "../../../reducers/booking";
import WeeklyCalendarPicker, {
    CalendarEvent,
    ExtendedEvent
} from "../../../components/WeeklyCalendarPicker/WeeklyCalendarPicker";
import {endOfWeek, startOfWeek} from "date-fns";
import {Slot} from "@services/mentoringSessions/getMentorAvailabilityByMeetingId.types";
import Typography from "@mui/material/Typography";
import {useSnackbar} from "notistack";


const calculateWeekRange = (date: Date) => {
    return {from: startOfWeek(date, {weekStartsOn: 1}), to: endOfWeek(date, {weekStartsOn: 1})}
}

const parseSlotsToCalendarEvents = (slots: Slot[]): ExtendedEvent[] => {
    return slots.map(({start, end, id, title, available}) => ({
        id,
        start,
        end,
        title,
        available,
        allDay: true,
    }));
}
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
const phoneRegex = /^.{9,}$/;

const MenteeSubscriptionDetailPage: FC = () => {
    const mainRef = useRef<HTMLElement>(null);
    const {subscriptionId} = useParams() as { subscriptionId: string };
    const { enqueueSnackbar } = useSnackbar();

    const {data: subscriptionData} = useQuery({
        queryKey: getSubscriptionServiceKeyGenerator(subscriptionId),
        queryFn: () => getSubscriptionService(subscriptionId),
    });

    const {data: mentorData} = useQuery({
        // subscriptionData will be defined, it's checked in the enabled property
        queryKey: getMentorProfileByIDKeyGenerator(subscriptionData?.mentorId!),
        // subscriptionData will be defined, it's checked in the enabled property
        queryFn: () => getMentorProfileByID(subscriptionData?.mentorId!),
        enabled: !!subscriptionData?.mentorId,
    });

    const [bookingState, dispatchBookingAction] = useBookingReducer();

    const isSlotsLimitReached = useCallback((selectedSlotsLength: number) => subscriptionData?.availableSessionSlots && selectedSlotsLength >= subscriptionData?.availableSessionSlots, [subscriptionData]);

    const onEventClick = (event: CalendarEvent) => {
        const prevState = bookingState.slots;
        let slots = [];

        if (prevState.some(({id}) => id === event.id)) {
            // Removing
            slots = prevState.filter(({id}) => id !== event.id);
        } else {
            if (isSlotsLimitReached(prevState.length)) {
                enqueueSnackbar('Osiągnięto limit wybranych slotów', {variant: 'warning'});
                return;
            };
            // Adding
            slots = [...prevState, {date: event.start, id: event.id}];
        }

        dispatchBookingAction({type: 'SLOTS_SELECT', payload: {slots}})
    }

    const [visibleWeekRange, setVisibleWeekRange] = useState<{
        from: Date,
        to: Date
    }>(calculateWeekRange(new Date()));

    const onCalendarNavigate = (date: Date) => {
        setVisibleWeekRange(calculateWeekRange(date));
    }

    const {data: mentorAvailabilitySlots} = useQuery({
        // subscriptionData will be defined, it's checked in the enabled property
        queryKey: getMentorAvailabilityByMeetingIdServiceKeyGenerator(subscriptionData?.mentorId!, visibleWeekRange),
        // subscriptionData will be defined, it's checked in the enabled property
        queryFn: () => getMentorAvailabilityByMentorIdService(subscriptionData?.mentorId!, visibleWeekRange),
        enabled: !!subscriptionData?.mentorId,
    });


    const validate = () => {
        // TODO if needed move that validation to src/pages/app/BookSession/components/Actions/Actions.tsx
        let isValid = true;

        if (!bookingState.customerEmail) {
            dispatchBookingAction({type: 'SET_EMAIL', payload: {customerEmailError: 'Email jest wymagany'}})
            isValid = false;
        } else if (!emailRegex.test(bookingState.customerEmail)) {
            dispatchBookingAction({type: 'SET_EMAIL', payload: {customerEmailError: 'Email jest niepoprawny'}})
            isValid = false;
        }


        if (!bookingState.customerPhone) {
            dispatchBookingAction({type: 'SET_PHONE', payload: {customerPhoneError: 'Numer telefonu jest wymagany'}})
            isValid = false;
        } else if (!phoneRegex.test(bookingState.customerPhone)) {
            dispatchBookingAction({type: 'SET_PHONE', payload: {customerPhoneError: 'Numer telefonu jest niepoprawny'}})
            isValid = false;
        }

        if (!bookingState.customerMessage) {
            dispatchBookingAction({type: 'SET_MESSAGE', payload: {customerMessageError: 'Wiadomość jest wymagana'}})
            isValid = false;
        }

        if (bookingState.slots.length !== subscriptionData?.availableSessionSlots) {
            dispatchBookingAction({type: 'SLOTS_ERROR', payload: {slotsError: 'Wybierz wszystkie dostępne sloty'}})
            isValid = false;
        }

        return isValid;
    }

    const onSubmit = () => {
        const isValid = validate();
        if (isValid) {
            alert({email: bookingState.customerEmail, phone: bookingState.customerPhone, topic: bookingState.customerMessage})
        } else if (mainRef.current) {
            mainRef.current.scrollIntoView({behavior: 'smooth', inline: 'start', block: 'start'});
        }
    }

    return (
        <Container as={Tag.Div}>
            <Box sx={{margin: '24px 16px'}}>
                <NavigateBackButton/>
            </Box>
            <div className={sharedStyles.wrapper}>
                <main ref={mainRef} className={sharedStyles.main}>
                    <Typography variant='subtitle2'>Wybierz terminy i godziny zajęć w ramach mentoringu</Typography>
                    <section>
                        <WeeklyCalendarPicker
                            onEventClick={onEventClick}
                            onNavigate={onCalendarNavigate}
                            events={parseSlotsToCalendarEvents(mentorAvailabilitySlots || [])}
                            selectedEventsId={bookingState.slots ? bookingState.slots.map(({id}) => id) : null}
                        />
                        <div className={sharedStyles.formWrapper}>
                            <UserDetails/>
                            <Team/>
                        </div>
                        <Actions onSubmit={onSubmit}/>
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
                            title={subscriptionData.mentorshipPlan.title}
                            subtitle={subscriptionData.mentorshipPlan.subtitle}
                            price={subscriptionData.mentorshipPlan.price}
                            descriptionRows={subscriptionData.mentorshipPlan.descriptionRows}
                            variant={subscriptionData.mentorshipPlan.variant}
                            providesMaterials={subscriptionData.mentorshipPlan.providesMaterials}
                            mentoringDescription={subscriptionData.mentorshipPlan.mentoringDescription}
                            responseTimeHours={subscriptionData.mentorshipPlan.responseTimeHours}
                            sessionDurationMinutes={subscriptionData.mentorshipPlan.sessionDurationMinutes}
                            sessionsPerMonth={subscriptionData.mentorshipPlan.sessionsPerMonth}
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