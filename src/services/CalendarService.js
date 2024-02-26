import axios from "axios";


export const getAllCalendarEvents = async () => {
    return await axios.get('/api/1.0/get-all-events');
}

export const fetchCalendarSession = async (mentorSessionRequest) => {
    return await axios.post('/api/1.0/fetch-calendar-session',mentorSessionRequest);
}

