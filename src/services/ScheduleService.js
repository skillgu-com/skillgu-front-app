import axios from "axios";

export const createScheduleMeeting = async (currentState, weekTimes) => {
    return await axios.post('/api/schedule/create-schedule', {
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