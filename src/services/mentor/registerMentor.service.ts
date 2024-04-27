import {RegisterMentorDTO} from "./registerMentor.types";
import axios from "axios";
import {MergedRegisterFormInput, RegisterMentorResponse} from "@customTypes/mentorRegister";

const parseDataForAPI = (inputData: MergedRegisterFormInput): RegisterMentorDTO => {
    return {
        ...inputData,
        personalWebsite: inputData.personalWebsite || null,
        linkedin: inputData.linkedin || null,
        twitter: inputData.twitter || null,
        github: inputData.github || null,
        dribble: inputData.dribble || null,
        behance: inputData.behance || null,
    };
}

// TODO consider common error handler for services
const registerMentorService = async (inputData: MergedRegisterFormInput) => {
    try {
        const response = await axios.post<string>('/api/auth/mentor/register', parseDataForAPI(inputData));
        return {success: true, data: response.data}
    } catch (e) {
        return {success: false, error: e}
    }
}


export default registerMentorService;