import React, {FC} from "react";
import {MentoringSessionInListT} from "@services/mentoringSessions/mentoringSession.types";
import Typography from "@mui/material/Typography";
import {format} from "date-fns";
import {
    StyledCard, StyledRoundButton
} from "@newComponents/_mentoringMeeting/MentoringSessionAcordeonCard/MentoringSessionAcordeonCard.styles";
import {ReactComponent as ChevronIcon} from "../../../assets/icons/svg/chevron_up.svg"
import {Box, Button, Collapse} from "@mui/material";
import MentoringSessionMeetingDetailsHeader
    from "@newComponents/_mentoringMeeting/MentoringSessionMeetingDetailsHeader/MentoringSessionMeetingDetailsHeader";
import MentoringSessionMeetingDetails
    from "@newComponents/_mentoringMeeting/MentoringSessionMeetingDetails/MentoringSessionMeetingDetails";
import MentoringSessionJoinButton
    from "@newComponents/_mentoringMeeting/MentoringSessionJoinButton/MentoringSessionJoinButton";
import {generatePath, Link} from "react-router-dom";
import paths from "../../../paths";

type Props = MentoringSessionInListT & {
    isOpen: boolean;
    onToggle: () => void;
}


const MentoringSessionAcordeonCard: FC<Props> = ({
                                                     isOpen,
                                                     start,
                                                     end,
                                                     onToggle,
                                                     mentor,
                                                     id,
                                                     title,
                                                     contact,
                                                     meetingLink
                                                 }) => {
    return (
        <StyledCard>
            <Box sx={{gridArea: 'timeRange'}} id={`mentoringSessionId-${id}`}>
                <Typography
                    variant='buttonLg'
                    color='primary'
                >
                    {format(start, 'H:mm')} - {format(end, 'H:mm')}
                </Typography>
            </Box>
            <Box sx={{gridArea: 'main'}}>
                <MentoringSessionMeetingDetailsHeader
                    isLoading={false}
                    title={title}
                    mentorName={mentor.name}
                    avatarUrl={mentor.avatar_url}
                />
                <Collapse in={isOpen}>
                    <Box sx={{pt: 6}}>
                        <MentoringSessionMeetingDetails
                            isLoading={false}
                            meetingDetails={{mentor, contact}}
                        />
                    </Box>
                    <Box sx={{
                        display: {sm: 'flex', md: 'grid'},

                        flexDirection: 'column-reverse',
                        gap: 2,
                        gridTemplateColumns: '1fr auto',
                        alignItems: {sm: 'stretch', md: 'flex-start'},
                    }}>
                        <Box sx={{
                            display: {sm: 'grid', md: 'flex'},
                            alignSelf: {sm: 'stretch', md: 'flex-start'},
                            gap: 2
                        }}>
                            <Button color='secondary' variant='contained'>
                                Przełóż spotkanie
                            </Button>
                            <Button color='error' variant='contained'>
                                Odwołaj
                            </Button>
                        </Box>
                        <MentoringSessionJoinButton meetingUrl={meetingLink}/>
                    </Box>
                </Collapse>
            </Box>
            <Box sx={{justifySelf: 'flex-end', gridArea: 'expandButton'}}>
                <StyledRoundButton isOpen={isOpen} onClick={onToggle}>
                    <ChevronIcon/>
                </StyledRoundButton>
            </Box>
        </StyledCard>
    )
}

export default MentoringSessionAcordeonCard