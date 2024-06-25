export type FetchStudentMentorsInput = {
    sortBy: 'status'
    sortMethod: 'ASC'|'DESC'
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
        date: string
        status: 'in-progress'|'planned'|'cancelled'
        serviceType: 'session'|'mentoring'
        serviceName: string
    }[]
}
