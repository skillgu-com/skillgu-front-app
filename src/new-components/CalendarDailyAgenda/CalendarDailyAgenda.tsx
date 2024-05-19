import React, {FC, useState} from "react";
import {MentoringSessionInListT} from "@services/mentoringSessions/mentoringSession.types";
import {Box, Skeleton} from "@mui/material";
import MentoringSessionAcordeonCard
    from "@newComponents/_mentoringMeeting/MentoringSessionAcordeonCard/MentoringSessionAcordeonCard";

type Props = {
    isLoading: boolean;
    events: MentoringSessionInListT[]
}

// TODO set dimensions
const skeletonDimensions = {
    width: '100%',
    height: 50
}

const CalendarDailyAgenda: FC<Props> = ({isLoading, events}) => {
    // TODO get initial state form query params
    // TODO scroll to event
    const [openEventId, setOpenEventId] = useState<string | null>(null);
    const onOpenFactory = (eventId: string) => () => setOpenEventId(eventId);
    const onClose = () => setOpenEventId(null);

    return (
        <Box sx={{ display: 'grid', gap: 3 }}>
            {isLoading
                ? (
                    <>
                        <Skeleton {...skeletonDimensions}/>
                        <Skeleton {...skeletonDimensions}/>
                        <Skeleton {...skeletonDimensions}/>
                    </>
                )
                : (
                    events.map((event) =>
                        <MentoringSessionAcordeonCard
                            isOpen={openEventId === event.id}
                            onOpen={onOpenFactory(event.id)}
                            onClose={onClose}
                            {...event}
                        />
                    )
                )
            }
        </Box>
    )
}

export default CalendarDailyAgenda