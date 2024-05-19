import axios from "axios";
import prepareParams from "../../helpers/prepareParams";
import {MentoringSessionInListDTO, MentoringSessionInListT} from "./mentoringSession.types";
import {GetMentoringSessionsInDatesServiceParams} from "./getMentoringSessionsInDates.types";
import {parseMentoringSessionInListForFE} from "./mentoringSession.parsers";
import { parseISO } from "date-fns";


const getMock = () => new Promise<MentoringSessionInListDTO[]>((resolve) => {

    const data: MentoringSessionInListDTO[] = [
        {
            id: '1',
            title: '1 - Rozmowa ekspercka',
            start: '2024-05-01T11:30:00',
            end: '2024-05-01T12:30:00'
        },

        {
            id: '2',
            title: '2 - Rozmowa ekspercka',
            start: '2024-05-02T11:30:00',
            end: '2024-05-02T12:30:00'
        },
        {
            id: '3',
            title: '3 - Rozmowa ekspercka',
            start: '2024-05-02T13:30:00',
            end: '2024-05-02T14:30:00'
        },

        {
            id: '4',
            title: '4 - Rozmowa ekspercka',
            start: '2024-05-03T10:30:00',
            end: '2024-05-03T11:30:00'
        },
        {
            id: '5',
            title: '5 - Rozmowa ekspercka',
            start: '2024-05-03T12:30:00',
            end: '2024-05-03T13:30:00'
        },
        {
            id: '6',
            title: '6 - Rozmowa ekspercka',
            start: '2024-05-03T14:30:00',
            end: '2024-05-03T15:30:00'
        },

        {
            id: '7',
            title: '7 - Rozmowa ekspercka',
            start: '2024-05-04T09:30:00',
            end: '2024-05-04T10:30:00'
        },
        {
            id: '8',
            title: '8 - Rozmowa ekspercka',
            start: '2024-05-04T10:30:00',
            end: '2024-05-04T11:30:00'
        },
        {
            id: '9',
            title: '9 - Rozmowa ekspercka',
            start: '2024-05-04T12:30:00',
            end: '2024-05-04T14:30:00'
        },
        {
            id: '10',
            title: '10 - Rozmowa ekspercka',
            start: '2024-05-04T15:30:00',
            end: '2024-05-04T16:30:00'
        },
        {
            id: '10',
            title: '10 - Rozmowa ekspercka',
            start: '2024-05-04T15:30:00',
            end: '2024-05-04T16:30:00'
        },
        {
            id: '10',
            title: '10 - Rozmowa ekspercka',
            start: '2024-05-04T15:30:00',
            end: '2024-05-04T16:30:00'
        }
        ,{
            id: '10',
            title: '10 - Rozmowa ekspercka',
            start: '2024-05-04T15:30:00',
            end: '2024-05-04T16:30:00'
        }
    ];
    setTimeout(() => resolve(data), 300)
});

const getMentoringSessionsInDatesService = async (params: GetMentoringSessionsInDatesServiceParams): Promise<MentoringSessionInListT[]> => {
    // TODO API
    // const { data } =  await axios.get<MentoringSessionInListDTO[]>(prepareParams('/api/1.0/get-all-events', params))
    const data = await getMock();
    return data.map(parseMentoringSessionInListForFE);
};

export const getMentoringSessionsInDatesServiceKeyGenerator = (params: GetMentoringSessionsInDatesServiceParams) => {
    return ['calendarEvents', `from-${params.from.toString()}`, `to-${params.to.toString()}`]
}

export default getMentoringSessionsInDatesService;