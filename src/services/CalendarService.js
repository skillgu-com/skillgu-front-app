import axios from "axios";


export const getAllCalendarEvents = async () => {
    return await axios.get('/api/calendar/get-all-events');

}
