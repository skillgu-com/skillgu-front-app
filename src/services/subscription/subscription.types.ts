import {MentorshipPlan} from "@customTypes/order";

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