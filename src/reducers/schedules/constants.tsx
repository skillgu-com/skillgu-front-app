import { SchedulesState } from "./types";

export const schedulesInitialState: SchedulesState = {
  pending: true,
  errorMessage: '',
  schedules: [],
  lastUpdate: 0,
};
