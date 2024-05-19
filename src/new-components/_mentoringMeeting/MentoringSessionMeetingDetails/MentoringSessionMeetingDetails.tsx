import React, {FC} from "react";
import Typography from "@mui/material/Typography";
import {Avatar, Box, Skeleton} from "@mui/material";
import {MentoringSessionT} from "@services/mentoringSessions/mentoringSession.types";
import {ReactComponent as EnvelopeIcon} from '@icons/svg/envelope_dark.svg';
import {ReactComponent as MobileIcon} from '@icons/svg/mobile_dark.svg';


export type Props = {
    meetingDetails: Pick<MentoringSessionT, 'title' | 'contact' | 'id' | 'mentor'>;
    isLoading: false;
} | {
    meetingDetails: undefined;
    isLoading: true;
}

const MentoringSessionMeetingDetails: FC<Props> = ({isLoading, meetingDetails}) => {

    return (
        <>
            <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
                <Avatar sx={{height: 32, width: 32}} src={meetingDetails?.mentor.avatar_url}/>
                <Typography variant='buttonSm'>{isLoading ? <Skeleton width={120}/> : meetingDetails?.mentor.name}</Typography>
            </Box>
            <Typography sx={{pb: 4}} variant='buttonLg'>{isLoading ? <Skeleton/> : meetingDetails?.title}</Typography>
            <Typography variant='buttonMd'>{isLoading ? <Skeleton/> : meetingDetails?.mentor.name}</Typography>
            <Box sx={{ display: 'flex', gap: 3, pb: 3}}>
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center'}}>
                    <MobileIcon/>
                    <Typography variant='buttonSm'>
                        {
                            isLoading
                                ? <Skeleton width={65}/>
                                : meetingDetails?.contact.mobile
                        }
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center'}}>
                    <EnvelopeIcon/>
                    <Typography variant='buttonSm'>
                        {
                            isLoading
                                ? <Skeleton width={80}/>
                                : meetingDetails?.contact.email
                        }
                    </Typography>
                </Box>
            </Box>
        </>
    )
};

export default MentoringSessionMeetingDetails;