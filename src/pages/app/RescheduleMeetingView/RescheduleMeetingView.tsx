import React from 'react';
import {useParams} from "react-router-dom";

const RescheduleMeetingView = () => {
    const { meetingId } = useParams() as { meetingId: string };
    return <p>RescheduleMeetingView</p>
}

export default  RescheduleMeetingView;