import axios from "axios";

export const createSession = async (session) => {
    console.log(session)

    return await axios.post('/api/1.0/session', {
        sessionName: session?.sessionName,
        sessionPrice: session?.sessionPrice,
        sessionID: session?.sessionID,
        scheduleID: session?.scheduleID,
        sessionDescription: session?.sessionDescription
    });
}

export const getSessionNumber = async () => {
    return await axios.get('/api/1.0/get-session-number')
}


export const fetchMentorSession = async (userID) => {
    return await axios.get(`/api/1.0/mentor-sessions`, { params: { userID } });
}