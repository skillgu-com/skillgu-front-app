import {PlanInput} from "@customTypes/create-mentoring";
import axios from "axios";

type Response = { success: true } | { success: false, errorMessage: string }

type Input = {
    numberOfPlans: 1 | 2 | 3;
    providesMaterials: boolean;
    base: PlanInput;
    advanced?: PlanInput;
    pro?: PlanInput;
}
export const createMentoringOffer = async (input: Input): Promise<Response> => {
        const response = await axios.post('/api/mentorship/create/mentorship-plans', input);
        return {success: true};

    }
        //     if (response.status === 201) {
        //         return {success: true};
        //     } else {
        //         return {success: false, errorMessage: 'Unexpected response status'};
        //     }
        // } catch (error: any) {
        //     console.error('Failed to create mentorship plan', error);
        //     return {success: false, errorMessage: error.message};
        // }
//         return {
//             success: true
//         }
//     }
//     }



