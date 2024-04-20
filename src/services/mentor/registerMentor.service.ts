import {MergedRegisterFormInput, RegisterMentorDTO} from "./registerMentor.types";
import axios from "axios";

const parseDataForAPI = (inputData: MergedRegisterFormInput): RegisterMentorDTO => {
    return inputData;
}

// TODO consider common error handler for services
const registerMentorService = (inputData: MergedRegisterFormInput) => {
    return axios.post('EP/here', parseDataForAPI(inputData));
}

export default registerMentorService;