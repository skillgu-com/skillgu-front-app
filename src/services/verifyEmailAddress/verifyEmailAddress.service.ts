import {VerifyEmailAddressDTO} from "./verifyEmailAddress.types";
import axios from "axios";
import {VerificationFormInput} from "@customTypes/registerFlow";

const parseDataForAPI = (inputData: VerificationFormInput, userId: string): VerifyEmailAddressDTO => {
    return { userId, code: Object.values(inputData).join('')};
}

// TODO consider common error handler for services
const verifyEmailAddressService = async (inputData: VerificationFormInput, userId: string) => {
    try {
        const response = await axios.post('EP/here', parseDataForAPI(inputData, userId));
        return { success: true, data: response.data }
    } catch (e) {
        return { success: false, error: e }
    }
}

export default verifyEmailAddressService;
