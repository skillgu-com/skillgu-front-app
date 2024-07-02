import { MentorshipOrderInput } from "@customTypes/order";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const sendMentorshipApplication = async (props: MentorshipOrderInput) : Promise<boolean> => {
    await delay(1000);

    return true
}