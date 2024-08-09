import {
    GetMentorAvailabilityParams,
    Slot,
    SlotDTO
} from "@services/mentoringSessions/getMentorAvailabilityByMeetingId.types";
import {format} from "date-fns";
import axios from "axios";


const getMock = (): Promise<SlotDTO[]> => new Promise((res) => {

    const mock = [
        {
            "id": 12441,
            "start": "2024-08-07T16:30:00",
            "end": "2024-08-07T17:30:00",
            "available": true
        },
        {
            "id": 1231,
            "start": "2024-08-08T15:30:00",
            "end": "2024-08-08T16:30:00",
            "available": true
        },
        {
            "id": 123532,
            "start": "2024-08-08T12:30:00",
            "end": "2024-08-08T13:30:00",
            "available": true
        },
        {
            "id": 1233211,
            "start": "2024-08-08T11:30:00",
            "end": "2024-08-08T12:30:00",
            "available": true
        },
        {
            "id": 12367541,
            "start": "2024-08-08T10:30:00",
            "end": "2024-08-08T11:30:00",
            "available": true
        },
        {
            "id": 1211231,
            "start": "2024-05-28T16:30:00",
            "end": "2024-05-28T17:30:00",
            "available": true
        },
        {
            "id": 12665451,
            "start": "2024-05-29T16:30:00",
            "end": "2024-05-29T17:30:00",
            "available": true
        }
    ];

    setTimeout(() => res(mock), 300);
});

const dataParser = (dto: SlotDTO): Slot => {
    const startDate = new Date(dto.start);

    return {
        id: dto.id,
        title: format(startDate, 'HH:mm'),
        start: startDate,
        end: new Date(dto.end),
        available: dto.available
    }
}

const getMentorAvailabilityByMentorIdService = async (mentorId: string, params: GetMentorAvailabilityParams) => {
    const {data} = await axios.post<SlotDTO[]>('/api/1.0/fetch-calendar-session', {mentorID: mentorId, sessionId: 1});

    // TODO API
    // const data = await getMock();
    return data.map(dataParser);

};

export const getMentorAvailabilityByMeetingIdServiceKeyGenerator = (mentorId: string, params: GetMentorAvailabilityParams) => {
    return ['mentorAvailability', mentorId, `from-${params.from.toString()}`, `to-${params.to.toString()}`]
}

export default getMentorAvailabilityByMentorIdService;
