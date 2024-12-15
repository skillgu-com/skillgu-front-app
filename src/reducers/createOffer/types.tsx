export type PlanInput = {
  schedule: string;
  price: number | string;
  description: string;
  sessionsPerMonth: number | string;
  sessionDuration: number;
  responseTime: number;
  // additional: string[];
  planIncludes: string[];
  planType: "basic" | "advanced" | "pro";
  mentorshipId: number;
};

export type ScheduleOption = {
    label: string;
    value: number;
    meetTime: number;
    participant: number;
};

export type CreateOfferStepType = "initial" | "determine" | "build" | "summary";

export type Data = {
    saved: boolean;
    numberOfPlans: 1 | 2 | 3;
    providesMaterials: boolean;
    basic: PlanInput|null;
    advanced?: PlanInput|null;
    pro?: PlanInput|null;
}

export type CreateOfferState = {
    fetchedInitial: boolean;
    step: CreateOfferStepType;
    availableSchedules: ScheduleOption[];
    numberOfPlans: 1 | 2 | 3;
    providesMaterials: boolean;
    basic: PlanInput|null;
    advanced: PlanInput|null;
    pro: PlanInput|null;
    pending: boolean;
    errorMessage: string;
    success: boolean;
    saved: boolean;
};

export type CreateOfferActionType =
    | "LOGOUT"
    | "LOGIN"
    | "UPDATE_PENDING"
    | "PREV_STEP"
    | "SUBMIT_INITIAL"
    | "LOAD_SCHEDULES"
    | "SUBMIT_DETERMINE"
    | "SUBMIT_BUILD"
    | "LOAD_OFFERS"
    | "UPDATE_STATUS"
    | "RESET";

export type CreateOfferAction =
    | {
    type: "LOAD_OFFERS";
    payload: {
        numberOfPlans: 1 | 2 | 3;
        providesMaterials: boolean;
        basic: PlanInput;
        advanced?: PlanInput;
        pro?: PlanInput;
        saved: boolean;
    };
}
    | { type: "PREV_STEP" }
    | { type: "SUBMIT_INITIAL" }
    | {
    type: "LOAD_SCHEDULES";
    payload: {
        availableSchedules: ScheduleOption[];
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
        basic: PlanInput;
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
}
    | {
    type: "LOGIN";
}
    | {
    type: "LOGOUT";
};
