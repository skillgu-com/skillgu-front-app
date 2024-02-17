import axios from "axios";

export const createCheckoutSession = async (sessionData) => {
    console.log("TUTAJ JESTEM", sessionData)
    return await axios.post('/api/stripe/create-checkout-session',sessionData);
}