import {RegisterMenteeDTO} from "./registerMentee.types";
import axios from "axios";
import {MergedRegisterMenteeFormInput, UserConsentDTO} from "@customTypes/registerFlow";

const parseDataForAPI = (inputData: MergedRegisterMenteeFormInput): RegisterMenteeDTO => inputData

const registerMenteeService = async (inputData: MergedRegisterMenteeFormInput) => {
    console.log(inputData)

    try {
        const response = await axios.post<string>('/api/auth/mentee/register', parseDataForAPI(inputData));
        return {success: true, data: response.data}
    } catch (e) {
        return {success: false, error: e}
    }
}

export default registerMenteeService;