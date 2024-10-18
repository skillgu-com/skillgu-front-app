import axios from 'axios';
import {useState} from "react/index";

// Fetch current mentor plan
// export const fetchMentorPlan = async (): Promise<string> => {
//     try {
//         const response = await axios.get('/api/mentor/get-current-plan');
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching mentor plan:', error);
//         throw error;
//     }
// };
//
//
//
// export const updateMentorPlan = async (plan: string): Promise<void> => {
//     try {
//         const response = await axios.post('/api/mentor/update-plan', plan, {
//             headers: {
//                 'Content-Type': 'text/plain',
//             },
//         });
//
//
//         alert(`Sukces: ${response.data.message}`);
//     } catch (error: any) {
//         if (error.response) {
//             // Obsługa błędu, wyświetlenie komunikatu walidacyjnego
//             console.error('Error updating mentor plan:', error.response.data.message);
//             alert(`Błąd: ${error.response.data.message}`);
//         } else {
//             // Obsługa innych błędów
//             console.error('Unexpected error:', error.message);
//             alert('Wystąpił nieoczekiwany błąd.');
//         }
//     }
// };
// Funkcja pobierająca aktualny plan mentora
// export const fetchMentorPlan = async (): Promise<{ plan: string, startDate: string }> => {
//     try {
//         const response = await axios.get('/api/mentor/get-current-plan');
//         return response.data; // Zakładamy, że odpowiedź zawiera obiekt z planem i startDate
//     } catch (error) {
//         console.error('Error fetching mentor plan:', error);
//         throw error; // Rzucamy błąd dalej, aby komponent mógł go obsłużyć
//     }
// };

export const fetchMentorPlan = async (): Promise<{ plan: string, startDate: string, canChangePlan: boolean }> => {
    try {
        const response = await axios.get('/api/mentor/get-current-plan');
        return response.data; // Odpowiedź zawiera { plan, startDate, canChangePlan }
    } catch (error) {
        console.error('Error fetching mentor plan:', error);
        throw error;
    }
};

// Funkcja aktualizująca plan mentora
export const updateMentorPlan = async (plan: string): Promise<void> => {
    try {
        const response = await axios.post('/api/mentor/update-plan', plan, {
            headers: {
                'Content-Type': 'text/plain',
            },
        });

        console.log('Odpowiedź z serwera:', response.data);
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
