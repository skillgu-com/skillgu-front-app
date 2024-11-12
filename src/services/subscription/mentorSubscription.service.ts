import axios from 'axios';

export const fetchMentorPlan = async (): Promise<{ plan: string, startDate: string, canChangePlan: boolean }> => {
    try {
        const response = await axios.get('/api/mentor/get-current-plan');


        return response.data; // Odpowiedź zawiera { plan, startDate, canChangePlan }
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
            // Obsługa błędu walidacyjnego zwróconego przez serwer
            console.error('Error updating mentor plan:', error.response.data.message);
            throw new Error(error.response.data.message); // Rzucamy błąd dalej, aby komponent mógł go obsłużyć
        } else {
            // Obsługa innych błędów
            console.error('Unexpected error:', error.message);
            throw new Error('Wystąpił nieoczekiwany błąd.');
        }
    }
};
