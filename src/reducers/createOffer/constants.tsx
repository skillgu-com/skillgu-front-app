import { CreateOfferState } from "./types";

export const createOfferInitialState: CreateOfferState = {
  step: "initial",
  availableSchedules: [],
  numberOfPlans: 1,
  providesMaterials: true,
  pending: false,
  errorMessage: "",
  success: false,
  base: {
    schedule: "",
    price: 159,
    description: "",
    numberOfSessions: 3,
    sessionDuration: 45,
    responseTime: 48,
    additional: ["Nieograniczony dostęp do pytań i odpowiedzi"],
  },
  advanced: {
    schedule: "",
    price: 189,
    description: "",
    numberOfSessions: 3,
    sessionDuration: 60,
    responseTime: 48,
    additional: ["Nieograniczony dostęp do pytań i odpowiedzi"],
  },
  pro: {
    schedule: "",
    price: 300,
    description: "",
    numberOfSessions: 4,
    sessionDuration: 60,
    responseTime: 24,
    additional: ["Nieograniczony dostęp do pytań i odpowiedzi"],
  },
};
