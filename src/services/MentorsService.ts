import {FiltersSelected, Mentor} from "@customTypes/mentor";
import axios from "axios";

type ResponseData = {
    mentors: Mentor[];
    total: number;
};

export const fetchMentors = async (take: number, skip: number, filters?: FiltersSelected): Promise<ResponseData> => {
    try {
        const filterMentorToSend = {
            take: take.toString(),
            skip: skip.toString(),
            filters: filters || null
        };

        // console.log('wybrane filtry: ',filters)
        // console.log('filterMentorToSend ',filterMentorToSend)

        const response = await axios.post('/api/mentor/filtered-mentors', filterMentorToSend);
        // console.log('jestem jeszcze w metodzie fetch i czekam na odpowiedz ', response.data)

        return response.data;
    } catch (error) {
        console.error('Error fetching mentors:', error);
        throw error;
    }
};

// export const fetchMentors = async (
//     take: number,
//     skip: number,
//     filters?: FiltersSelected
// ): Promise<ResponseData> => {
//     // @TODO: call to backend, add filters
//     const response = await fetch("/search-mentor-results-mocked.json");
//     const data = await response.json();
//     return data as ResponseData;
// };
