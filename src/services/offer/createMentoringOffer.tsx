import {PlanInput} from "@customTypes/create-mentoring";
import axios from "axios";

type Response = { success: true } | { success: false, errorMessage: string };

type Input = {
    numberOfPlans: 1 | 2 | 3;
    providesMaterials: boolean;
    basic: PlanInput | undefined | null;
    advanced?: PlanInput | undefined | null;
    pro?: PlanInput | undefined | null;
}

export const createMentoringOffer = async (input: Input): Promise<Response> => {
    const plans = {
        basic: input.basic,
        advanced: input.advanced,
        pro: input.pro,
    }

    const body = {
        numberOfPlans: input.numberOfPlans,
        providesMaterials: input.providesMaterials,
        plans,
    };

    try {
        const response = await axios.put('/api/mentorship/create/mentorship-plans', body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            return {success: true};
        } else {
            return {success: false, errorMessage: `Failed to create mentorship plan. Status code: ${response.status}`};
        }
    } catch (error) {
        console.error('Failed to create mentorship plan', error);
        return {success: false, errorMessage: 'Failed to create mentorship plan'};
    }
};