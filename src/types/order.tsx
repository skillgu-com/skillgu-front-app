import {DescriptionRowDTO} from "@services/mentor/fetchMentorServices.service";

export type ServiceType = 'session' | 'mentoring'

// export type ServiceSession = {
//     id: string
//     title: string
//     descriptionHtml: string
//     price: number
//     durationMinutes: number
// }

export type ServiceMentoring = {
    id: string
    title: string
    subtitle: string
    price: number
    variant: '' | 'pro'
    descriptionRows: string[]
}

export type ServiceSession = {
    mentorID: number;
    id: string
    meetTime: number
    scheduleName: string
    sessionName: string
    sessionPrice: number
    sessionType: string
    description: string
}

export interface MentorshipPlan {
    id: string;
    title: string;
    subtitle: string;
    price: number;
    variant: string;
    descriptionRows: DescriptionRowDTO[];
    numberOfSessionsPerMonth: number;
    sessionDurationMinutes: number;
    responseTimeHours: number;
    providesMaterials: boolean;
    mentoringDescription: string;
}