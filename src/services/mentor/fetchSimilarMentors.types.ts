export type FetchSimilarMentorsInput = {
    take: number
}

export type FetchSimilarMentorsOutput = {
    mentors: {
        id: number
        nickname: string 
        avatarUrl: string
        fullName: string
        profession: string
        tags: string[]
    }[]
}
