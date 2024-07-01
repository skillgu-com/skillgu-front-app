type Props = {
    planId: number
    selectedGoals: string[];
    timezone: string;
    location: string;
    description: string;
    questions: string;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const sendMentorshipApplication = async (props: Props) : Promise<boolean> => {
    await delay(1000);

    return true
}