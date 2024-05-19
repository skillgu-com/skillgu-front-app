import {Mentor} from "@customTypes/mentor";

export type MentoringSessionT = {
    id: string,
    mentor: Mentor,
    title: string,
    start: Date,
    end: Date,
    meetingLink: string,
    contact: {
        mobile: string,
        email: string,
    },
};

export type MentoringSessionInListT = Pick<MentoringSessionT, 'id' | 'start' | 'end' | 'title' | 'mentor'>

export type MentoringSessionDTO = {
    id: string,
    mentor: Mentor,
    title: string,
    start: string,
    end: string,
    meetingLink: string,
    contact: {
        mobile: string,
        email: string,
    },
}

export type MentoringSessionInListDTO = Pick<MentoringSessionDTO, 'id' | 'start' | 'end' | 'title' | 'mentor'>


