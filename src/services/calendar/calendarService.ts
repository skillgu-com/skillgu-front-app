import { CalendarSlot } from "@customTypes/booking";
import axios from "axios";

type Input = {
    mentorID: number
    sessionID: number
} 

type Output = CalendarSlot[]

export const fetchCalendarSession = async (mentorSessionRequest: Input) => {
    return await axios.post<Output>('/api/1.0/fetch-calendar-session',mentorSessionRequest);
}

