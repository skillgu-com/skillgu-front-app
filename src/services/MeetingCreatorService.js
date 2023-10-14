import axios from "axios";

export const createNewMeeting = async (sessionType, sessionDescription,sessionTypeValues) => {
    return await axios.post('/api/meeting/create-session', {
        sessionType: sessionType,
        sessionDescription: sessionDescription,
        sessionTypeValues: sessionTypeValues
    });
}
