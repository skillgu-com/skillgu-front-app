import {SubscriptionPlan} from "@customTypes/order"
import {SubscriptionStatus} from "@customTypes/subscriptions"

export type FetchStudentMentorsInput = {
    // sortBy: 'status'
    // sortMethod: 'ASC'|'DESC'
    // status: SubscriptionStatus,
    skip: number
    take: number
}
export type ServiceSessionDTO = {
    mentorID: number;
    subscriptionId: number;
    mentorshipId: string;
    meetTime: number;
    scheduleName: string;
    sessionName: string;
    sessionPrice: number;
    sessionType: string;
    description: string;
    avatarUrl: string;
    fullName: string;
    reviewsCount: number
};

export type FetchStudentMentorsOutput = {
    total: number;
    mentors: {
        id: number;
        nickname: string;
        avatarUrl: string;
        fullName: string;
        status: 'accepted' | 'rejected' | 'awaiting' | 'suspended' | 'active';
        plan: SubscriptionPlan;
        scheduleSet: boolean;
        paidUntil: string;
        mentorshipId: number;
        mentorId: number;
        serviceSessionDTO: ServiceSessionDTO;
    }[];
};