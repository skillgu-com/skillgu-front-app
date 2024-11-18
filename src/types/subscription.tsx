import {MentorshipPlan} from "@customTypes/order";

export interface SubscriptionDetailsDTO {
    status: string;
    startDate: string;
    endDate: string;
    amountDue: string;
    planName: string;
    planAmount: string;
    interval: string;
    autoRenewal: string;
    canceledAtPeriodEnd: string;
    isCanceled: boolean;
    lastPlanName: string;
}

export type SubscriptionDTO = {
    mentorId: string;
    userId: string;
    mentorshipPlan: MentorshipPlan;
    availableSessionSlots: number;
};

export type Subscription = {
    mentorId: string;
    userId: string;
    mentorshipPlan: MentorshipPlan;
    availableSessionSlots: number;
};