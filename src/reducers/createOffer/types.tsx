import { PlanInput } from "@customTypes/create-mentoring";

export type CreateOfferStepType = "initial" | "determine" | "build" | "summary";

export type CreateOfferState = {
  fetchedInitial: boolean
  step: CreateOfferStepType;
  availableSchedules: string[];
  numberOfPlans: 1 | 2 | 3;
  providesMaterials: boolean;
  base: PlanInput;
  advanced: PlanInput;
  pro: PlanInput;
  pending: boolean;
  errorMessage: string;
  success: boolean;
};

export type CreateOfferActionType =
  | "UPDATE_PENDING"
  | "PREV_STEP"
  | "SUBMIT_INITIAL"
  | "LOAD_SCHEDULES"
  | "SUBMIT_DETERMINE"
  | "SUBMIT_BUILD"
  | "UPDATE_STATUS"
  | "RESET";

export type CreateOfferAction =
  | { type: "PREV_STEP" }
  | { type: "SUBMIT_INITIAL" }
  | {
      type: "LOAD_SCHEDULES";
      payload: {
        availableSchedules: string[];
      };
    }
  | {
      type: "SUBMIT_DETERMINE";
      payload: {
        numberOfPlans: 1 | 2 | 3;
        nextStep: boolean;
      };
    }
  | {
      type: "SUBMIT_BUILD";
      payload: {
        providesMaterials: boolean;
        base: PlanInput;
        advanced?: PlanInput;
        pro?: PlanInput;
        nextStep: boolean;
      };
    }
  | {
      type: "UPDATE_PENDING";
      payload: { pending: boolean };
    }
  | {
      type: "UPDATE_STATUS";
      payload: { errorMessage: string; success: boolean };
    }
  | {
      type: "RESET";
    };
