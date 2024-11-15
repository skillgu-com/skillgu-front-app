import axios from "axios";
import {Subscription, SubscriptionDTO} from "@customTypes/subscription";

const getSubscriptionService = async (mentorshipId: string): Promise<Subscription> => {
    const { data } = await axios.get<SubscriptionDTO>(`/api/subscriptions/${mentorshipId}`);
    return data;
}

export const getSubscriptionServiceKeyGenerator = (subscriptionId: string) => ['Get subscription', subscriptionId]

export default getSubscriptionService;