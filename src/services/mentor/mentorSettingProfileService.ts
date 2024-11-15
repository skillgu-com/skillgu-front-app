import axios from "axios";
import {MentorEditLinksFormInput, MentorEditProfileFormInput, MentorPersonalData} from "@customTypes/mentor";

const updateUserPersonalData = async (personalData: MentorPersonalData) => {
    try {
        const formData = new FormData();

        const profilePhoto = personalData.avatarUrl ? personalData.avatarUrl[0] : null;
        const profilePhotoCover = personalData.coverUrl ? personalData.coverUrl[0] : null;

        if (profilePhoto != null) {
            formData.append('profilePhoto', profilePhoto);
        }

        if (profilePhotoCover != null) {
            formData.append('profilePhotoCover', profilePhotoCover);
        }

        formData.append('formData', new Blob([JSON.stringify(personalData)], {
            type: 'application/json'
        }));

        return await axios.patch('/api/user/setting/personal-data', formData);

    } catch (error) {
        console.error(error);
        throw new Error("Failed to update personal data");
    }
};


export const updateUserProfile = async (mentorEditSection: MentorEditProfileFormInput) => {
    try {

        return await axios.patch<string>('/api/user/setting/profile', mentorEditSection);

    } catch (error) {
        console.error(error);
        throw new Error("Failed to update personal data");
    }
};

export const updateUserSocialLinks = async (mentorEditLinksSocial: MentorEditLinksFormInput) => {
    try {

        return await axios.patch<string>('/api/user/setting/social', mentorEditLinksSocial);

    } catch (error) {
        console.error(error);
        throw new Error("Failed to update personal data");
    }
}

export default updateUserPersonalData;