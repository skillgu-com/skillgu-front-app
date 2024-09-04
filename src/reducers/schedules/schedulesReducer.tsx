import { schedulesInitialState } from "./constants";
import {
  type SchedulesAction,
  type SchedulesState,
} from "./types";

export const schedulesReducer = (
  state = schedulesInitialState,
  action: SchedulesAction
): SchedulesState => {
  switch (action.type) {
    case "SCHEDULES_UPDATE_RECORDS":
      return {
        ...state,
        schedules: action.payload.schedules,
        lastUpdate: new Date().getTime(),
      };
    case "SCHEDULES_UPDATE_PENDING":
      return {
        ...state,
        pending: action.payload.pending,
      };
    case "SCHEDULES_UPDATE_STATUS":
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      };
    case "SCHEDULES_RESET":
      return {
        ...schedulesInitialState,
      };
    default:
      return state;
  }
};
