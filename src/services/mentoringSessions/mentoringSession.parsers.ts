import {
    MentoringSessionDTO,
    MentoringSessionInListDTO,
    MentoringSessionInListT,
    MentoringSessionT
} from "./mentoringSession.types";

export const parseMentoringSessionForFE = (data: MentoringSessionDTO): MentoringSessionT => {
    return {
        id: data.id,
        mentor: data.user,
        title: data.title,
        start: new Date(data.start),
        end: new Date(data.end),
        meetingLink: data.meetingLink,
        contact: {
            mobile: data.contact.mobile,
            email: data.contact.email,
        },
    }
}

export const parseMentoringSessionInListForFE = (data: MentoringSessionInListDTO): MentoringSessionInListT => {
    return {
        id: data.id,
        title: data.title,
        start: new Date(data.start),
        end: new Date(data.end),
        mentor: data.user,
        contact: data.contact,
        meetingLink: data.meetingLink,
    }
}