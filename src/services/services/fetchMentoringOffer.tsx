import {PlanInput} from "@customTypes/create-mentoring";
import axios from "axios";
import {MentorshipPlanDTO} from "@services/mentor/fetchMentorServices.service";

type OutputData = {
    numberOfPlans: 1 | 2 | 3;
    providesMaterials: boolean;
    basic: PlanInput;
    advanced?: PlanInput;
    pro?: PlanInput;
    saved: boolean
}

type Response = { data: OutputData, success: true } | { success: false, errorMessage: string };

export const fetchMentoringOffer = async (mentorId: any): Promise<Response> => {
    console.log('a tutaj moze cos posprawdzam !!! ')
    try {
        const response = await axios.post(`/api/mentorship/${mentorId}/edit/mentorship-plans`);

        if (response.status === 201) {
            const mentoringData = response.data;
            return {
                success: true,
                data: {
                    numberOfPlans: mentoringData.numberOfPlans,
                    providesMaterials: mentoringData.providesMaterials,
                    saved: mentoringData.saved,
                    basic: {
                        schedule: mentoringData.basic.schedule,
                        price: mentoringData.basic.price,
                        description: mentoringData.basic.description,
                        sessionsPerMonth: mentoringData.basic.sessionsPerMonth,
                        sessionDuration: mentoringData.basic.sessionDuration,
                        responseTime: mentoringData.basic.responseTime,
                        planIncludes: mentoringData.basic.planIncludes,
                        planType: mentoringData.basic.planType,
                    },
                    advanced: {
                        schedule: mentoringData.advanced.schedule,
                        price: mentoringData.advanced.price,
                        description: mentoringData.advanced.description,
                        sessionsPerMonth: mentoringData.advanced.sessionsPerMonth,
                        sessionDuration: mentoringData.advanced.sessionDuration,
                        responseTime: mentoringData.advanced.responseTime,
                        planIncludes: mentoringData.advanced.planIncludes,
                        planType: mentoringData.advanced.planType,
                    },
                    pro: {
                        schedule: mentoringData.pro.schedule,
                        price: mentoringData.pro.price,
                        description: mentoringData.pro.description,
                        sessionsPerMonth: mentoringData.pro.sessionsPerMonth,
                        sessionDuration: mentoringData.pro.sessionDuration,
                        responseTime: mentoringData.pro.responseTime,
                        planIncludes: mentoringData.pro.planIncludes,
                        planType: mentoringData.pro.planType,
                    },
                }
            };
        } else {
            return {
                success: false,
                errorMessage: `Nie udało się utworzyć planu mentoringowego. Kod statusu: ${response.status}`
            };
        }
    } catch (error) {
        console.error('Nie udało się utworzyć planu mentoringowego', error);
        return {success: false, errorMessage: 'Nie udało się utworzyć planu mentoringowego'};
    }
};