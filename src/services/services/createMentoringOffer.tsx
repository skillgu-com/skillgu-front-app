import { PlanInput } from "@customTypes/create-mentoring";

type Response = { success: true } | { success: false, errorMessage: string }

type Input = {
    numberOfPlans: 1 | 2 | 3;
    providesMaterials: boolean;
    base: PlanInput;
    advanced?: PlanInput;
    pro?: PlanInput;
}

export const createMentoringOffer = async (input: Input) : Promise<Response> => {
    return { 
        success: true,
    }
}
