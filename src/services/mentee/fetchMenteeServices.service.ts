import axios from "axios";

// MenteeDTO.ts
export interface JobPosition {
    id: number;
    name: string;
}

export interface MenteeDTO {
    coverUrl: string;
    avatarUrl: string;
    id: string;
    firstName: string;
    lastName: string;
    location: string;
    profession: string;
    jobPosition: JobPosition[];
}

export const getMenteeProfileById = async (studentId: any) => {
    return await axios.get<MenteeDTO>(`/api/mentee/get-mentee-by-id/${studentId}`);
}