import {PlanDetails} from "src/reducers/mentorship-application/types";
import axios from "axios";

type MentorshipOrder = {
  mentor: Mentor;
  plan: PlanDetails;
  userEmail: string;
  terms: Date[]; // zmienione z Date[] na SlotDateTime[]
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
  // menteeEmail: string;
};

export const getMentorshipOrderSummary = async (
    meetingId: string | number
): Promise<MentorshipOrder> => {

  const response =  await axios.get(`/api/1.0/order/mentoring/${meetingId}`);

  const terms = response.data?.terms.map((item: any) => {
    return new Date(item.startDateTime);
  });

  return {
    userEmail: response?.data?.menteeEmail,
    mentor: {
      avatarUrl: response?.data?.avatarUrl,
      profession: response?.data?.jobPosition,
      id: 1,
      userName: "some",
      fullName: response?.data?.mentorFirstName + ' ' + response?.data?.mentorLastName  ,
      reviewsAvgRate: 4.2,
      reviewsCount: 8,
      // menteeEmail: response?.data?.menteeEmail,
    },
    plan: {
      id: 11,
      plan: response?.data?.planTypeEnum,
      monthlyPrice: response?.data?.sessionPrice,
      sessionsPerMonth: 3,
      sessionDuration: response?.data?.sessionDurationMinutes,
      responseTime: response?.data?.responseTimeHours,
      included: response?.data?.descriptionRows || [],
    },
    terms,
    timeZone: response?.data?.timeZone,
  };
};