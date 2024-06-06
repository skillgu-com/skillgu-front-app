import {Input, OutputFailed, OutputSuccess} from './fetchMentorServices.types'
import {FiltersSelected, Mentor, Review} from "@customTypes/mentor";
import axios from "axios";

type ResponseData = {
    mentors: Mentor[];
    total: number;
};


type FetchMentorReviewsInput = {
    mentorId: string;
    take: number;
    skip: number;
};

type FetchMentorReviewsData = {
    total: number;
    avgRate: number
    reviews: Review[];
};


export const fetchMentorServices = async (input: Input): Promise<OutputSuccess | OutputFailed> => {
    try {
        const resp = await fetch('/mentor-services.json')
        const respData = await resp.json()
        return {
            success: true,
            session: respData.session,
            mentoring: respData.mentoring,
        }
    } catch (e) {
        return {success: false, error: 'Error'}
    }
}

export const fetchMentors = async (take: number, skip: number, filters?: FiltersSelected): Promise<ResponseData> => {
    try {
        const filterMentorToSend = {
            take: 10,
            skip: 10,

            // take: take.toString(),
            // skip: skip.toString(),
            filters: filters || null
        };

        console.log('prepare filterMentorToSend', filterMentorToSend)

        const response = await axios.post('/api/mentor/filtered-mentors', filterMentorToSend);


        const {total, mentors} = response.data;
        const filteredMentors = mentors.slice(skip, skip + take);



        return {total, mentors: filteredMentors}
    } catch (error) {
        console.error('Error fetching mentors:', error);
        throw error;
    }
};

export const fetchMentorReviews = async ({
                                             mentorId,
                                             take = 10,
                                             skip = 0,
                                         }: FetchMentorReviewsInput): Promise<FetchMentorReviewsData> => {
    try {
        const response = await fetch("/mentor-reviews.json");
        const responseData = await response.json();
        const {total, reviews, avgRate } = responseData;
        return {total, reviews, avgRate };
    } catch (error) {
        console.error("Error fetching mentor reviews:", error);
        throw error;
    }
};

