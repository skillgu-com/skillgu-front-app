export type FetchMentorSessionsInput = {
    sortBy: 'status'
    sortMethod: 'ASC'|'DESC'
    skip: number 
    take: number
}

export type SessionStatus = 'in-progress'|'planned'|'cancelled'

export type FetchMentorSessionsOutput = {
    total: number
    students: {
        id: number
        nickname: string 
        avatarUrl: string
        fullName: string
        date: string
        status: SessionStatus
        serviceType: 'session'|'mentoring'
        serviceName: string
    }[]
}
