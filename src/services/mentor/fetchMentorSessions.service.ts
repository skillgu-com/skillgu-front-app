
import axios from "axios";
import {FetchMentorSessionsInput, FetchMentorSessionsOutput} from "@customTypes/mentor";

export const getMentorMeetingHistory = async (
    props: FetchMentorSessionsInput
): Promise<FetchMentorSessionsOutput> => {
    const response = await axios.get('/mentor/home/meeting/history');
    const data = response.data;

    return {
        mentee: data.slice(0, 10),
        total: data.length,
    };
};
