import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import getMentorAvailabilityByMentorIdService, {
    getMentorAvailabilityByMeetingIdServiceKeyGenerator
} from "@services/mentoringSessions/getMentorAvailabilityByMentorIdService";
import {endOfWeek, startOfWeek} from "date-fns";
import {Slot} from "@services/mentoringSessions/getMentorAvailabilityByMeetingId.types";
import {ExtendedEvent} from "src/components/WeeklyCalendarPicker/WeeklyCalendarPicker";

const calculateWeekRange = (date: Date) => {
    return {from: startOfWeek(date, {weekStartsOn: 1}), to: endOfWeek(date, {weekStartsOn: 1})}
}
const parseSlotsToCalendarEvents = (slots: Slot[]): ExtendedEvent[] => {
    return slots.map(({start, end, id, title, available}) => ({
        id,
        start,
        end,
        title,
        available,
        allDay: true,
    }));
}

const useCalendarLogic = (mentorId?: string) => {

    const [visibleWeekRange, setVisibleWeekRange] = useState<{
        from: Date,
        to: Date
    }>(calculateWeekRange(new Date()));

    const onCalendarNavigate = (date: Date) => {
        setVisibleWeekRange(calculateWeekRange(date));
    }

    const {data: mentorAvailabilitySlots} = useQuery({
        // subscriptionData will be defined, it's checked in the enabled property
        queryKey: getMentorAvailabilityByMeetingIdServiceKeyGenerator(mentorId!, visibleWeekRange),
        // subscriptionData will be defined, it's checked in the enabled property
        queryFn: () => getMentorAvailabilityByMentorIdService(mentorId!, visibleWeekRange),
        enabled: !!mentorId,
    });

    return { onCalendarNavigate, mentorAvailabilitySlots: parseSlotsToCalendarEvents(mentorAvailabilitySlots || [])}
}

export default useCalendarLogic;