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

export type MentoringSessionInListT = MentoringSessionT;

export type MentoringSessionDTO = {
    id: string,
    user: Mentor,
    title: string,
    start: string,
    end: string,
    meetingLink: string,
    contact: {
        mobile: string,
        email: string,
    },
}

export type MentoringSessionInListDTO = MentoringSessionDTO;


