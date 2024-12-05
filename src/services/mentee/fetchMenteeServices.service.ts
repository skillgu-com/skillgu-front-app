import axios from "axios";
import {MenteeDTO} from "../../pages/app/MenteeProfileEdit/sections";

export interface JobPosition {
    id: number;
    name: string;
}

export const getMenteeProfileById = async (studentId: number) => {
    return await axios.get<MenteeDTO>(`/api/1.0/mentee/profile`, {
        params: {studentId: studentId},
    });
}

export const getMenteeByUserName = async (username: string) => {
    return await axios.get(`/api/1.0/mentee/profile`, {
        params: {username: username},
    });
}

