import {GetMentorAvailabilityParams,} from "@services/mentoringSessions/getMentorAvailabilityByMeetingId.types";
import {fetchCalendarMentorship} from "@services/calendar/calendarService";


const getMentorAvailabilityByMentorIdService = async (mentorId: string, sessionId: string, params: GetMentorAvailabilityParams) => {
    return fetchCalendarMentorship(mentorId, sessionId);
};

export const getMentorAvailabilityByMeetingIdServiceKeyGenerator = (mentorId: string, params: GetMentorAvailabilityParams) => {
    return ['mentorAvailability', mentorId, `from-${params.from.toString()}`, `to-${params.to.toString()}`]
}

export default getMentorAvailabilityByMentorIdService;