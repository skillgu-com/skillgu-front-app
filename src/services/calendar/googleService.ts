import axios from "axios";
export const googleCalendar = async () => {
    try {
        const response = await axios.get('/oauth2/authorize');
        const url = response.data;
        window.location.href = url;


    } catch (error) {
        console.error('Error during Google OAuth:', error);
    }
};