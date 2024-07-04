import { SubscriptionPlan } from "@customTypes/order"

export const defaultPlanValues = {
    description: "",
    price: 159,
    sessionDuration: 45,
    responseTime: 48,
    sessionsPerMonth: 3,
    planIncludes: [
        "Bezpośrednie wsparcie praktyczne w realizacji Twoich projektów",
        "Nieograniczony dostęp do pytań i odpowiedzi",
    ],
}

export const getDefaultPlanValues = (plan?: SubscriptionPlan) => {
    const defaultValues = {
        ...defaultPlanValues
    }
    if(plan === 'advanced'){
        defaultValues.price = 189
        defaultValues.responseTime = 48
        defaultValues.sessionDuration = 60
        defaultValues.sessionsPerMonth = 3
    }
    if(plan === 'pro'){
        defaultValues.price = 300
        defaultValues.responseTime = 24
        defaultValues.sessionDuration = 60
        defaultValues.sessionsPerMonth = 4
    }
    return {...defaultValues};
}

