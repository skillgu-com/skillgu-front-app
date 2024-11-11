import axios from "axios";

export const verifyReviewToken = async (token: any) => {
    try {
        const response = await axios.get(`/api/review/verify?token=${token}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error verifying token:', error);
        throw error;
    }
};
