import React, {useMemo} from 'react';
import Typography from "@mui/material/Typography";
import {Box, Container} from "@mui/material";
import {ReactComponent as ArrowLeft} from '@icons/svg/arrow-left.svg';
import FullSizeIconButton from "@newComponents/FullSizeIconButton/FullSizeIconButton";
import {Link, useParams} from "react-router-dom";
import paths from "../../../paths";
import {format, set} from "date-fns";
import {useQuery} from "@tanstack/react-query";
import getMentoringSessionsInDatesService, {
    getMentoringSessionsInDatesServiceKeyGenerator
} from "@services/mentoringSessions/getMentoringSessionsInDates.service";
import CalendarDailyAgenda from "@newComponents/CalendarDailyAgenda/CalendarDailyAgenda";

const CalendarDailyView = () => {
    const {year, month, day} = useParams() as { year: string, month: string, day: string };

    const date = useMemo(() => new Date(+year, +month - 1, +day), [year, month, day]);

    const queryParams = useMemo(() => ({
        from: set(date, {hours: 0, minutes: 0, seconds: 0}),
        to: set(date, {hours: 23, minutes: 59, seconds: 59}),
    }), [date]);

    const {data, isLoading} = useQuery({
        queryKey: getMentoringSessionsInDatesServiceKeyGenerator(queryParams),
        queryFn: () => getMentoringSessionsInDatesService(queryParams),
    });

    return (
        <Container>
            <Typography sx={{pt: 5, pb: 3}} variant='h2'>Kalendarz</Typography>
            <Box sx={{display: 'flex', gap: 3, alignItems: 'center'}}>
                <Link to={paths.calendar}>
                    <FullSizeIconButton>
                        <ArrowLeft/>
                    </FullSizeIconButton>
                </Link>
                <Typography variant='h2'>
                    {format(date, 'dd MMMM yyyy')}
                </Typography>
            </Box>
            <CalendarDailyAgenda events={data || []} isLoading={isLoading}/>
        </Container>
    )
}

export default CalendarDailyView;