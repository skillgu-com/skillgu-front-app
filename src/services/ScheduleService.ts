import axios from "axios";
import {ScheduleFormInput} from "../pages/app/Schedules/screens/ScheduleForm/ScheduleForm";

// TODO type it
function extractTimeIntervalsFromDays(days: any, weekTimes: any) {
    Object.keys(days).forEach((element) => {
        if (days[element].value && typeof days[element].value === 'object' && Object.keys(days[element].value).length > 0) {
            weekTimes[element] = Object.values(days[element].value).map((day: any) => ({
                from: {time: day.from},
                to: {time: day.to}
            }));
        }
    });
}

export const createScheduleMeeting = async (currentState: ScheduleFormInput) => {
    const {name, dateFrom, dateTo, resign, type, time, groupAmount, ...days} = currentState;
    const weekTimes = {};

    extractTimeIntervalsFromDays(days, weekTimes);
    if (type.value === 'individual') {
        groupAmount.value = 0;
    }
    return await axios.post('/api/1.0/schedule', {
        scheduleName: name.value,
        scheduleStartDay: dateFrom.value,
        scheduleEndDay: dateTo.value,
        meetTime: time.value,
        resign: resign.value,
        type: type.value,
        weekTimes: weekTimes,
        participant: groupAmount.value
    });
};

export const fetchAllSchedules = async () => {
    return await axios.get('/api/1.0/schedule/fetch-all');
}

export const deleteSchedule = async (scheduleID: string) => {
    try {
        const response = await axios.post(`/api/1.0/schedule/delete?scheduleID=${scheduleID}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete schedule');
    }
};
