import {MentorshipPlan} from "@customTypes/order";

export interface SubscriptionDetailsDTO {
    status: string;
    startDate: string;
    endDate: string;
    amountDue: string;
    invoiceDate: string;
    planId: string;
    planName: string;
    planAmount: string;
    interval: string;
    autoRenewal: string;
    canceledAtPeriodEnd: string;
    mentorId: string;
    isCanceled: boolean
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