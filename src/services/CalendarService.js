import axios from "axios";


export const getAllCalendarEvents = async () => {
    return await axios.get('/api/calendar/get-all-events');
}

export const getAllMentorCalendarEvents = async (mentorSessionRequest) => {
    return await axios.post('/api/calendar/get-all-mentor-events-test',mentorSessionRequest);
}

