import axios from "axios";
import {MentoringSessionDTO, MentoringSessionT} from "./mentoringSession.types";
import {parseMentoringSessionForFE} from "./mentoringSession.parsers";


const getMentoringSessionById = async (id: string): Promise<MentoringSessionT> => {
    const {data} = await axios.get<MentoringSessionDTO>(`/api/1.0/calendar/events/${id}`);

    return parseMentoringSessionForFE(data);
};

export const getMentoringSessionByIdKeyGenerator = (id: string) => ['mentoringSession', id];

export default getMentoringSessionById;