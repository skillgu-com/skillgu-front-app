import axios from "axios";
import {MentoringSessionDTO, MentoringSessionT} from "./mentoringSession.types";
import {parseMentoringSessionForFE} from "./mentoringSession.parsers";

const getMock = () => new Promise<MentoringSessionDTO>((resolve) => {
    const data: MentoringSessionDTO = {
        id: '1',
        title: 'Rozmowa ekspercka',
        start: '2024-05-04T15:30:00',
        end: '2024-05-04T16:30:00',
        meetingLink: 'https://meet.google.com/abc-123',
        participant: {
            mobile: '123456789',
            email: 'asdasd@wp.pl',
            avatar_url: 'https://via.placeholder.com/150',
            name: 'Jan Kowalski',
        },
    }
    setTimeout(() => resolve(data), 1000);
});

const getMentoringSessionById = async (id: string): Promise<MentoringSessionT> => {

    const { data } =  await axios.get<MentoringSessionDTO>(`/api/1.0/fetch-user-calendar-event-detail/${id}`);

    return parseMentoringSessionForFE(data);
};

export const getMentoringSessionByIdKeyGenerator = (id: string) => ['mentoringSession', id];

export default getMentoringSessionById;