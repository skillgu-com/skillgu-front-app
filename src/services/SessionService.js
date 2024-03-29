import axios from "axios";

export const createSession = async (session) => {
    return await axios.post('/api/1.0/session', {
        sessionName: session?.name.value,
        sessionPrice: session?.price.value,
        sessionID: session?.type,
        scheduleID: session?.schedule,
        sessionDescription: session?.message.value
    });
}

export const getSessionNumber = async () => {
    return await axios.get('/api/1.0/get-session-number')
}

export const fetchMentorSession = async (userID) => {
    return await axios.get(`/api/1.0/mentor-sessions`, {params: {userID}});
}

export const getSessionTypes = async () => {
    return await axios.get('/api/session-types/get-all')
}

export const deleteSession = async (sessionID) => {
    return await axios.post(`/api/1.0/session/delete?sessionID=${sessionID}`);
};