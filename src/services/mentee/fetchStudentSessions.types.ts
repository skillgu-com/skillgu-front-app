export type FetchStudentSessionsInput = {
    sortBy: 'status'
    sortMethod: 'ASC'|'DESC'
    skip: number 
    take: number
}

export type FetchStudentSessionsOutput = {
    total: number
    mentors: {
        id: number
        userName: string
        avatarUrl: string
        fullName: string
        date: string
        status: 'in-progress'|'planned'|'cancelled'|'completed'
        serviceType: 'session'|'mentoring'
        serviceName: string,
        planType :string
    }[]
}
