import axios from "axios";
import {MentorCategoryT} from "@services/dictionaries/sessionCategoriesDictionary/sessionCategoriesDictionary.data";

export interface SessionFormInput {
    name: string;
    price: number;
    category: MentorCategoryT | '';
    type: string;
    scheduleId: number;
    description: string;
}

export interface SessionDTO {
    sessionName: string;
    sessionPrice: number;
    sessionCategory: MentorCategoryT | '';
    sessionType: string;
    scheduleID: number;
    sessionDescription: string;
}

const parseSessionFormDataToSessionDTO = (session: SessionFormInput): SessionDTO => {
    return {
        sessionName: session.name,
        sessionPrice: session.price,
        sessionCategory: session.category,
        sessionType: session.type,
        scheduleID: session.scheduleId,
        sessionDescription: session.description
    }
}

export const createSession = async (session: SessionFormInput) => {
    console.log('tutaj sesja: ',session)
    return await axios.post('/api/1.0/session', parseSessionFormDataToSessionDTO(session));
}

export const editSession = async ({ sessionId, session }: { sessionId: string, session: SessionFormInput }) => {
    return await axios.post(`/api/1.0/session/${sessionId}`, parseSessionFormDataToSessionDTO(session));
}

export const getSessionNumber = async () => {
    return await axios.get('/api/1.0/get-session-number')
}

export const fetchMentorSession = async (userID: number) => {
    return await axios.get(`/api/1.0/mentor-sessions`, {params: {userID}});
}

export const getSessionTypes = async () => {
    // TODO type response tightly and eventually parse it
    return await axios.get<{id: number, name: string}[]>('/api/session-types/get-all')
}

export const deleteSession = async (sessionId: string) => {
    return await axios.post(`/api/1.0/session/delete/${sessionId}`);
};

export const getSingleSession = async (sessionId: string | number): Promise<SessionDTO> => {
    // return await axios.get(`/api/1.0/session/delete/${sessionId}`);

    return {
        sessionName: 'test',
        sessionPrice: 220,
        sessionType: 'training',
        sessionCategory: 'IT',
        scheduleID: 1,
        sessionDescription: 'test'
    }
};

export const editMentorSingleSession = async (sessionId: string, updatedData: SessionDTO) => {
    try {
        const response = await axios.put(`/api/1.0/session/edit/${sessionId}`, {
            sessionName: updatedData.sessionName,
            sessionPrice: updatedData.sessionPrice,
            sessionCategory: updatedData.sessionCategory,
            sessionType: updatedData.sessionType,
            scheduleID: updatedData.scheduleID,
            sessionDescription: updatedData.sessionDescription
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to update session');
    }
};