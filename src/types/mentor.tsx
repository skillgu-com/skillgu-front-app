import {DropdownOption} from "@customTypes/dropdownOption";
import {SubscriptionStatus} from "@customTypes/subscriptions";
import {SessionStatus} from "@customTypes/session";

export type SpecialVariant = "success" | "warning" | "error";

export type Mentor = {
    avatar_url: string;
    description: string;
    id: string;
    name: string;
    company: string;
    price: number;
    profession: string;
    reviewsAvgRate: number;
    reviewsCount: number;
    special: string;
    specialVariant: SpecialVariant;
    skills: DropdownOption[];
    title: string;
    username: string;
};


export interface MentorEditLinksFormInput {
    website: string;
    linkedin: string;
    twitter: string;
    github: string;
    dribbble: string;
    behance: string;
    youtube: string;
    facebook: string;
    instagram: string;
};

export type FetchSimilarMentorsInput = {
    take: number
}

export type FetchSimilarMentorsOutput = {
    mentors: {
        id: number
        userName: string
        avatarUrl: string
        fullName: string
        profession: string
        skill: string[]
    }[]
}
export type FetchMentorStudentsInput = {
    status: SubscriptionStatus,
    sortBy: 'status'
    sortMethod: 'ASC' | 'DESC'
    skip: number
    take: number
}

export type FetchMentorStudentsOutput = {
    total: number
    students: {
        id: number
        nickname: string
        avatarUrl: string
        fullName: string
        date: string
        status: SubscriptionStatus
        serviceType: 'session' | 'mentoring'
        serviceName: string
        isPro: boolean
        planName: string
    }[]
}

export type FetchMentorSessionsOutput = {
    total: number
    mentee: {
        id: number
        userName: string
        avatarUrl: string
        fullName: string
        date: string
        status: SessionStatus
        serviceType: 'session' | 'mentoring'
        serviceName: string
    }[]
}
export type FetchMentorSessionsInput = {
    sortBy: 'status'
    sortMethod: 'ASC' | 'DESC'
    skip: number
    take: number
}

export type MentorEditProfileFormInput = {
    heading: string;
    profession: string;
    company: string;
    biography: string;
    skill: DropdownOption[];
    services: DropdownOption[];
    timezone: string;
    language: DropdownOption[];
    categories: DropdownOption[];
    mentorTopics: DropdownOption[];
};

export type MentorEditPersonalDataFormInput = {
    firstName: string;
    surname: string;
    avatarUrl: File[];
    coverUrl: File[];
};


export type MentorEditPersonalDataFormInputTest = {
    firstName: string;
    surname: string;
    avatarUrl: string;
    coverUrl:string;
};

export type MentorPersonalData = {
    firstName: string;
    surname: string;
    avatarUrl: File[];
    coverUrl: File[];
};


