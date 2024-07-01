import { MentorDetails, PlanDetails } from "src/reducers/mentorship-application/types"

type Output = {
    mentor: MentorDetails
    plan: PlanDetails
    availableGoals: string[]
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getMentorshipDetails = async (mentorshipId: number) : Promise<Output> => {
    await delay(1000);

    return {
        mentor: {
            id: 1,
            fullName: 'Anna Stokrotka',
            avatarUrl: '/images/img_avatar.png',
            rate: 4,
            profession: 'UX/UI Designer',
            company: 'Google',
        },
        plan: {
            id: 2,
            plan: 'pro',
            monthlyPrice: 30000,
            included: [
                '4 sesje mentoringowe na miesiąc (60 minut każda)',
                'Nieograniczony dostęp do pytań i odpowiedzi',
                'Odpowiedzi na Twoje pytania w ciągu 24h',
                'Bezpośrednie wsparcie praktyczne w realizacji Twoich projektów',
            ],
        },
        availableGoals: [
            'Jestem studentem i szukam pomocy w nauce',
            'Właśnie ukończyłem studia i potrzebuję pomocy w rozpoczęciu kariery',
            'Chcę zmienić zawód lub znaleźć nową pracę',
            'Chcę rozbudować lub poszerzyć moje umiejętności',
            'Potrzebuję mentorstwa do osobistego projektu',
            'Potrzebuję mentorstwa dla mojego biznesu/produktu',
            'Chcę się przebranżowić',
            'Potrzebuje porady eksperckiej która wykracza poza jedno spotkanie w celu rozwiązania problemów',
            'Chce regularnie pracować z tym ekspertem żeby podnieść swoje kompetencje',
            'Chce nabyć nowych kompetencji zawodowych',
            'Nie chcę ujawniać',
            'Coś innego',
        ],
    }
}