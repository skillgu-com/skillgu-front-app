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
    teamMembers: { fullName: string, email: string }[];
}


// // Funkcja tworząca sesję checkout w Stripe z zabezpieczeniami
// export const createCheckoutSession = async (sessionData: Partial<CombinedData>) => {
//     const {
//         sessionID = null,
//         name = null,
//         time = null,
//         sessionPrice = null,
//         description = null,
//         mentorID = null,
//         calendarEventId = null,
//         customerEmail = "",
//         customerPhone = "",
//         customerMessage = "",
//         teamMembers = [],
//     } = sessionData;
//
//     // Tworzenie payloadu do wysyłki
//     const payload: CombinedData = {
//         sessionID,
//         name,
//         time,
//         sessionPrice,
//         description,
//         mentorID,
//         calendarEventId,
//         customerEmail,
//         customerPhone,
//         customerMessage,
//         teamMembers
//     };
//
//     return await axios.post('/api/stripe/create-checkout-session', payload);
// }

export const createCheckoutSession = async (sessionData: any) => {
    return await axios.post('/api/stripe/create-checkout-session', sessionData);
}

export const createCheckoutSubscription = async (mentorshipData: MentorshipData) => {
    return await axios.post('/api/stripe/create-checkout-subscription', mentorshipData);
};