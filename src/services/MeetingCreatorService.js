import axios from "axios";

export const createNewMeeting = async (timeZone, sessionDescription, sessionTypeValues, sessionPrice, typeOfNotification,selectedSchedule) => {
    return await axios.post('/api/meeting/create-session', {
        timeZone: timeZone,
        sessionDescription: sessionDescription,
        sessionTypeValues: sessionTypeValues,
        sessionPrice: sessionPrice,
        typeOfNotification: typeOfNotification,
        selectedSchedule:selectedSchedule
    });
}

export const createScheduleMeeting = async (currentState, weekTimes) => {
    console.log(currentState, weekTimes);
    return await axios.post('/api/meeting/create-schedule-meeting', {
        scheduleName: currentState.scheduleName.value,
        scheduleStartDay: currentState.scheduleStartDay.value,
        scheduleEndDay: currentState.scheduleEndDay.value,
        meetTime: currentState.meetTime.value,
        meetingBreakDuration: currentState.meetingBreakDuration.value,
        participant: currentState.participant.value,
        meetingLimit: currentState.meetingLimit.value,
        cancelingClasses: currentState.cancelingClasses.value,
        weekTimes: weekTimes
    });
}


export const getAllSchedulesMeeting = async () => {
    return await axios.get('/api/meeting/get-all-schedule-meeting', {});
}

export const getScheduleMeetingById = async () => {
    return await axios.get('/api/meeting/get-schedule-meeting-by-id', {});
}

export const getScheduleNames = async () => {
    return await axios.get('/api/meeting/get-all-schedule-meeting-names');
}







