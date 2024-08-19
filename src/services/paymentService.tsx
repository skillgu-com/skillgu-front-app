import axios from "axios";

export interface MentorshipData {
    mentorId: string;
    mentorshipId: string;
    calendarEventId: number[];
    subscriptionId:string
}

export const createCheckoutSession = async (sessionData:any) => {
    return await axios.post('/api/stripe/create-checkout-session',sessionData);
}

export const createCheckoutSubscription = async (mentorshipData: MentorshipData) => {
    return await axios.post('/api/stripe/create-checkout-subscription', mentorshipData);
};