import { createOfferInitialState } from "./constants";
import { useDispatch, useSelector } from "react-redux";
import { CreateOfferState } from "./types";
import { useCallback } from "react";
import { PlanInput } from "@customTypes/create-mentoring";

type ScheduleOption = {
  value: number
  label: string
}

type Output = {
  createOfferState: CreateOfferState;
  loadSchedules: (schedules: ScheduleOption[]) => void;
  submitInitial: () => void;
  submitDetermine: (numberOfPlans: 1 | 2 | 3, nextStep: boolean) => void;
  submitBuild: (props: {
    providesMaterials: boolean;
    base: PlanInput;
    advanced?: PlanInput;
    pro?: PlanInput;
  }, nextStep: boolean) => void;
  updateStatus: (state: {
    errorMessage: string;
    success: boolean;
  }) => void;
  setPending: (pending: boolean) => void;
  reset: () => void;
  prevStep: () => void;
};

export const useCreateOfferReducer = (): Output => {
  const createOfferState: CreateOfferState = useSelector((state) => {
    if (state && typeof state === "object" && "createOffer" in state) {
      return state?.createOffer as CreateOfferState;
    }
    return createOfferInitialState;
  });
  const dispatch = useDispatch();

  const loadSchedules = useCallback(
    (availableSchedules: ScheduleOption[]) =>
      dispatch({
        type: "LOAD_SCHEDULES",
        payload: {
          availableSchedules,
        },
      }),
    [dispatch]
  );

  const submitInitial = useCallback(
    () =>
      dispatch({
        type: "SUBMIT_INITIAL",
      }),
    [dispatch]
  );

  const submitDetermine = useCallback(
    (numberOfPlans: 1 | 2 | 3, nextStep: boolean) =>
      dispatch({
        type: "SUBMIT_DETERMINE",
        payload: {
          numberOfPlans,
          nextStep,
        },
      }),
    [dispatch]
  );

  const submitBuild = useCallback(
    (props: {
      providesMaterials: boolean;
      base: PlanInput;
      advanced?: PlanInput;
      pro?: PlanInput;
    }, nextStep: boolean) =>
      dispatch({
        type: "SUBMIT_BUILD",
        payload: {
          providesMaterials: props.providesMaterials,
          base: props.base,
          advanced: props.advanced || undefined,
          pro: props.pro || undefined,
          nextStep,
        },
      }),
    [dispatch]
  );

  const setPending = useCallback(
    (pending: boolean) =>
      dispatch({
        type: "UPDATE_PENDING",
        payload: {
          pending,
        },
      }),
    [dispatch]
  );
  
  const updateStatus = useCallback(
    (state: { errorMessage?: string; success?: boolean }) =>
        dispatch({
          type: "UPDATE_STATUS",
          payload: {
            errorMessage: state.errorMessage || undefined,
            success: state.success || undefined,
          },
        }),
    [dispatch]
  );

  const reset = useCallback(
    () =>
      dispatch({
        type: "RESET",
      }),
    [dispatch]
  );

  const prevStep = useCallback(
    () =>
      dispatch({
        type: "PREV_STEP",
      }),
    [dispatch]
  );

  return {
    createOfferState,
    prevStep,
    loadSchedules,
    submitInitial,
    submitDetermine,
    submitBuild,
    setPending,
    updateStatus,
    reset,
  };
};
