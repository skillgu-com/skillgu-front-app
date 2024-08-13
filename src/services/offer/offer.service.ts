import {ServiceMentoring, SubscriptionPlan} from "@customTypes/order";
import axios from "axios";

export type OfferStatus = 'in-progress' | 'rejected' | 'accepted' | 'awaiting' | '';

type Plan = {
    id: number
    price: number
    sessionDuration: number
    responseTime: number
    sessionsPerMonth: number
    planIncludes: string[]
    subscriptionVariant: SubscriptionPlan;
}

export type OfferDetails = {
    status: OfferStatus
    rejectionFeedback: string
    service: ServiceMentoring;
    userFullName: string;
    userAvatarUrl: string;
    mainGoals: string[];
    timezone: string;
    location: string;
    aboutStudent: string;
    questionForMentor: string;
};

type Output = {
    offer: OfferDetails
    plan: Plan
}

export const fetchOfferDetails = async (
    offerId: number
): Promise<Output> => {

    const res = await axios.get(`/api/mentorship/fetch-offer/${offerId}`);
    const media = res.data.data;

    return {
        offer: {
            status: 'awaiting',
            rejectionFeedback: '',
            service: {
                id: "1",
                title: "Plan pro",
                subtitle: "",
                price: 30000,
                variant: "pro",
                descriptionRows: [
                    media?.offer?.descriptionRows
                ],
            },
            userFullName: media?.offer?.userFullName,
            userAvatarUrl: media?.offer?.userAvatarUrl,
            mainGoals: [media?.offer.mainGoals,],
            timezone: media?.offer?.timezone,
            location: media?.offer?.location,
            aboutStudent:media?.offer?.aboutStudent,
            questionForMentor: media?.offer?.questionForMentor,
        },
        plan: {
            id: media?.plan.id,
            price: media?.plan.price,
            sessionDuration: media?.plan?.sessionDuration,
            responseTime: media?.plan?.responseTime,
            sessionsPerMonth: media?.plan?.sessionDuration,
            planIncludes: media?.plan?.planIncludes,
            subscriptionVariant: media?.plan?.subscriptionVariant,
        },
    };
};
//     return {
//         offer: {
//             status: media.offer.status,
//             rejectionFeedback: media.offer.rejectionFeedback,
//             service: {
//                 id: media.offer.service.id,
//                 title: media.offer.service.title,
//                 subtitle: media.offer.service.subtitle,
//                 price: media.offer.service.price,
//                 variant: media.offer.service.variant,
//                 descriptionRows: media.offer.service.descriptionRows,
//             },
//             userFullName: media.offer.userFullName,
//             userAvatarUrl: media.offer.userAvatarUrl,
//             mainGoals: media.offer.mainGoals,
//             timezone: media.offer.timezone,
//             location: media.offer.location,
//             aboutStudent: media.offer.aboutStudent,
//             questionForMentor: media.offer.questionForMentor,
//         },
//         plan: {
//             id: media.plan.id,
//             price: media.plan.price,
//             sessionDuration: media.plan.sessionDuration,
//             responseTime: media.plan.responseTime,
//             sessionsPerMonth: media.plan.sessionsPerMonth,
//             planIncludes: media.plan.planIncludes,
//             subscriptionVariant: media.plan.subscriptionVariant,
//         },
//     };
// };

export const acceptOffer = async (offerId: number): Promise<void> => {
    console.log(`Zaakceptowałeś ofertę o ID: ${offerId}.`);
};

export const rejectOffer = async (offerId: number): Promise<void> => {
    console.log(`Odrzuciłeś ofertę o ID: ${offerId}.`);
};

export const sendRejectionFeedback = async (
    offerId: number,
    reason: string
): Promise<void> => {
    console.log(
        `Feedback dla oferty o ID: ${offerId}. Powód odrzucenia: ${reason}`
    );
    const res = await axios.post(`/api/mentorship/reject/${offerId}`, reason);
};
