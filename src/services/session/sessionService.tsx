import axios from "axios";

export interface SessionDTO {
    sessionName: string;
    sessionPrice: number;
    sessionType: number;
    scheduleID: number;
    sessionDescription: string;
}

export const createSession = async (session: any) => {
    return await axios.post('/api/1.0/session', {
        sessionName: session?.name,
        sessionPrice: session?.price,
        sessionType: session?.type,
        scheduleID: session?.schedule,
        sessionDescription: session?.description
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

export const deleteSession = async (sessionId: any) => {
    return await axios.post(`/api/1.0/session/delete/${sessionId}`);
};


export const editMentorSingleSession = async (sessionId: string, updatedData: SessionDTO) => {
    try {
        const response = await axios.put(`/api/1.0/session/edit/${sessionId}`, {
            sessionName: updatedData.sessionName,
            sessionPrice: updatedData.sessionPrice,
            sessionType: updatedData.sessionType,
            scheduleID: updatedData.scheduleID,
            sessionDescription: updatedData.sessionDescription
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to update session');
    }
};