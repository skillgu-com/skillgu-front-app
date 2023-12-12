import axios from "axios";

// export const createNewSessionMeeting = async (sessionDescription, sessionTypeValues, sessionPrice, selectedSchedule) => {
//     return await axios.post('/api/meeting/create-schedule-session', {
//         description: sessionDescription,
//         sessionTypeValues: sessionTypeValues,
//         sessionPrice: sessionPrice,
//         selectedSchedule: selectedSchedule,
//     });
// }


export const getAllSchedulesMeeting = async () => {
    return await axios.get('/api/meeting/get-all-schedule-meeting', {});
}

export const getScheduleMeetingById = async () => {
    return await axios.get('/api/meeting/get-schedule-meeting-by-id', {});
}

export const getScheduleNames = async () => {
    return await axios.get('/api/meeting/get-all-schedule-meeting-names');
}

export const getMeetingPlanPanelSchedule = async (userID) => {
    return await axios.get(`/api/meeting/get-meeting-plan-panel-schedule?userID=${userID}`);

}

export const createSession = async (createSessionRequest) => {
    return await axios.post('/api/meeting/create-session', {
        mentorID: createSessionRequest.mentorID,
        sessionTypeID: createSessionRequest.sessionTypeID
    });

}

export const getAllScheduleMeetingTimeDetails = async (sessionID) => {
    return await axios.get(`/api/meeting/get-all-schedule-meeting-time-details?sessionID=${sessionID}`);
}



