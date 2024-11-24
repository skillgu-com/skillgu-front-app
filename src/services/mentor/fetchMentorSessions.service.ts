import axios from "axios";
import {FetchMentorSessionsInput, FetchMentorSessionsOutput} from "@customTypes/mentor";

export const getMentorMeetingHistory = async ({
                                                  take = 10,
                                                  skip = 0,
                                              }: FetchMentorSessionsInput): Promise<FetchMentorSessionsOutput> => {
    const response = await axios.get('/mentor/home/meeting/history', {
        params: {take, skip},
    });

    const data = response.data;
    console.log('jestem u mentora')

    return {
        total: data.total,
        mentee: data.subscriptions.map((item: any) => ({
            id: item.id,
            userName: item.username,
            avatarUrl: item.avatarUrl || "",
            fullName: item.fullName,
            date: item.sessionDate,
            status: item.status.toLowerCase() || 'in-progress',
            serviceType: 'mentoring',
            serviceName: item.planType?.toUpperCase(),
        })),
    };
};