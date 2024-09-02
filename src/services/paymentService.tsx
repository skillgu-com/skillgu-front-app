import axios from "axios";

export interface MentorshipData {
    mentorId: string;
    mentorshipId: string;
    calendarEventId: number[];
    subscriptionId: string
}

export type CombinedData = {
    sessionID: string | null;
    name: string | null;
    time: string | null;
    sessionPrice: number | null;
    description: string | null;
    mentorID: string | null;
    calendarEventId: number | null;
    customerEmail: string;
    customerPhone: string;
    customerMessage: string;
    guestMentee: { fullName: string, email: string }[];
}
export const createCheckoutSession = async (sessionData: CombinedData) => {
    return await axios.post('/api/stripe/create-checkout-session', sessionData);
}

export const createCheckoutSubscription = async (mentorshipData: MentorshipData) => {
    return await axios.post('/api/stripe/create-checkout-subscription', mentorshipData);
};