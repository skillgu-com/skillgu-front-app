import {
    GetMentoringSessionsByDateParams
} from "@services/mentoringSessions/getMentoringSessionsInDates.types";
import {MentoringSessionInListDTO, MentoringSessionInListT} from "@services/mentoringSessions/mentoringSession.types";
import axios from "axios";
import {parseMentoringSessionInListForFE} from "@services/mentoringSessions/mentoringSession.parsers";


export const fetchAllCalendarEventsForSpecificDate = async (
    params: GetMentoringSessionsByDateParams
): Promise<MentoringSessionInListT[]> => {
    const {data} = await axios.get<MentoringSessionInListDTO[]>(
        `/api/1.0/calendar/current/day/events/date?date=${params.date}`
    );
    return data.map(parseMentoringSessionInListForFE);
};
