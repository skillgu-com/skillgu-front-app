import React, {useMemo} from 'react';
import Typography from "@mui/material/Typography";
import {Box, Container, Theme, useMediaQuery, useTheme} from "@mui/material";
import {ReactComponent as ArrowLeft} from '@icons/svg/arrow-left.svg';
import {Link, useParams} from "react-router-dom";
import paths from "../../../paths";
import {format, set} from "date-fns";
import {useQuery} from "@tanstack/react-query";
import FullSizeIconButton from "../../../components/FullSizeIconButton/FullSizeIconButton";
import CalendarDailyAgenda from "../../../components/CalendarDailyAgenda/CalendarDailyAgenda";
import {
    getMentoringSessionsInDatesServiceKeyGenerator
} from "@services/mentoringSessions/getMentoringSessionsInDates.service";
import {fetchAllCalendarEventsForSpecificDate} from "@services/calendar/fetchCalendarEvents";
const CalendarDailyView = () => {
    const theme = useTheme();
    const {year, month, day} = useParams() as { year: string, month: string, day: string };

    const date = useMemo(() => new Date(+year, +month - 1, +day), [year, month, day]);

    const dateString = useMemo(() => `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`, [year, month, day]);

    const queryParamsTest = useMemo(() => ({
        date: dateString,
    }), [dateString]);


    const queryParams = useMemo(() => ({
        from: set(date, {hours: 0, minutes: 0, seconds: 0}),
        to: set(date, {hours: 23, minutes: 59, seconds: 59}),
    }), [date]);


    const queryKey = useMemo(() => getMentoringSessionsInDatesServiceKeyGenerator(queryParams), [queryParams]);


    const {data, isLoading} = useQuery({
        queryKey,
        queryFn: () => fetchAllCalendarEventsForSpecificDate(queryParamsTest),
    });

    const isMD = useMediaQuery((theme) => (theme as Theme).breakpoints.up('md'));

    return (
        <Container>
            <Typography sx={{pt: 5, pb: 2}} variant='h2'>Kalendarz</Typography>
            <Box sx={{
                display: 'flex',
                gap: 3,
                alignItems: 'center',
                position: 'sticky',
                top: {sm: 64, md: 0},
                background: theme.palette.background.default,
                zIndex: 1,
                pb: 1,
                pt: 1,
            }}>
                <Link to={paths.calendar}>
                    <FullSizeIconButton>
                        <ArrowLeft/>
                    </FullSizeIconButton>
                </Link>
                <Typography variant={isMD ? 'h3' : 'subtitle1'}>
                    {format(date, 'dd MMMM yyyy')}
                </Typography>
            </Box>
            <CalendarDailyAgenda queryKey={queryKey} events={data || []} isLoading={isLoading}/>
        </Container>
    )
}

export default CalendarDailyView;