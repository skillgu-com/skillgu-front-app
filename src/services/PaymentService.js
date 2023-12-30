import axios from "axios";


export const testStripePayment = async () => {
    return await axios.post('/api/stripe/create-checkout-session');

}