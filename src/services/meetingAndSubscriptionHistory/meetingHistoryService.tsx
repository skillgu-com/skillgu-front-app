import axios from "axios";
import {FetchMentorSessionsInput, FetchMentorSessionsOutput} from "@customTypes/mentor";
import {FetchStudentSessionsInput, FetchStudentSessionsOutput} from "@services/mentee/fetchStudentSessions.types";

export const fetchMentorMeetingHistory = async ({
                                                    take = 10,
                                                    skip = 0,
                                                }: FetchMentorSessionsInput): Promise<FetchMentorSessionsOutput> => {
    const response = await axios.get('/meetings/history/mentor/session', {params: {take, skip},});

    const data = response.data;
    return {
        total: data.total,
        mentee: data.subscriptions.map((item: any) => ({
            id: item.id,
            userName: item.username || "",
            avatarUrl: item.avatarUrl || "",
            fullName: item?.fullName || "",
            date: item.sessionDate || "",
            status: item.sessionStatus.toLowerCase() || 'in-progress',
            serviceType: item.meetingType || 'mentoring',
            serviceName: item.serviceName || "",
        })),
    };
};

export const fetchMenteeMeetingHistory = async ({
                                                    take = 10,
                                                    skip = 0,
                                                }: FetchStudentSessionsInput): Promise<FetchStudentSessionsOutput> => {
    const response = await axios.get('/meetings/history/mentee/session', {params: {take, skip},});

    const data = response.data;

    return {
        total: data.total,
        mentors: data.subscriptions.map((item: any) => ({
            id: item.id,
            userName: item.username || "",
            avatarUrl: item.avatarUrl || "",
            fullName: item?.fullName || "",
            date: item.sessionDate || "",
            status: item.sessionStatus.toLowerCase() || 'in-progress',
            serviceType: item.meetingType || 'mentoring',
            serviceName: item.serviceName || "",
        })),
    };
};

