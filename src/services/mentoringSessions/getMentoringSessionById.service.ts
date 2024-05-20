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
        mentor: {
            id: '111',
            name: 'Jan Kowalski',
            description: 'Jan Kowalski jest doświadczonym menedżerem z branży IT. Specjalizuje się w zarządzaniu zespołami oraz wdrażaniu nowych technologii.',
            avatar_url: 'https://cdn.pixabay.com/photo/2023/04/21/15/42/portrait-7942151_640.jpg',
            price: 120,
            profession: 'Menedżer IT',
            reviewsAvgRate: 3.2,
            reviewsCount: 12,
            special: 'Specjalista',
            specialVariant: 'success',
            skills: ['Zarządzanie zespołami', 'Wdrożenia technologii'],
            title: 'Doświadczony Menedżer IT',
        },
        contact: {
            mobile: '123456789',
            email: 'jakiś@email.com'
        }
    }
    setTimeout(() => resolve(data), 1000);
});

const getMentoringSessionById = async (id: string): Promise<MentoringSessionT> => {
    // TODO API
    // const { data } =  await axios.get<MentoringSessionDTO>(`/api/1.0/get-all-events/${id}`);
    const data = await getMock();
    return parseMentoringSessionForFE(data);
};

export const getMentoringSessionByIdKeyGenerator = (id: string) => ['mentoringSession', id];

export default getMentoringSessionById;