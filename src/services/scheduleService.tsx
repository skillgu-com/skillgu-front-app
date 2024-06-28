import axios from "axios";
import type {ScheduleFormInputT} from "../pages/app/Schedules/screens/ScheduleForm/_types/ScheduleFormInputT";
import type {WeekdayT} from "../pages/app/Schedules/screens/ScheduleForm/_types/WeekdayT";
import {format} from "date-fns";
import {SessionDTO} from "@services/session/sessionService";

type WeekTimes = Record<WeekdayT, {
    from: { time: string },
    to: { time: string }
}[]>;

export interface TimeSlotDTO {
    time: string;
}

export interface TimeIntervalDTO {
    from: TimeSlotDTO;
    to: TimeSlotDTO;
}

export interface ScheduleDTO {
    scheduleName: string;
    scheduleStartDay: string;
    scheduleEndDay: string;
    meetTime: number;
    resign: boolean;
    type: string;
    participant: number;
    weekTimes: {
        [key: string]: TimeIntervalDTO[];
    };
}

const extractTimeIntervalsFromDays = (weekdays: ScheduleFormInputT['weekdays']): WeekTimes => {
    return Object.entries(weekdays)
        .filter(([_, {isActivated}]) => isActivated)
        .reduce((acc, [day, {slots}]) => {
            acc[day as WeekdayT] = slots.map(({dateFrom, dateTo}) => ({
                from: {time: format(dateFrom, 'HH:mm')},
                to: {time: format(dateTo, 'HH:mm')}
            }));
            return acc;
        }, {} as WeekTimes);
}

export const createScheduleMeeting = async (currentState: ScheduleFormInputT) => {
    const {name, dateFrom, dateTo, cancelAvailable, type, meetingLength, participantsNumber, weekdays} = currentState;
    const weekTimes = extractTimeIntervalsFromDays(weekdays);

    return await axios.post('/api/1.0/schedule', {
        scheduleName: name,
        scheduleStartDay: format(dateFrom, 'yyyy-MM-dd'),
        scheduleEndDay: format(dateTo, 'yyyy-MM-dd'),
        meetTime: meetingLength,
        resign: cancelAvailable,
        type: type,
        weekTimes: weekTimes,
        participant: type === 'individual' ? 0 : participantsNumber
    });
};

export const fetchAllSchedules = async () => {
    // TODO type response tightly and eventually parse it
    return await axios.get<{ id: number, scheduleName: string }[]>('/api/1.0/schedule/fetch-all');
}

export const deleteSchedule = async (scheduleID: string) => {
    try {
        const response = await axios.post(`/api/1.0/schedule/delete?scheduleID=${scheduleID}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete schedule');
    }
};
export const editMentorSchedule = async (scheduleId: string, updatedData: ScheduleDTO) => {
    try {
        const response = await axios.put(`/api/1.0/schedule/edit/${scheduleId}`, {
            scheduleName: updatedData.scheduleName,
            scheduleStartDay: updatedData.scheduleStartDay,
            scheduleEndDay: updatedData.scheduleEndDay,
            meetTime: updatedData.meetTime,
            resign: updatedData.resign,
            type: updatedData.type,
            participant: updatedData.participant,
            weekTimes: updatedData.weekTimes
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to update schedule');
    }
};

