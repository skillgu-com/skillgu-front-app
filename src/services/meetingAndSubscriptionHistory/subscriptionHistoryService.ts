import {FetchStudentSessionsInput, FetchStudentSessionsOutput} from "@services/mentee/fetchStudentSessions.types";
import axios from "axios";

export const fetchMenteeSubscriptionHistory = async ({take = 10, skip = 0,}: FetchStudentSessionsInput): Promise<FetchStudentSessionsOutput> => {
    const response = await axios.get('/api/meetings/history/mentee/subscription', {
        params: {
            take,
            skip,
        },
    });
    const data = response.data;

    return {
        total: data.total,
        mentors: data.subscriptions.map((item: any) => ({
            id: item.id,
            userName: item?.username,
            avatarUrl: item.avatarUrl || "",
            fullName: item?.fullName,
            date: item.sessionDate,
            status: item.status.toLowerCase() || 'in-progress',
            serviceType:  'mentoring',
            serviceName: item?.planType.toUpperCase(),
        })),
    };
};
