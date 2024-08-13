import axios from "axios";

interface MentorshipData {
    mentorId: number;
    mentorshipId: number;
    calendarEventId: number[];
}

export const createCheckoutSession = async (sessionData:any) => {
    return await axios.post('/api/stripe/create-checkout-session',sessionData);
}

export const createCheckoutSubscription = async (mentorshipData: MentorshipData) => {
    return await axios.post('/api/stripe/create-checkout-subscription', mentorshipData);
};