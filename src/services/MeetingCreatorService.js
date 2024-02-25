import axios from "axios";

export const getAllSchedulesMeeting = async () => {
    return await axios.get('/api/meeting/get-all-schedule-meeting', {});
}

export const getScheduleMeetingById = async () => {
    return await axios.get('/api/meeting/get-schedule-meeting-by-id', {});
}


export const getMeetingPlanPanelSchedule = async (userID) => {
    return await axios.get(`/api/meeting/get-meeting-plan-panel-schedule?userID=${userID}`);
}

export const getAllScheduleMeetingTimeDetails = async (sessionID) => {
    return await axios.get(`/api/meeting/get-all-schedule-meeting-time-details?sessionID=${sessionID}`);
}