import axios from "axios";

export const createSession = async (session: any) => {
    return await axios.post('/api/1.0/session', {
        sessionName: session?.name.value,
        sessionPrice: session?.price.value,
        sessionType: session?.type,
        scheduleID: session?.schedule,
        sessionDescription: session?.message.value
    });
}


export const getSessionNumber = async () => {
    return await axios.get('/api/1.0/get-session-number')
}

export const fetchMentorSession = async (userID: any) => {
    return await axios.get(`/api/1.0/mentor-sessions`, {params: {userID}});
}

export const getSessionTypes = async () => {
    return await axios.get('/api/session-types/get-all')
}

export const deleteSession = async (sessionID: any) => {
    return await axios.post(`/api/1.0/session/delete?sessionID=${sessionID}`);
};


export const fetchSessionTemplateForEdit = async (sessionId: string | undefined) => {
    try {
        const response = await axios.put(`/api/1.0/session/fetch-session-for-edit/${sessionId}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete schedule');
    }
};
