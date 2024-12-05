import axios from "axios";
import { MentorCategoryT } from "@services/dictionaries/sessionCategoriesDictionary/sessionCategoriesDictionary.data";

export interface SessionFormInput {
  name: string;
  price: number;
  category: MentorCategoryT | "";
  type: string;
  scheduleId: number;
  description: string;
}

export interface SessionDTO {
  sessionName: string;
  sessionPrice: number;
  sessionCategory: MentorCategoryT | "";
  sessionType: string;
  scheduleID: number;
  sessionDescription: string;
}

type Mentor = {
  id: number;
  userName: string;
  avatarUrl: string;
  fullName: string;
  profession: string;
  reviewsAvgRate: number;
  reviewsCount: number;
};

type SingleSession = SessionDTO & {
  sessionTerm?: Date;
  sessionDuration?: number;
  mentor: Mentor;
  userEmail: string;
};
const parseSessionFormDataToSessionDTO = (
  session: SessionFormInput
): SessionDTO => {
  return {
    sessionName: session.name,
    sessionPrice: session.price,
    sessionCategory: session.category,
    sessionType: session.type,
    scheduleID: session.scheduleId,
    sessionDescription: session.description,
  };
};

export const createSession = async (session: SessionFormInput) => {
  return await axios.post(
    "/api/1.0/mentor/sessions",
    parseSessionFormDataToSessionDTO(session)
  );
};

export const editSession = async ({
  sessionId,
  session,
}: {
  sessionId: string;
  session: SessionFormInput;
}) => {
  return await axios.post(
    `/api/1.0/mentor/sessions/${sessionId}`,
    parseSessionFormDataToSessionDTO(session)
  );
};

export const getMentorSessions = async (mentorId: number) => {
  return await axios.get(`/api/1.0/mentor/${mentorId}/sessions`);
};
export const getSessionTypes = async () => {
  // TODO type response tightly and eventually parse it
  return await axios.get<{ id: number; name: string }[]>(
    "/api/1.0/mentor/sessions/types"
  );
};

export const deleteSession = async (sessionId: string) => {
  return await axios.delete(`/api/1.0/mentor/sessions/${sessionId}`);
};

export const getSingleSession = async (
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
  };
};

export const editMentorSingleSession = async (
  sessionId: string,
  updatedData: SessionDTO
) => {
  try {
    const response = await axios.patch(`/api/1.0/mentor/sessions/${sessionId}`, {
      sessionName: updatedData.sessionName,
      sessionPrice: updatedData.sessionPrice,
      sessionCategory: updatedData.sessionCategory,
      sessionType: updatedData.sessionType,
      scheduleID: updatedData.scheduleID,
      sessionDescription: updatedData.sessionDescription,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update session");
  }
};
