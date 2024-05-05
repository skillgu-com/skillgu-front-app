import axios from "axios";
import {MentoringSessionDTO, MentoringSessionT} from "./mentoringSession.types";
import {parseMentoringSessionForFE} from "./mentoringSession.parsers";


const getMentoringSessionById = async (id: string): Promise<MentoringSessionT> => {
    // TODO API
    const { data } =  await axios.get<MentoringSessionDTO>(`/api/1.0/get-all-events/${id}`);
    return parseMentoringSessionForFE(data);
};

export default getMentoringSessionById;