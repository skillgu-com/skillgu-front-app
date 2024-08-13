import {CalendarSlot} from "@customTypes/booking";
import axios from "axios";

type Input = {
    mentorID: number
    sessionID: number
}

type MentorshipInput = {
    mentorID: number
    mentorshipId: number
}

type Output = CalendarSlot[]

export const fetchCalendarSession = async (mentorSessionRequest: Input) => {
    console.log('teraz tutaj patrze',mentorSessionRequest)
    return await axios.post<Output>('/api/1.0/fetch-calendar-session', mentorSessionRequest);
}