import { SessionStatus } from "@services/mentor/fetchMentorSessions.types";

export type SessionRowType = {
  id: number,
  nickname: string,
  avatarUrl: string,
  fullName: string,
  date: string,
  status: SessionStatus,
  serviceType: string,
  serviceName: string,
};

export type SessionsState = {
  pending: boolean;
  errorMessage: string;
  page: number;
  totalRecords: number;
  sessions: SessionRowType[];
};

export type SessionsActionType =
  | "UPDATE_PENDING"
  | "UPDATE_STATUS"
  | "UPDATE_PAGE"
  | "UPDATE_RECORDS"
  | "RESET";

export type SessionsAction =
  | {
      type: "UPDATE_PAGE";
      payload: {
        page: number;
      };
    }
  | {
      type: "UPDATE_RECORDS";
      payload: {
        totalRecords: number;
        sessions: SessionRowType[];
      };
    }
  | {
      type: "UPDATE_PENDING";
      payload: { pending: boolean };
    }
  | {
      type: "UPDATE_STATUS";
      payload: { errorMessage: string };
    }
  | {
      type: "RESET";
    };
