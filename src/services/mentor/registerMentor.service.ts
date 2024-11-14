import axios from "axios";
import {MergedRegisterMentorFormInput} from "@customTypes/registerFlow";

const registerMentorService = async (inputData: MergedRegisterMentorFormInput) => {
    try {
        const formData = new FormData();

        const profilePhoto = inputData.profilePhoto ? inputData.profilePhoto[0] : null;

        formData.append('profilePhoto', profilePhoto || new Blob());
        formData.append('formData', new Blob([JSON.stringify(inputData)], {
            type: 'application/json'
        }));

        const response = await axios.post<string>('/api/auth/mentor/register', formData);

        return { success: true, data: response.data };
    } catch (e) {
        return { success: false, error: e };
    }
};

export default registerMentorService;