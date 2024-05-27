import React, {FC, useMemo, useState} from "react";
import WeeklyCalendarPicker, {CalendarEvent} from "@newComponents/WeeklyCalendarPicker/WeeklyCalendarPicker";
import {Box, Button} from "@mui/material";
import {useMutation, useQuery} from "@tanstack/react-query";
import rescheduleMentoringSessionService from "@services/mentoringSessions/rescheduleMentoringSession.service";
import {useSnackbar} from "notistack";
import getMentorAvailabilityByMeetingIdService
    , {
    getMentorAvailabilityByMeetingIdServiceKeyGenerator
} from "@services/mentoringSessions/getMentorAvailabilityByMeetingId.service";
import {lastDayOfMonth, setDate} from "date-fns";

type Props = {
    meetingId: string;
}

const MentoringSessionReschedule: FC<Props> = ({meetingId}) => {
    const {enqueueSnackbar} = useSnackbar()
    const [selectedEvent, setSelectedEvent] = useState(null);

    // availability
    // TODO week range
    const [selectedRange, setSelectedRange] = useState(
        {
            from: setDate(new Date(), 1),
            to: lastDayOfMonth(new Date())
        });

    const moveSelectedRange = (newDate: Date) => {
        console.log(newDate);
        // setSelectedRange((prevState) => {
        //     const newMonth = getMonth(prevState.from) + (navigateAction === 'PREV' ? -1 : 1);
        //     return {
        //         from: setMonth(prevState.from, newMonth),
        //         to: setMonth(prevState.to, newMonth),
        //     }
        // });
    }

    const queryParams = useMemo(() => ({
        from: selectedRange.from,
        to: selectedRange.to,
    }), [selectedRange]);

    const { data } = useQuery({
        queryKey: getMentorAvailabilityByMeetingIdServiceKeyGenerator(meetingId, queryParams),
        queryFn: () => getMentorAvailabilityByMeetingIdService(meetingId, queryParams)
    })

    const events: CalendarEvent[] = useMemo(() => {
        if(!data) return [];

        return data.map((event) => {
            return {
                allDay: true,
                ...event,
            }
        });

    }, [data]);

    // reschedule
    const rescheduleMutation = useMutation({
        mutationFn: rescheduleMentoringSessionService,
        onSuccess: () => enqueueSnackbar('Nowy termin potwierdzony', {variant: 'success'}),
        onError: () => enqueueSnackbar('Wystąpił błąd', {variant: 'error'})
    });

    const onAcceptClick = () => {
        if (selectedEvent) rescheduleMutation.mutate({id: meetingId, body: {timeSlotId: selectedEvent}});
    }

    const onEventClick = (event: any) => {
        setSelectedEvent(event);
    }

    return (
        <Box sx={{pt: {sm: 0, md: 4}}}>
            <WeeklyCalendarPicker onNavigate={moveSelectedRange} onEventClick={onEventClick} selectedEventId={selectedEvent} events={events}/>
            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button onClick={onAcceptClick} disabled={!selectedEvent} sx={{mt: 3, ml: 'auto'}} variant='contained'>
                    Potwierdź nowy termin
                </Button>
            </Box>
        </Box>
    )

};

export default MentoringSessionReschedule;