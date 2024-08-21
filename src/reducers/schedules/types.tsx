import { ScheduleType } from "@customTypes/schedule";

export type SchedulesState = {
  pending: boolean;
  errorMessage: string;
  schedules: ScheduleType[];
  lastUpdate: number
};

export type SchedulesActionType =
  | "SCHEDULES_UPDATE_PENDING"
  | "SCHEDULES_UPDATE_STATUS"
  | "SCHEDULES_UPDATE_RECORDS"
  | "SCHEDULES_RESET";

export type SchedulesAction =
  | {
      type: "SCHEDULES_UPDATE_RECORDS";
      payload: {
        schedules: ScheduleType[];
      };
    }
  | {
      type: "SCHEDULES_UPDATE_PENDING";
      payload: { pending: boolean };
    }
  | {
      type: "SCHEDULES_UPDATE_STATUS";
      payload: { errorMessage: string };
    }
  | {
      type: "SCHEDULES_RESET";
    };
