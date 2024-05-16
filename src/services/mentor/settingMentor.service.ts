import axios from "axios";

type MentorPersonalData = {
    firstname: string;
    surname: string;
    avatarUrl: File[];
    coverUrl: File[];
};

const updatePersonalData = async (personalData: MentorPersonalData) => {

    try {
        const response = await axios.patch<string>('/api/user/setting/personal-data', personalData);
        return {success: true, data: response.data}
    } catch (e) {
        return {success: false, error: e}
    }
}


export default updatePersonalData;