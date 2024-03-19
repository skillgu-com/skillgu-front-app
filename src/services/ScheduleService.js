import axios from "axios";

export const createScheduleMeeting = async (currentState) => {
    const {name, dateFrom, dateTo, resign, type, time, ...days} = currentState;

    const weekTimes = {};

    Object.keys(days).forEach((day) => {
        // Sprawdzamy, czy dzień zawiera zakresy czasowe
        if (Array.isArray(days[day]) && days[day].length > 0) {
            // Tworzymy listę zakresów czasowych
            const timeIntervals = days[day].map((element) => ({
                from: { time: element.from },
                to: { time: element.to }
            }));
            // Dodajemy dzień i odpowiadającą mu listę zakresów czasowych do mapy
            weekTimes[day] = timeIntervals;
        }
    });

    return await axios.post('/api/1.0/schedule', {
        scheduleName: name.value,
        scheduleStartDay: dateFrom.value,
        scheduleEndDay: dateTo.value,
        meetTime: time.value,
        resign: resign.value,
        type: type.value,
        weekTimes: weekTimes
    });
};

export const fetchAllSchedules = async () => {
    return await axios.get('/api/1.0/schedule/fetch-all');
}
