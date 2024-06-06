import {WeekdayT} from "./WeekdayT";
import {WeekdayInputT} from "./WeekdayInputT";

export type ScheduleFormInputT = {
    name: string;
    meetingLength: number;
    type: 'individual' | 'group';
    cancelAvailable: boolean;
    dateFrom: Date;
    dateTo: Date;
    participantsNumber: number; // only for group
    weekdays: Record<WeekdayT, WeekdayInputT>,
}