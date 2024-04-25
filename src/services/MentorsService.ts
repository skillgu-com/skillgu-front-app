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

        // const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/mentor/filtered-mentors`, filterMentorToSend);
        const response = await fetch('/search-mentor-results-mocked.json');
        const responseData = await response.json()
        const { total, mentors } = responseData
        const filteredMentors = mentors.slice(skip, skip + take);

        return { total, mentors: filteredMentors }
    } catch (error) {
        console.error('Error fetching mentors:', error);
        throw error;
    }
};

//     export const fetchMentors = async (
//     take: number,
//     skip: number,
//     filters?: FiltersSelected
//     ): Promise<ResponseData> => {
//     @TODO: call to backend, add filters
//     const response = await fetch("/search-mentor-results-mocked.json");
//     const data = await response.json();
//     return data as ResponseData;
//     };