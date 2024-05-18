import React, {useMemo, useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import {lastDayOfMonth, setDate} from "date-fns";

import
    getMentoringSessionsInDatesService
    from "@services/mentoringSessions/getMentoringSessionsInDates.service";
import Calendar from "../../../component/Calendar/Calendar";
import Typography from "@mui/material/Typography";
import {Container} from "@mui/material";

const CalendarView = () => {
    const [selectedRange, setSelectedRange] = useState({from: new Date(), to: new Date()});
    const updateSelectedRange = (newDate: Date) => {
        const from = setDate(newDate, 1);
        const to = lastDayOfMonth(newDate);

        setSelectedRange({from, to});
    }

    const {data} = useQuery({
        queryKey: ['calendarEvents', `from-${selectedRange.from.toString()}`, `to-${selectedRange.to.toString()}`],
        queryFn: () => getMentoringSessionsInDatesService({
            from: selectedRange.from,
            to: selectedRange.to,
            userId: '1'
        }),
    });

    const events = useMemo(() => {
        if (!data) return [];
        return data.map(({id, title, start, end}) => (
            {
                id,
                title,
                start,
                end,
                allDay: true,
            }
        ))
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
