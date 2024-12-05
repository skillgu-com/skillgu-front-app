import {CalendarSlot} from "@customTypes/booking";
import axios from "axios";

type Input = {
    mentorID: number
    sessionID: number
}

type Output = CalendarSlot[]

export const fetchCalendarSession = async (mentorSessionRequest: Input) => {
    const {mentorID, sessionID} = mentorSessionRequest;
    const url = `/api/1.0/mentor/${mentorID}/sessions/${sessionID}`;
    return await axios.get<Output>(url);
};
