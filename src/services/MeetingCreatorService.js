import axios from "axios";

export const createNewMeeting = async (timeZone, sessionDescription, sessionTypeValues, sessionPrice, typeOfNotification) => {
    return await axios.post('/api/meeting/create-session', {
        timeZone: timeZone,
        sessionDescription: sessionDescription,
        sessionTypeValues: sessionTypeValues,
        sessionPrice: sessionPrice,
        typeOfNotification: typeOfNotification
    });
}

export const createScheduleMeeting = async (currentState) => {
    console.log(currentState);
    return await axios.post('/api/meeting/create-schedule-meeting', {
        scheduleName: currentState.scheduleName.value,
        scheduleStartDay: currentState.scheduleStartDay,
        scheduleEndDay: currentState.scheduleEndDay,
        meetTime: currentState.meetTime,
        meetingBreakDuration: currentState.meetingBreakDuration.value,
        participant: currentState.participant.value,
        meetingLimit: currentState.meetingLimit.value,
        cancelingClasses: currentState.cancelingClasses.value
    });
}


export const getAllSchedulesMeeting = async () => {
    return await axios.get('/api/meeting/get-all-schedule-meeting', {});
}

export const getScheduleMeetingById = async () => {
    return await axios.get('/api/meeting/get-schedule-meeting-by-id', {});
}





