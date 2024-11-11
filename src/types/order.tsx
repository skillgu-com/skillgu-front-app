import { DescriptionRowDTO } from "@services/mentor/fetchMentorServices.service";


export type SubscriptionOrderStatus =
  | "awaiting"
  | "rejected"
  | "active"
  | "suspended"
  | "completed";
export type SubscriptionPlan = "basic" | "advanced" | "pro";
export type SessionStatus = "planned" | "completed" | "canceled" | "suspended";
export type ServiceType = "session" | "mentoring";

export type MentorshipOrderInput = {
  planId: number;
  selectedGoals: string[];
  timezone: string;
  location: string;
  description: string;
  questions: string;
};

export type MentorhsipPlanType = {
  id: number;
  variant: SubscriptionPlan;
  description?: string;
  price: number;
  sessionDuration?: number;
  sessionsPerMonth?: number;
  responseTime?: number;
  planIncludes: string[];
};

export type ServiceMentoring = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  variant: SubscriptionPlan;
  descriptionRows: string[];
};

export type ServiceSession = {
  mentorID: number;
  id: string;
  meetTime: number;
  scheduleName: string;
  sessionName: string;
  sessionPrice: number;
  sessionType: string;
  description: string;
  avatarUrl: string;
  fullName: string;
  reviewsCount: number;
  timeZone?: string;
};

export interface MentorshipPlan {
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
