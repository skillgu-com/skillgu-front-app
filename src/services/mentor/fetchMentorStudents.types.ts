import { SubscriptionStatus } from "@customTypes/subscriptions"

export type FetchMentorStudentsInput = {
    status: SubscriptionStatus,
    sortBy: 'status'
    sortMethod: 'ASC'|'DESC'
    skip: number 
    take: number
}

export type FetchMentorStudentsOutput = {
    total: number
    students: {
        id: number
        nickname: string 
        avatarUrl: string
        fullName: string
        date: string
        status: SubscriptionStatus
        // status: 'in-progress'|'planned'|'cancelled'
        serviceType: 'session'|'mentoring'
        serviceName: string
        isPro: boolean
    }[]
}
