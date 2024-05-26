import React from 'react';
import {useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {Container} from "@mui/material";
import MentoringSessionReschedule
    from "@newComponents/_mentoringMeeting/MentoringSessionReschedule/MentoringSessionReschedule";

const RescheduleMeetingView = () => {
    const {meetingId} = useParams() as { meetingId: string };
    return (
        <Container>
            {/* TODO set spacing*/}
            <Typography sx={{}} variant='h2'>Ustal nowy termin spotkania</Typography>
            <Typography sx={{}} variant='body2'>Wybierz nowy termin spotkania. Spotkanie zostanie automatycznie przełożone.</Typography>
            <MentoringSessionReschedule meetingId={meetingId} />
        </Container>
    )
}

export default RescheduleMeetingView;