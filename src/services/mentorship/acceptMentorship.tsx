import axios from "axios";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const acceptMentorship = async (offerId: number) : Promise<boolean> => {
    await delay(1000);

    const res = await axios.get(`/api/mentorship/accept-mentorship/${offerId}`);

    return true
}
