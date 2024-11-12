import axios from "axios";

type ReviewPropsTypes = {
    rate: number;
    authorName: string;
    createdAt: string;
    comment: string;
    token: string;
};

// export const sendReview = async (props: ReviewPropsTypes): Promise<boolean> => {
//     console.log(props)
//     await axios.post("/.....", props);
//
//     return true;
// };


export const sendReview = async (props: ReviewPropsTypes) => {
    try {
        const response = await axios.post(`/api/review/submit`, props);
        return response.data;
    } catch (error) {
        console.error('Error submitting review:', error);
        throw error;
    }
};