import {FetchStudentMentorsInput, FetchStudentMentorsOutput,} from "./fetchStudentMentors.types";
import axios from "axios";

export const fetchMenteeSubscription = async (
    props: FetchStudentMentorsInput
): Promise<FetchStudentMentorsOutput> => {
    try {
        const response = await axios.get('/api/subscriptions/mentee/mentor');
        const data = response.data;

        return {
            mentors: data.data.slice(0, props.take),
            total: data.data.length,
        };
    } catch (error) {
        console.error('Error fetching student mentors:', error);
        throw error;
    }
};
