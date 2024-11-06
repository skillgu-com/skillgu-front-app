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

  const response =  await axios.get(`/api/1.0/order/session/${calendarEventId}`);

  return {
    userEmail: response?.data?.menteeEmail,
    mentor: {
      avatarUrl: response.data?.avatarUrl,
      profession: response.data?.jobPosition,
      id: 1,
      userName: "some",
      fullName: response.data?.mentorFirstName + " " + response.data?.mentorLastName,
      reviewsAvgRate: 4.2,
      reviewsCount: 10,
    },
    sessionName: response?.data?.mentorFirstName + " " + response.data?.mentorLastName,
    sessionPrice: response?.data?.sessionPrice,
    sessionType: response?.data?.sessionType,
    sessionCategory: "IT",
    scheduleID: 1,
    sessionDescription:  response?.data?.description,
    sessionTerm: new Date(),
    sessionDuration:  response.data?.sessionDuration,
    timeZone: response.data?.timeZone,
  };
};
