import { schedulesInitialState } from "./constants";
import { useDispatch, useSelector } from "react-redux";
import { SchedulesState } from "./types";
import { useCallback, useEffect } from "react";
import { ScheduleType } from "@customTypes/schedule";
import { deleteSchedule, fetchAllSchedules } from "@services/scheduleService";

type Output = {
  schedulesState: SchedulesState;
  updateRecords: (schedules: ScheduleType[]) => void;
  updateStatus: (errorMessage: string) => void;
  setPending: (pending: boolean) => void;
  reset: () => void;
};

export const useSchedulesReducer = (): Output => {
  const schedulesState: SchedulesState = useSelector((state) => {
    if (state && typeof state === "object" && "schedules" in state) {
      return state?.schedules as SchedulesState;
    }
    return schedulesInitialState;
  });
  
  const dispatch = useDispatch();

  const updateRecords = useCallback(
    (schedules: ScheduleType[]) => dispatch({
      type: "SCHEDULES_UPDATE_RECORDS",
      payload: {
        schedules,
      },
    }),
    [dispatch]
  );

  useEffect(() => {
    if(schedulesState.lastUpdate !== 0){
      return
    }
    fetchAllSchedules().then((res) => {
      if (res.data) {
        const schedules : ScheduleType[] = res.data.map((elementFromAPI) => ({
            id: elementFromAPI.id,
            scheduleName: elementFromAPI.scheduleName,
            meetTime: elementFromAPI.meetTime,
            participant: elementFromAPI.participant,
            assignedSession: elementFromAPI.assignedSession,
            type: elementFromAPI.type,
            scheduleEndDay: elementFromAPI.scheduleEndDay,
            scheduleStartDay: elementFromAPI.scheduleStartDay,
        }))
        updateRecords(schedules as ScheduleType[]);
      }
    })
  }, [updateRecords, schedulesState.lastUpdate])

  const setPending = useCallback(
    (pending: boolean) =>
      dispatch({
        type: "SCHEDULES_UPDATE_PENDING",
        payload: {
          pending,
        },
      }),
    [dispatch]
  );

  const updateStatus = useCallback(
    (errorMessage: string) =>
      dispatch({
        type: "SCHEDULES_UPDATE_STATUS",
        payload: {
          errorMessage: errorMessage || undefined,
        },
      }),
    [dispatch]
  );

  const reset = useCallback(
    () =>
      dispatch({
        type: "SCHEDULES_RESET",
      }),
    [dispatch]
  );

  return {
    schedulesState,
    updateRecords,
    setPending,
    updateStatus,
    reset,
  };
};
