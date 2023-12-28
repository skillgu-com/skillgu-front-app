import axios from "axios";

export const createSession = async (sessionDescription, sessionTypeValues, sessionPrice, selectedSchedule) => {
    console.log(sessionTypeValues);
    return await axios.post('/api/session/create-session', {
        description: sessionDescription,
        sessionTypeID: sessionTypeValues,
        sessionPrice: sessionPrice,
        selectedSchedule: selectedSchedule,
    });
}

export const bookSingleSession = async (createSessionRequest) => {
    return await axios.post('/api/session/book-single-session', {
        mentorID: createSessionRequest.mentorID,
        sessionTypeID: createSessionRequest.sessionTypeID
    });
}