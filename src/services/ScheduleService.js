import axios from "axios";

export const createScheduleMeeting = async (currentState, weekTimes) => {
    return await axios.post('/api/1.0/schedule', {
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

export const fetchAllSchedules = async () => {
    return await axios.get('/api/1.0/schedule/fetch-all');
}
