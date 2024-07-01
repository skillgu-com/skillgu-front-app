import { PER_PAGE, sessionsInitialState } from "./constants";
import {
  type SessionsAction,
  type SessionsState,
} from "./types";

const parsePage = (newPage: number, max: number): number => {
  return Math.max(0, Math.min(newPage, max));
};

export const sessionsReducer = (
  state = sessionsInitialState,
  action: SessionsAction
): SessionsState => {
  switch (action.type) {
    case "UPDATE_PAGE":
      return {
        ...state,
        page: parsePage(action.payload.page, PER_PAGE),
      };
    case "UPDATE_RECORDS":
      return {
        ...state,
        totalRecords: action.payload.totalRecords,
        sessions: action.payload.sessions,
      };
    case "UPDATE_PENDING":
      return {
        ...state,
        pending: action.payload.pending,
      };
    case "UPDATE_STATUS":
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      };
    case "RESET":
      return {
        ...sessionsInitialState,
      };
    default:
      return state;
  }
};
