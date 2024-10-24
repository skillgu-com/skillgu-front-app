import axios from "axios";
import { MentorCategoryT } from "@services/dictionaries/sessionCategoriesDictionary/sessionCategoriesDictionary.data";
import { SessionDTO } from "@services/session/sessionService";

type SingleSession = SessionDTO & {
  sessionTerm?: Date;
  sessionDuration?: number;
  mentor: Mentor;
  userEmail: string;
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

export const getSessionOrderSummary = async (
  calendarEventId: string | number
): Promise<SingleSession> => {
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
    sessionName: "Anna Stokrotka",
    sessionPrice: 220,
    sessionType: "Technical call",
    sessionCategory: "IT",
    scheduleID: 1,
    sessionDescription: "some description concerning technical call",
    sessionTerm: new Date(),
    sessionDuration: 90,
    timeZone: "Europe/Warsaw",
  };
};
