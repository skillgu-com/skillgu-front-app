export type Review = {
    id: string;
    rate: number;
    authorName: string;
    createdAt: string;
    comment: string;
};


export type ReviewPropsTypes = {
    rate: number;
    authorName: string;
    createdAt: string;
    comment: string;
    token: string;
};

export type FetchMentorReviewsInput = {
    mentorId: string;
    take: number;
    skip: number;
};

export type FetchMentorReviewsData = {
    total: number;
    avgRate: number;
    reviews: Review[];
};
