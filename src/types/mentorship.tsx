import {DescriptionRowDTO} from "@services/mentor/fetchMentorServices.service";


export type MentorshipOrderInput = {
    planId: number;
    selectedGoals: string[];
    timezone: string;
    location: string;
    description: string;
    questions: string;
};

export interface MentorshipData {
    mentorId: string;
    mentorshipId: string;
    subscriptionId: string;
    slots: { date: Date; calendarEventId: number; hour: string }[];
    scheduleId: number;
}

export type CombinedData = {
    sessionID: string | null;
    name: string | null;
    time: string | null;
    sessionPrice: number | null;
    description: string | null;
    mentorID: string | null;
    calendarEventId: number | null;
    customerEmail: string;
    customerPhone: string;
    customerMessage: string;
    guestMentee: { fullName: string, email: string }[];
    hour: string | null
    term: string | null
}

export interface MentorshipPlanDTO {
    id: string;
    title: string;
    subtitle: string;
    price: number;
    variant: string;
    descriptionRows: DescriptionRowDTO[];
    sessionsPerMonth: number;
    sessionDurationMinutes: number;
    responseTimeHours: number;
    providesMaterials: boolean;
    mentoringDescription: string;
    scheduleId: number;
}

export type ServiceMentoring = {
    id: string;
    title: string;
    subtitle: string;
    price: number;
    variant: "" | "pro";
    descriptionRows: string[];
};


export interface MentorshipDTO {
    mentorships: MentorshipPlanDTO[];
}