import axios from "axios";
import {SpecialVariant} from "@customTypes/mentor";

type MentorPersonalData = {
    firstName: string;
    surname: string;
    avatarUrl: File[];
    coverUrl: File[];
};

export interface MentorData {
    avatar_url: string;
    description: string;
    id: string;
    firstName: string;
    lastName: string;
    price: number;
    location: string;
    profession: string;
    reviewsAvgRate: number;
    reviewsCount: number;
    special: string;
    title: string;
    intro: string;
    jobPosition: string;
    profileImage: string;

    specialVariant: SpecialVariant;
    services: {
        id: number;
        name: string;
    }[];
    skill: {
        id: number;
        name: string;
    }[];
    mentorTopics: {
        id: number;
        name: string;
    }[];

    mentorCategory: {
        id: number;
        name: string;
    }[];
    linkedin: string | null;
    websiteURL: string | null;
    youtubeURL: string | null;
    instagramURL: string | null;
    xurl: string | null;
    facebookURL: string | null;
    avatarUrl: File[];
    coverUrl: File[];
}

export interface MentorEditProfileFormInput {
    heading: string;
    profession: string;
    company: string;
    biography: string;
    skills: string[];
    services: string[];
    timezone: string;
    language: string;
    categories: [];
    topics: [];
};


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

        return await axios.patch<MentorData>('/api/user/setting/personal-data', formData);

    } catch (error) {
        console.error(error);
        throw new Error("Failed to update personal data");
    }
};


export const updateUserProfile = async (mentorEditSection: MentorEditProfileFormInput) => {
    console.log('mentorEditSection', mentorEditSection)
    try {

        return await axios.patch<string>('/api/user/setting/profile', mentorEditSection);

    } catch (error) {
        console.error(error);
        throw new Error("Failed to update personal data");
    }
};


export default updateUserPersonalData;