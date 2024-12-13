import {CalendarSlot} from "@customTypes/booking";
import axios from "axios";
import {SessionCalendarEventResponse, Slot} from "@services/mentoringSessions/getMentorAvailabilityByMeetingId.types";

type Input = {
    mentorID: number
    sessionID: number
}

type Output = CalendarSlot[]

const dataParser = (dto: SessionCalendarEventResponse): Slot => {
    const startDateTime = new Date(`${dto.sessionDate}T${dto.hour}`);
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);
    return {
        id: dto.calendarEventId,
        title: `${startDateTime.getHours()}:${startDateTime.getMinutes() < 10 ? '0' : ''}${startDateTime.getMinutes()}`,
        start: startDateTime,
        end: endDateTime,
        available: dto.available
    };
};

export const fetchCalendarSession = async (mentorSessionRequest: Input) => {
    const {mentorID, sessionID} = mentorSessionRequest;
    const url = `/api/1.0/mentor/${mentorID}/sessions/${sessionID}`;
    return await axios.get<Output>(url);
};


export const fetchCalendarMentorship = async (mentorId: string, sessionId: string) => {
    const {data} = await axios.get<SessionCalendarEventResponse[]>(`/api/1.0/mentor/${mentorId}/sessions/${sessionId}`,);
    return data.map(dataParser);
}

