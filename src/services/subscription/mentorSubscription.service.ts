import axios from 'axios';
import {SubscriptionDetailsDTO} from "@customTypes/subscription";


export const fetchMentorPlan = async (): Promise<{ plan: string, startDate: string, canChangePlan: boolean }> => {
    try {
        const response = await axios.get('/api/mentor/get-current-plan');


        return response.data.data;
    } catch (error) {
        console.error('Error fetching mentor plan:', error);
        throw error;
    }
};

export const updateMentorPlan = async (plan: string): Promise<void> => {
    try {
        const response = await axios.post('/api/mentor/update-plan', plan, {
            headers: {
                'Content-Type': 'text/plain',
            },
        });
        window.location.href = response.data.data;
    } catch (error: any) {
        if (error.response) {
            console.error('Error updating mentor plan:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Unexpected error:', error.message);
            throw new Error('Wystąpił nieoczekiwany błąd.');
        }
    }
};


export const fetchCurrentSubscription = async (): Promise<SubscriptionDetailsDTO> => {
    try {
        const response = await axios.get('/api/mentor/subscription/current');
        return response.data.data;
    } catch (error: any) {
        if (error.response) {
            console.error('Error fetching current subscription:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Unexpected error:', error.message);
            throw new Error('An unexpected error occurred.');
        }
    }
};

export const cancelMentorSubscription = async (): Promise<{ canChangePlan: boolean }> => {
    try {
        const response = await axios.post('/api/mentor/subscription/cancel');
        return response.data; // Returns updated plan status, including canChangePlan flag
    } catch (error: any) {
        if (error.response) {
            console.error('Error canceling mentor subscription:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Unexpected error:', error.message);
            throw new Error('An unexpected error occurred.');
        }
    }
};
