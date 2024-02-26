import axios from "axios";

export const createSession = async (sessionName, sessionPrice, sessionID, scheduleID,sessionDescription) => {

    return await axios.post('/api/1.0/session', {
        sessionName: sessionName,
        sessionPrice: sessionPrice,
        sessionID: sessionID,
        scheduleID: scheduleID,
        sessionDescription: sessionDescription
    });
}

export const getSessionNumber = async () => {
    return await axios.get('/api/1.0/get-session-number')
}


export const fetchMentorSession = async (userID) => {
    return await axios.get(`/api/1.0/mentor-sessions`, { params: { userID } });
}