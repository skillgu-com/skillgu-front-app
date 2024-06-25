export type FetchMentorStudentsInput = {
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
        status: 'in-progress'|'planned'|'cancelled'
        serviceType: 'session'|'mentoring'
        serviceName: string
    }[]
}
