import axios from "axios";

export const createSession = async (form) => {
    console.log(form)
    return await axios.post('/api/1.0/session', {
        sessionName: form.name?.value,
        sessionPrice: form.price?.value,
        sessionID: form.sessionTypeId,
        scheduleID: form.schedule,
        sessionDescription: form.description?.value
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