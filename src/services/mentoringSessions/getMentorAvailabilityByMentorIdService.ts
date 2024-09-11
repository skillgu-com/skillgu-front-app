import {
    GetMentorAvailabilityParams, SessionCalendarEventResponse,
    Slot,
    // SlotDTO
} from "@services/mentoringSessions/getMentorAvailabilityByMeetingId.types";
// import {format} from "date-fns";
import axios from "axios";

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

const getMentorAvailabilityByMentorIdService = async (mentorId: string,subscriptionId: string, params: GetMentorAvailabilityParams) => {
    const {data} = await axios.post<SessionCalendarEventResponse[]>('/api/1.0/fetch-calendar-session', {mentorID: mentorId, sessionID: subscriptionId});
    return data.map(dataParser);
};

export const getMentorAvailabilityByMeetingIdServiceKeyGenerator = (mentorId: string, params: GetMentorAvailabilityParams) => {
    return ['mentorAvailability', mentorId, `from-${params.from.toString()}`, `to-${params.to.toString()}`]
}

export default getMentorAvailabilityByMentorIdService;