import axios from "axios";
import {MentorshipOrderInput} from "@customTypes/mentorship";


const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const sendMentorshipApplication = async (props: MentorshipOrderInput): Promise<boolean> => {
    await delay(1000);
    await axios.post('/api/mentorship/mentorship-request', props);
    return true
}