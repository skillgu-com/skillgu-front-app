import axios from "axios";
import {CombinedData, MentorshipData} from "@customTypes/mentorship";


export const createCheckoutSession = async (sessionData: CombinedData) => {
    return await axios.post('/api/stripe/create-checkout-session', sessionData);
}

export const createCheckoutSubscription = async (mentorshipData: MentorshipData) => {
    return await axios.post('/api/stripe/create-checkout-subscription', mentorshipData);
};