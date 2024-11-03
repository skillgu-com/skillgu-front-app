import axios from "axios";
import { MentorCategoryT } from "@services/dictionaries/sessionCategoriesDictionary/sessionCategoriesDictionary.data";
import { PlanDetails } from "src/reducers/mentorship-application/types";

type MentorshipOrder = {
  mentor: Mentor;
  plan: PlanDetails;
  userEmail: string;
  terms: Date[];
  timeZone: string;
};

type Mentor = {
  id: number;
  userName: string;
  avatarUrl: string;
  fullName: string;
  profession: string;
  reviewsAvgRate: number;
  reviewsCount: number;
};

export const getMentorshipOrderSummary = async (
  calendarEventId: string | number
): Promise<MentorshipOrder> => {
  //TODO
  ///return await axios.get(`/api/1.0/order-confirm/${calendarEventId}`);
  return {
    userEmail: "gosia_kow@wp.pl",
    mentor: {
      avatarUrl:
        "http://res.cloudinary.com/dkclg8ppw/image/upload/v1/default/avatar",
      profession: "UI/UX Designer",
      id: 1,
      userName: "some",
      fullName: "Anna Kot",
      reviewsAvgRate: 4.2,
      reviewsCount: 8,
    },
    plan: {
      id: 11,
      plan: "pro",
      monthlyPrice: 1000,
      sessionsPerMonth: 3,
      sessionDuration: 45,
      responseTime: 72,
      included: [
        "Nieograniczony dostęp do pytań i odpowiedzi",
        "Stały kontakt mailowy – Wsparcie mailowe, na które możesz liczyć przez cały czas trwania pakietu",
        "Możliwość zadawania pytań między sesjami – Drobne pytania czy wyzwania nie muszą czekać na kolejną sesję.",
      ],
    },
    terms: [
      new Date(),
      new Date(
        "Sun Nov 05 2024 14:38:13 GMT+0100 (czas środkowoeuropejski standardowy)"
      ),
      new Date(
        "Sun Nov 09 2024 14:38:13 GMT+0100 (czas środkowoeuropejski standardowy)"
      ),
    ],
    timeZone: "Europe/Warsaw",
  };
};
