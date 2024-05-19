import React, {useMemo, useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import {lastDayOfMonth, setDate} from "date-fns";

import
    getMentoringSessionsInDatesService
    , {
    getMentoringSessionsInDatesServiceKeyGenerator
} from "@services/mentoringSessions/getMentoringSessionsInDates.service";
import Calendar from "@newComponents/Calendar/Calendar";
import Typography from "@mui/material/Typography";
import {Container} from "@mui/material";
import {Event} from "react-big-calendar";

export type MeetingInCalendar = Event & {
    metadata: {
        eventInDayNumber: number,
        eventInDayCount: number,
        id: string,
    }
}

const generateDayKey = (date: Date) => `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`;


const CalendarView = () => {
    const [selectedRange, setSelectedRange] = useState({from: new Date(), to: new Date()});
    const updateSelectedRange = (newDate: Date) => {
        const from = setDate(newDate, 1);
        const to = lastDayOfMonth(newDate);

        setSelectedRange({from, to});
    }

    const queryParams = useMemo(() => ({
        from: selectedRange.from,
        to: selectedRange.to,
    }), [selectedRange]);

    const {data} = useQuery({
        queryKey: getMentoringSessionsInDatesServiceKeyGenerator(queryParams),
        queryFn: () => getMentoringSessionsInDatesService(queryParams),
    });

    const events: MeetingInCalendar[] = useMemo(() => {
        if (!data) return [];

        const eventsCount: Record<string, number> = {};
        const events = data.map(({id, title, start, end}) => {
            const eventDateKey = generateDayKey(start);

            if (!eventsCount.hasOwnProperty(eventDateKey)) eventsCount[eventDateKey] = 0;
            else eventsCount[eventDateKey]++;

            return {
                title,
                start,
                end,
                allDay: true,
                metadata: {
                    eventInDayNumber: eventsCount[eventDateKey],
                    id,
                }
            };
        })

        return events.map((event) => ({
            ...event,
            metadata: {...event.metadata, eventInDayCount: eventsCount[generateDayKey(event.start)] + 1},
        }));

    }, [data]);

    return (
        <Container>
            <Typography sx={{pt: 5, pb: 3}} variant='h2'>Kalendarz</Typography>
            <Calendar
                calendarProps={{
                    events,
                    onNavigate: updateSelectedRange
                }}
            />
        </Container>
    );
};

export default CalendarView;
