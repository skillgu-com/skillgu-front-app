
import {MentoringSessionInListDTO, MentoringSessionInListT} from "./mentoringSession.types";
import {GetMentoringSessionsInDatesServiceParams} from "./getMentoringSessionsInDates.types";
import {parseMentoringSessionInListForFE} from "./mentoringSession.parsers";
import {Mentor} from "@customTypes/mentor";
import prepareParams from "../../helpers/prepareParams";
import axios from "axios";


const mentorMock: Mentor = {
    id: '111',
    name: 'Jan Kowalski',
    description: 'Jan Kowalski jest doświadczonym menedżerem z branży IT. Specjalizuje się w zarządzaniu zespołami oraz wdrażaniu nowych technologii.',
    avatar_url: 'https://cdn.pixabay.com/photo/2023/04/21/15/42/portrait-7942151_640.jpg',
    price: 120,
    profession: 'Menedżer IT',
    reviewsAvgRate: 3.2,
    reviewsCount: 12,
    company: 'Google',
    special: 'Specjalista',
    specialVariant: 'success',
    skill: [
        { label: "1", value: "Zarządzanie zespołami" },
        { label: "2", value: "Wdrożenia technologii" }
    ],
    title: 'Doświadczony Menedżer IT',
}

const contactMock = {
    mobile: '123 456 789',
    email: 'email@op.pl'
}

// const getMock = () => new Promise<MentoringSessionInListDTO[]>((resolve) => {
//
//     const data: MentoringSessionInListDTO[] = [
//         {
//             id: '1',
//             title: '1 - Rozmowa ekspercka',
//             start: '2024-05-01T11:30:00',
//             end: '2024-05-01T12:30:00',
//             mentor: mentorMock,
//             contact: contactMock,
//             meetingLink: 'https://meet.google.com/abc-123-xyz'
//         },
//         {
//             id: '2',
//             title: '2 - Rozmowa ekspercka',
//             start: '2024-05-02T11:30:00',
//             end: '2024-05-02T12:30:00',
//             mentor: mentorMock,
//             contact: contactMock,
//             meetingLink: 'https://meet.google.com/abc-123-xyz'
//         },
//         {
//             id: '3',
//             title: '3 - Rozmowa ekspercka',
//             start: '2024-05-02T13:30:00',
//             end: '2024-05-02T14:30:00',
//             mentor: mentorMock,
//             contact: contactMock,
//             meetingLink: 'https://meet.google.com/abc-123-xyz'
//         },
//
//         {
//             id: '4',
//             title: '4 - Rozmowa ekspercka',
//             start: '2024-05-03T10:30:00',
//             end: '2024-05-03T11:30:00',
//             mentor: mentorMock,
//             contact: contactMock,
//             meetingLink: 'https://meet.google.com/abc-123-xyz'
//         },
//         {
//             id: '5',
//             title: '5 - Rozmowa ekspercka',
//             start: '2024-05-03T12:30:00',
//             end: '2024-05-03T13:30:00',
//             mentor: mentorMock,
//             contact: contactMock,
//             meetingLink: 'https://meet.google.com/abc-123-xyz'
//         },
//         {
//             id: '6',
//             title: '6 - Rozmowa ekspercka',
//             start: '2024-05-03T14:30:00',
//             end: '2024-05-03T15:30:00',
//             mentor: mentorMock,
//             contact: contactMock,
//             meetingLink: 'https://meet.google.com/abc-123-xyz'
//         },
//
//         {
//             id: '7',
//             title: '7 - Rozmowa ekspercka',
//             start: '2024-05-04T09:30:00',
//             end: '2024-05-04T10:30:00',
//             mentor: mentorMock,
//             contact: contactMock,
//             meetingLink: 'https://meet.google.com/abc-123-xyz'
//         },
//         {
//             id: '8',
//             title: '8 - Rozmowa ekspercka',
//             start: '2024-05-04T10:30:00',
//             end: '2024-05-04T11:30:00',
//             mentor: mentorMock,
//             contact: contactMock,
//             meetingLink: 'https://meet.google.com/abc-123-xyz'
//         },
//         {
//             id: '9',
//             title: '9 - Rozmowa ekspercka',
//             start: '2024-05-04T12:30:00',
//             end: '2024-05-04T14:30:00',
//             mentor: mentorMock,
//             contact: contactMock,
//             meetingLink: 'https://meet.google.com/abc-123-xyz'
//         },
//         {
//             id: '10',
//             title: '10 - Rozmowa ekspercka',
//             start: '2024-05-04T15:30:00',
//             end: '2024-05-04T16:30:00',
//             mentor: mentorMock,
//             contact: contactMock,
//             meetingLink: 'https://meet.google.com/abc-123-xyz'
//         },
//         {
//             id: '11',
//             title: '11 - Rozmowa ekspercka',
//             start: '2024-05-04T15:30:00',
//             end: '2024-05-04T16:30:00',
//             mentor: mentorMock,
//             contact: contactMock,
//             meetingLink: 'https://meet.google.com/abc-123-xyz'
//         },
//         {
//             id: '12',
//             title: '12 - Rozmowa ekspercka',
//             start: '2024-05-04T15:30:00',
//             end: '2024-05-04T16:30:00',
//             mentor: mentorMock,
//             contact: contactMock,
//             meetingLink: 'https://meet.google.com/abc-123-xyz'
//         },
//         {
//             id: '13',
//             title: '13 - Rozmowa ekspercka',
//             start: '2024-05-04T15:30:00',
//             end: '2024-05-04T16:30:00',
//             mentor: mentorMock,
//             contact: contactMock,
//             meetingLink: 'https://meet.google.com/abc-123-xyz'
//         }
//     ];
//     setTimeout(() => resolve(data), 300)
// });

const getMentoringSessionsInDatesService = async (params: GetMentoringSessionsInDatesServiceParams): Promise<MentoringSessionInListT[]> => {
    // TODO API
    const { data } =  await axios.post<MentoringSessionInListDTO[]>(prepareParams('/api/1.0/fetch-all-calendar-user-events', params))
    // const data = await getMock();
    return data.map(parseMentoringSessionInListForFE);
};

export const getMentoringSessionsInDatesServiceKeyGenerator = (params: GetMentoringSessionsInDatesServiceParams) => {
    return ['calendarEvents', `from-${params.from.toString()}`, `to-${params.to.toString()}`]
}

export default getMentoringSessionsInDatesService;