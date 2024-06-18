import axios from "axios";

const BASE_URL = '/api/stripe'; // Bazowy URL do Twojego backendu obsługującego Stripe

// export const createStripeAccountLink = async () => {
//     console.log('kutas bialy...')
//     try {
//         const response = await axios.post('/api/stripe/create-account-link', {
//             // Możesz dodać ciało żądania, jeśli to konieczne
//         });
//
//         return response.data; // Zwraca dane z odpowiedzi
//     } catch (error) {
//         console.error('Error creating Stripe account link:', error);
//         throw error; // Możesz obsłużyć błąd tutaj lub przekazać go wyżej
//     }
// };

export const createStripeAccount = async () => {
    try {
        const response = await axios.post('/api/stripe/create-account');
        return response.data; // Zwraca dane z odpowiedzi
    } catch (error) {
        console.error('Error creating Stripe account:', error);
        throw error; // Możesz obsłużyć błąd tutaj lub przekazać go wyżej
    }
};

export const createStripeAccountLink = async (accountId: string) => {
    try {
        const response = await axios.post(`api/stripe/create-account-link`, {
            account: accountId,
        });
        return response.data; // Zwraca dane z odpowiedzi
    } catch (error) {
        console.error('Error creating Stripe account link:', error);
        throw error; // Możesz obsłużyć błąd tutaj lub przekazać go wyżej
    }
};
