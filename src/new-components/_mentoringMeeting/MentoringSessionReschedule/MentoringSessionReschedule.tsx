import React, {FC} from "react";

type Props = {
    meetingId: string;
}

const MentoringSessionReschedule: FC<Props> = ({ meetingId }) => {

    return <div>{meetingId}</div>

};

export default MentoringSessionReschedule;