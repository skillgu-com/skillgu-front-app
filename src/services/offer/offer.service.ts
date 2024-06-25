import { ServiceMentoring } from "@customTypes/order";

export type OfferStatus = 'in-progress'|'rejected'|'accepted'

export type OfferDetails = {
  status: OfferStatus
  rejectionFeedback: string
  service: ServiceMentoring;
  userFullname: string;
  userAvatalUrl: string;
  mainGoals: string[];
  timezone: string;
  location: string;
  aboutStudent: string;
  questionForMentor: string;
};


export const fetchOfferDetails = async (
  offerId: number
): Promise<OfferDetails> => {
  return {
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
    userFullname: "Anna Kula",
    userAvatalUrl: "/images/img_avatar.png",
    mainGoals: [
        'Jestem studentem i szukam pomocy w nauce',
        'Właśnie ukończyłem studia i potrzebuję pomocy w rozpoczęciu kariery',
    ],
    timezone: "CEST",
    location: "Online",
    aboutStudent:
      "Hej! Jestem studentką i poszukuję pomocy w naucy. Chciałabym również zmienić moją ścieżkę kariery.",
    questionForMentor: "Jak radzisz sobie z uczniami, którzy mają trudności z materiałem?",
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
};
