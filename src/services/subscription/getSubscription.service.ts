import {Subscription, SubscriptionDTO} from "@services/subscription/subscription.types";
import {AxiosResponse} from "axios";
import {DescriptionRowDTO} from "@services/mentor/fetchMentorServices.service";


const axiosMock = {
    get: async <T>(url: string): Promise<AxiosResponse<T>> => {
        const returnData: SubscriptionDTO = {
            mentorId: '1',
            mentorshipPlan: {
                id: '1',
                title: 'Testowy mentorszip',
                subtitle: 'Zrobie wszystko co tylko zechcesz',
                price: 100,
                variant: 'classic',
                descriptionRows: [
                    {description: 'Lorem ipsum, ut labore et dolore magna aliqua.'},
                    {description: 'Lorem ipsum dolor.'},
                ],
                sessionsPerMonth: 3,
                sessionDurationMinutes: 60,
                responseTimeHours: 4,
                providesMaterials: true,
                mentoringDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            },
            availableSessionSlots: 1,
        };
        return {data: returnData} as AxiosResponse<T>
    },
}

const getSubscriptionService = async (subscriptionId: string): Promise<Subscription> => {
    // TODO 1. use real API endpoint, 2. use real axios, 3. remove axiosMock
    const {data} = await axiosMock.get<SubscriptionDTO>(`/api/1.0/subscriptions/${subscriptionId}`);

    return data;
}

export const getSubscriptionServiceKeyGenerator = (subscriptionId: string) => ['Get subscription', subscriptionId]

export default getSubscriptionService;