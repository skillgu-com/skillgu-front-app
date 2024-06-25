export type FetchRecommendedMentorsInput = {
    take: number
}

export type FetchRecommendedMentorsOutput = {
    mentors: {
        id: number
        nickname: string 
        avatarUrl: string
        fullName: string
        profession: string
        tags: string[]
    }[]
}
