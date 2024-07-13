import {MentorDetails, PlanDetails} from "src/reducers/mentorship-application/types"
import axios from "axios";

type Output = {
    mentor: MentorDetails
    plan: PlanDetails
    availableGoals: string[]
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getMentorshipDetails = async (mentorshipId: number): Promise<Output> => {
    await delay(1000);

    const response = await axios.get(`/api/mentorship/get-selected-mentorship-by/${mentorshipId}`);
    const mentor = await axios.get(`/api/mentorship/get-selected-mentor-by-mentorshipId/${mentorshipId}`);

    console.log('pizda kolanow', mentor)
    return {
        mentor: {
            id: 1,
            fullName: mentor.data.data.fullName,
            avatarUrl: mentor.data.data.avatarUrl,
            rate: 4,
            profession: mentor.data.data.profession,
            company: mentor.data.data.company,
        },
        plan: {
            id: response.data.data.id,
            plan: response.data.title,
            monthlyPrice: response.data.data.price,
            included: (response.data.data.descriptionRows || []).map((element: any) => {
                return element.description;
            })
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
            'Coś innego',
            'Coś innego',
            'Coś innego',
        ],
    }
}