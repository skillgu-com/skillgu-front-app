import {
    FetchMentorSessionsInput,
    FetchMentorSessionsOutput,
} from "./fetchMentorSessions.types";
import axios from "axios";

export const getMentorMeetingHistory = async (
    props: FetchMentorSessionsInput
): Promise<FetchMentorSessionsOutput> => {
    console.log('tutaj testujemy teraz')
    const response = await axios.get('/mentor/home/meeting/history');
    const data = response.data;
    return {
        total: data.length,
        students: data.slice(props.skip, props.skip + props.take),
    };
};
