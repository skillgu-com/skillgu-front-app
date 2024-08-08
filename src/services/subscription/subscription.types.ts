import {MentorshipPlan} from "@customTypes/order";

export type SubscriptionDTO = {
    mentorId: string;
    mentorshipPlan: MentorshipPlan;
    availableSessionSlots: number;
};

export type Subscription = {
    mentorId: string;
    mentorshipPlan: MentorshipPlan;
    availableSessionSlots: number;
};
