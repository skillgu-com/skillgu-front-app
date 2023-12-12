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