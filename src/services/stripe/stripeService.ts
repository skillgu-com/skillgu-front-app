import axios from "axios";


/**
 * Checks if a Stripe account exists for the current user.
 * @returns {Promise<string>} The Stripe account ID.
 */
export const getStripeAccount = async () => {
    const response = await axios.get('api/stripe/check/account');
    return response.data;
};

/**
 * Creates a new Stripe account.
 * @returns {Promise<string>} The created Stripe account ID.
 * @throws {Error} If there is an error creating the Stripe account.
 */
export const createStripeAccount = async () => {
    try {
        const response = await axios.post('api/stripe/create-account');
        return response.data;
    } catch (error) {
        console.error('Error creating Stripe account:', error);
        throw error;
    }
};

/**
 * Creates a Stripe account link for onboarding.
 * @param {string} accountId - The Stripe account ID.
 * @returns {Promise<string>} The URL for the Stripe account onboarding.
 * @throws {Error} If there is an error creating the Stripe account link.
 */
export const createStripeAccountLink = async (accountId: string) => {
    try {
        const response = await axios.post(`api/stripe/create-account-link`, {
            account: accountId,
        });
        return response.data;
    } catch (error) {
        console.error('Error creating Stripe account link:', error);
        throw error;
    }
};