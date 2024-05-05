import axios from "axios";

export const fetchCalendarSession = async (mentorSessionRequest) => {
    return await axios.post('/api/1.0/fetch-calendar-session',mentorSessionRequest);
}

