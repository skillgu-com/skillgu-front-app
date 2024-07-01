import { SubscriptionPlan } from "@customTypes/order"
import { SubscriptionStatus } from "@customTypes/subscriptions"

export type FetchStudentMentorsInput = {
    // sortBy: 'status'
    // sortMethod: 'ASC'|'DESC'
    // status: SubscriptionStatus,
    skip: number 
    take: number
}

export type FetchStudentMentorsOutput = {
    total: number
    mentors: {
        id: number
        nickname: string 
        avatarUrl: string
        fullName: string
        status: 'accepted'|'rejected'|'awaiting'
        // date: string
        // status: SubscriptionStatus
        // serviceType: 'session'|'mentoring'
        // serviceName: string
        // isPro: boolean
        // planName: string
        plan: SubscriptionPlan
        scheduled: boolean
    }[]
}
