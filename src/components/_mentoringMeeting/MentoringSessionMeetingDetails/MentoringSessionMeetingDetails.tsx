import React, {FC, useState} from "react";
import Typography from "@mui/material/Typography";
import {Box, Skeleton} from "@mui/material";
import {MentoringSessionT} from "@services/mentoringSessions/mentoringSession.types";
import {ReactComponent as EnvelopeIcon} from '@icons/svg/envelope_dark.svg';
import {ReactComponent as MobileIcon} from '@icons/svg/mobile_dark.svg';
import {Expandable} from "../../_base/Expandable";
import styles from './MentoringSessionMeetingDetail.module.scss';



export type Props = {
    meetingDetails: Pick<MentoringSessionT, 'participant'>;
    isLoading: false;
} | {
    meetingDetails: undefined;
    isLoading: true;
}

const iconSx = {
    backgroundColor: 'base.20',
    borderRadius: '50%',
    padding: .5,
    height: '36px',
    width: '36px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const MentoringSessionMeetingDetails: FC<Props> = ({isLoading, meetingDetails}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    console.log(meetingDetails);
    return (
        <Box sx={{ display: 'grid', gap: 1.5}}>
            <Box
                sx={{
                    mt: 0,
                    borderTop: '1px solid #ddd',
                    pt: 2,
                    width: '100%',
                    maxWidth: '100%',
                    wordWrap: 'break-word',
                    overflow: 'hidden',
                }}
            >
                {isLoading ? (
                    <Skeleton width="100%" />
                ) : (
                    <>
                        <Expandable foldedHeight={50} isExpanded={isExpanded} withOverlay>
                            <Typography
                                variant="buttonSm"
                                sx={{
                                    whiteSpace: 'normal', // Pozwala na łamanie tekstu
                                    wordBreak: 'break-word', // Dodaje łamanie słów
                                    overflowWrap: 'break-word', // Obsługuje łamanie w przeglądarkach
                                }}
                            >
                                {meetingDetails?.participant.meetingDescription || 'Tutaj pojawi się treść dotycząca spotkania... Tutaj pojawi się treść dotycząca spotkania... Tutaj pojawi się treść dotycząca spotkania...'}
                            </Typography>
                        </Expandable>
                        <button
                            className={styles.showMore}
                            type="button"
                            onClick={() => setIsExpanded((prev) => !prev)}
                        >
                            {isExpanded ? 'Pokaż mniej' : 'Pokaż więcej'}
                        </button>
                    </>
                )}
            </Box>
            <Typography variant='buttonMd'> {isLoading ? <Skeleton/> : meetingDetails?.participant.name}</Typography>
            <Box sx={{display: 'flex', gap: 3, pb: 3}}>
                <Box sx={{display: 'flex', gap: 1.5, alignItems: 'center'}}>
                    <Box sx={iconSx}>
                        <MobileIcon/>
                    </Box>
                    <Typography variant='buttonSm'>
                        {
                            isLoading
                                ? <Skeleton width={65} />
                                : meetingDetails?.participant.mobile
                                    ? meetingDetails.participant.mobile
                                    : '800-100-100'
                        }
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', gap: 1.5, alignItems: 'center'}}>
                    <Box sx={iconSx}>
                        <EnvelopeIcon/>
                    </Box>
                    <Typography variant='buttonSm'>
                        {
                            isLoading
                                ? <Skeleton width={80}/>
                                : meetingDetails?.participant.email
                            ? meetingDetails?.participant.email
                                : 'help@skillgu.com'
                        }
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
};

export default MentoringSessionMeetingDetails;