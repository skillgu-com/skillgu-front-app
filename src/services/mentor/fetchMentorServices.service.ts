import {
  Input,
  OutputFailed,
  OutputSuccess,
} from "./fetchMentorServices.types";
import { FiltersSelected, Mentor, Review } from "@customTypes/mentor";
import axios from "axios";

type ResponseData = {
  mentors: Mentor[];
  total: number;
};

export type ServiceMentoring = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  variant: "" | "pro";
  descriptionRows: string[];
};

type FetchMentorReviewsInput = {
  mentorId: string;
  take: number;
  skip: number;
};

type FetchMentorReviewsData = {
  total: number;
  avgRate: number;
  reviews: Review[];
};

export interface DescriptionRowDTO {
  description: string;
}

export interface MentorshipPlanDTO {
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

export interface MentorshipDTO {
  mentorships: MentorshipPlanDTO[];
}

export const fetchMentorShip = async (
  input: Input
): Promise<OutputSuccess | OutputFailed> => {
  try {
    const resp = await fetch("/mentor-services.json");
    const respData = await resp.json();
    return {
      success: true,
      session: respData.session,
      mentoring: respData.mentoring,
    };
  } catch (e) {
    return { success: false, error: "Error" };
  }
};
export const getMentorshipPlansForMentorProfile = async (mentorId: {
  mentorId: string;
}): Promise<MentorshipDTO> => {
  try {
    const response = await axios.get<any>(
      `/api/mentorship/mentors/${mentorId.mentorId}/mentorship-plans`
    );
    const mentoringData = response.data;

    const translateTitle = (title: string) => {
      switch (title.toLowerCase()) {
        case "basic":
          return "Plan podstawowy";
        case "advanced":
          return "Plan zaawansowany";
        case "pro":
          return "Plan pro";
        default:
          return title;
      }
    };
    const mentorships: MentorshipPlanDTO[] = [];

    if (mentoringData.basic) {
      mentorships.push({
        id: mentoringData.basic.mentorshipId.toString(),
        title: translateTitle(mentoringData.basic.planType),
        subtitle: mentoringData.basic.description,
        price: mentoringData.basic.price,
        variant: mentoringData.basic.planType,
        descriptionRows: mentoringData.basic.planIncludes.map((item: any) => ({
          description: item,
        })),
        sessionsPerMonth: mentoringData.basic.sessionsPerMonth,
        sessionDurationMinutes: mentoringData.basic.sessionDuration,
        responseTimeHours: mentoringData.basic.responseTime,
        providesMaterials: mentoringData.providesMaterials,
        mentoringDescription: mentoringData.basic.description,
        scheduleId: mentoringData.basic.scheduleId,
      });
    }

    if (mentoringData.advanced) {
      mentorships.push({
        id: mentoringData.advanced.mentorshipId.toString(),
        title: translateTitle(mentoringData.advanced.planType),
        subtitle: mentoringData.advanced.description,
        price: mentoringData.advanced.price,
        variant: mentoringData.advanced.planType,
        descriptionRows: mentoringData.advanced.planIncludes.map(
          (item: any) => ({
            description: item,
          })
        ),
        sessionsPerMonth: mentoringData.advanced.sessionsPerMonth,
        sessionDurationMinutes: mentoringData.advanced.sessionDuration,
        responseTimeHours: mentoringData.advanced.responseTime,
        providesMaterials: mentoringData.providesMaterials,
        mentoringDescription: mentoringData.advanced.description,
        scheduleId: mentoringData.advanced.scheduleId,
      });
    }

    if (mentoringData.pro) {
      mentorships.push({
        id: mentoringData.pro.mentorshipId.toString(),
        title: translateTitle(mentoringData.pro.planType),
        subtitle: mentoringData.pro.description,
        price: mentoringData.pro.price,
        variant: mentoringData.pro.planType,
        descriptionRows: mentoringData.pro.planIncludes.map((item: any) => ({
          description: item,
        })),
        sessionsPerMonth: mentoringData.pro.sessionsPerMonth,
        sessionDurationMinutes: mentoringData.pro.sessionDuration,
        responseTimeHours: mentoringData.pro.responseTime,
        providesMaterials: mentoringData.providesMaterials,
        mentoringDescription: mentoringData.pro.description,
        scheduleId: mentoringData.pro.scheduleId,
      });
    }

    return { mentorships };
  } catch (error) {
    console.error("Error fetching mentorship plans", error);
    throw error;
  }
};

export const fetchMentorFilteredList = async (
  take: number,
  skip: number,
  filters?: FiltersSelected
): Promise<ResponseData> => {
  try {
    const filterMentorToSend = {
      take: 10,
      skip: 10,

      // take: take.toString(),
      // skip: skip.toString(),
      filters: filters || null,
    };

    const response = await axios.post(
      "/api/mentor/filtered-mentors",
      filterMentorToSend
    );
    const { total, mentors } = response.data;
    const filteredMentors = mentors.slice(skip, skip + take);

    return { total, mentors: filteredMentors };
  } catch (error) {
    console.error("Error fetching mentors:", error);
    throw error;
  }
};

export const fetchMentorReviews = async ({
  username,
  take = 10,
  skip = 0,
}: {
  username: string | null;
  take?: number;
  skip?: number;
}): Promise<FetchMentorReviewsData> => {
  if (!username) {
    throw new Error("Username is required to fetch reviews.");
  }

  try {
    const response = await fetch(
      `http://localhost:8081/api/review/mentor/${username}?take=${take}&skip=${skip}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching mentor reviews: ${response.statusText}`);
    }

    const responseData = await response.json();
    const { total, reviews, avgRate } = responseData;
    return { total, reviews, avgRate };
  } catch (error) {
    console.error("Error fetching mentor reviews:", error);
    throw error;
  }
};

export const getMentorProfileByID = async (userId: number | string) => {
  const { data } = await axios.get(
    `/api/mentor/get-mentor-by-user-id/${userId}`
  );
  return data;
};

export const getMentorProfileByMentorId = async (mentorID: number | string) => {
  const { data } = await axios.get(
    `/api/mentor/get-mentor-by-mentor-id/${mentorID}`
  );
  return data;
};

export const getMentorProfileByIDKeyGenerator = (mentorID: number | string) => {
  return ["Get mentor profile by mentor ID", `${mentorID}`];
};

export const getMentorByUsername = async (username: string) => {
  return await axios.get(
    `/api/mentor/get-mentor-by-mentor-username/${username}`
  );
};