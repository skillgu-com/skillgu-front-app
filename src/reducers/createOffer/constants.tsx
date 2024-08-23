import { PlanInput } from "@customTypes/create-mentoring";
import { CreateOfferState } from "./types";

export const initialStep : Record<'basic'|'advanced'|'pro', null|PlanInput> = {
  basic: {
    schedule: "",
    price: 159,
    description: "",
    sessionsPerMonth: 3,
    sessionDuration: 45,
    responseTime: 48,
    planIncludes: ["Nieograniczony dostęp do pytań i odpowiedzi"],
    planType: "basic",
    mentorshipId: -1,
  },
  advanced: {
    schedule: "",
    price: 189,
    description: "",
    sessionsPerMonth: 3,
    sessionDuration: 60,
    responseTime: 48,
    planIncludes: ["Nieograniczony dostęp do pytań i odpowiedzi"],
    planType: "advanced",
    mentorshipId: -1,

  },
  pro: {
    schedule: "",
    price: 300,
    description: "",
    sessionsPerMonth: 4,
    sessionDuration: 60,
    responseTime: 24,
    planIncludes: ["Nieograniczony dostęp do pytań i odpowiedzi"],
    planType: "pro",
    mentorshipId: -1,
  },
}

export const createOfferInitialState: CreateOfferState = {
  fetchedInitial: false,
  step: "build",
  availableSchedules: [],
  saved: false,
  numberOfPlans: 1,
  providesMaterials: true,
  pending: false,
  errorMessage: "",
  success: false,
  basic: null,
  advanced: null,
  pro: null,
};
