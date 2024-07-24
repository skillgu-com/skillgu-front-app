import { ServiceMentoring, SubscriptionPlan } from "@customTypes/order";
import axios from "axios";

export type OfferStatus = 'in-progress'|'rejected'|'accepted'

type Plan = {
  id: number
  price: number
  sessionDuration: number
  responseTime: number
  sessionsPerMonth: number
  planIncludes: string[]
  subscriptionVariant: SubscriptionPlan;
}

export type OfferDetails = {
  status: OfferStatus
  rejectionFeedback: string
  service: ServiceMentoring;
  userFullName: string;
  userAvatarUrl: string;
  mainGoals: string[];
  timezone: string;
  location: string;
  aboutStudent: string;
  questionForMentor: string;
};

type Output = {
  offer: OfferDetails
  plan: Plan
}

export const fetchOfferDetails = async (
  offerId: number
): Promise<Output> => {
  return {
    offer: {
      status: 'in-progress',
    rejectionFeedback: '',
    service: {
      id: "1",
      title: "Plan pro",
      subtitle: "",
      price: 30000,
      variant: "pro",
      descriptionRows: [
        "4 sesje mentoringowe na miesiąc (60 minut każda)",
        "Nieograniczony dostęp do pytań i odpowiedzi",
        "Odpowiedzi na Twoje pytania w ciągu 24h",
        "Bezpośrednie wsparcie praktyczne w realizacji Twoich projektów",
      ],
    },
    userFullName: "Anna Kulaagus",
    userAvatarUrl: "/images/img_avatar.png",
    mainGoals: [
        'Jestem studentem i szukam pomocy w nauce',
        'Właśnie ukończyłem studia i potrzebuję pomocy w rozpoczęciu kariery',
    ],
    timezone: "CEST",
    location: "Online",
    aboutStudent:
      "Hej! Jestem studentką i poszukuję pomocy w naucy. Chciałabym również zmienić moją ścieżkę kariery.",
    questionForMentor: "Jak radzisz sobie z uczniami, którzy mają trudności z materiałem?",
    },
    plan: {
      id: 1,
      price: 300,
      sessionDuration: 60,
      responseTime: 24,
      sessionsPerMonth: 4,
      planIncludes: [
        'Nieograniczony dostęp do pytań i odpowiedzi',
        'Bezpośrednie wsparcie praktyczne w realizacji Twoich projektów',
      ],
      subscriptionVariant: 'pro',
    },
  };
};

export const acceptOffer = async (offerId: number): Promise<void> => {
  console.log(`Zaakceptowałeś ofertę o ID: ${offerId}.`);
};

export const rejectOffer = async (offerId: number): Promise<void> => {
  console.log(`Odrzuciłeś ofertę o ID: ${offerId}.`);
};

export const sendRejectionFeedback = async (
  offerId: number,
  reason: string
): Promise<void> => {
  console.log(
    `Feedback dla oferty o ID: ${offerId}. Powód odrzucenia: ${reason}`
  );
  const res = await axios.post(`/api/mentorship/reject/${offerId}`,reason);

};
