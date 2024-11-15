import axios from "axios";
import {ReviewPropsTypes} from "@customTypes/review";

export const sendReview = async (props: ReviewPropsTypes) => {
    try {
        const response = await axios.post(`/api/review/submit`, props);
        return response.data;
    } catch (error) {
        console.error('Error submitting review:', error);
        throw error;
    }
};