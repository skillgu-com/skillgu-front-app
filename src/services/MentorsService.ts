import { FiltersSelected, Mentor, Review } from "@customTypes/mentor";
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

        const response = await axios.post('/api/mentor/filtered-mentors', filterMentorToSend);

        // const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/mentor/filtered-mentors`, filterMentorToSend);

        const {total, mentors} = response.data;
        const filteredMentors = mentors.slice(skip, skip + take);

        return {total, mentors: filteredMentors}
    } catch (error) {
        console.error('Error fetching mentors:', error);
        throw error;
    }
};

type FetchMentorReviewsInput = {
  mentorId: string;
  take: number;
  skip: number;
};

type FetchMentorReviewsData = {
  total: number;
  reviews: Review[];
};

export const fetchMentorReviews = async ({
  mentorId,
  take = 10,
  skip = 0,
}: FetchMentorReviewsInput): Promise<FetchMentorReviewsData> => {
  try {
    const response = await fetch("/mentor-reviews.json");
    const responseData = await response.json();
    const { total, reviews } = responseData;
    return { total, reviews };
  } catch (error) {
    console.error("Error fetching mentor reviews:", error);
    throw error;
  }
};
