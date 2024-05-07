import {RegisterMenteeDTO} from "./registerMentee.types";
import axios from "axios";
import {MergedRegisterMenteeFormInput} from "@customTypes/registerFlow";

const parseDataForAPI = (inputData: MergedRegisterMenteeFormInput): RegisterMenteeDTO => inputData

// TODO consider common error handler for services
const registerMenteeService = async (inputData: MergedRegisterMenteeFormInput) => {
    try {
        // TODO MENTEE
        const response = await axios.post<{ userId: '123' }>('/api/auth/mentee/register', parseDataForAPI(inputData));

        return {success: true, data: response.data}
    } catch (e) {
        return {success: false, error: e}
    }
}

export default registerMenteeService;