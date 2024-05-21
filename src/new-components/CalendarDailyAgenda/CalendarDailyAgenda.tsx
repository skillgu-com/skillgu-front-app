import React, {FC, useEffect, useState} from "react";
import {MentoringSessionInListT} from "@services/mentoringSessions/mentoringSession.types";
import {Box, Skeleton} from "@mui/material";
import MentoringSessionAcordeonCard
    from "@newComponents/_mentoringMeeting/MentoringSessionAcordeonCard/MentoringSessionAcordeonCard";
import {useParams, useSearchParams} from "react-router-dom";

type Props = {
    isLoading: boolean;
    events: MentoringSessionInListT[]
}

// TODO set dimensions
const skeletonDimensions = {
    width: '100%',
    height: 185
}

const CalendarDailyAgenda: FC<Props> = ({isLoading, events}) => {
    const [openEventId, setOpenEventId] = useState<string | null>(null);
    const onToggleFactory = (eventId: string) => () => {
        setOpenEventId(prev => prev === eventId ? null : eventId);
    }

    const [searchParams] = useSearchParams()
    useEffect(() => {
        const eventIdToOpen = searchParams.get('mentoringSessionId');
        if(eventIdToOpen && !isLoading) {
            setOpenEventId(eventIdToOpen);
            const element = document.querySelector(`#mentoringSessionId-${eventIdToOpen}`)
            if(element) element.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    }, [searchParams, isLoading]);

    return (
        <Box sx={{ display: 'grid', gap: 3, pt: 3 }}>
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
                            onToggle={onToggleFactory(event.id)}
                            {...event}
                        />
                    )
                )
            }
        </Box>
    )
}

export default CalendarDailyAgenda