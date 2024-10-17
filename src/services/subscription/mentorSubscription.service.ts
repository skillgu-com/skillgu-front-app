import axios from 'axios';

// Fetch current mentor plan
export const fetchMentorPlan = async (): Promise<string> => {
    try {
        const response = await axios.get('/api/mentor/get-current-plan');
        return response.data;
    } catch (error) {
        console.error('Error fetching mentor plan:', error);
        throw error;
    }
};

// Update mentor plan
export const updateMentorPlan = async (plan: string): Promise<void> => {
    console.log('test tutaj zmieniamy plan: ', plan)
    try {
        const response = await axios.post('/api/mentor/update-plan', {plan});
        console.log('Mentor plan updated successfully:', response.data);
    } catch (error) {
        console.error('Error updating mentor plan:', error);
        throw error;
    }
};
