import {
  FetchStudentSessionsInput,
  FetchStudentSessionsOutput,
} from "./fetchStudentSessions.types";
import axios from "axios";
import {FetchMentorReviewsData} from "@customTypes/review";


export const fetchStudentSessions = async (
    props: FetchStudentSessionsInput
): Promise<FetchStudentSessionsOutput> => {

  const response = await axios.get('/mentee/home/meeting/history');
  const data = response.data;

  return {
    mentors: data.slice(0, 10),
    total: data.length,
  };
};

export const fetchMenteeSubscriptionHistory = async ({
                                                       take = 10,
                                                       skip = 0,
                                                     }: FetchStudentSessionsInput): Promise<FetchStudentSessionsOutput> => {
  const response = await axios.get('/mentee/home/meeting/subscription/history', {
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
      userName: item?.username, // Poprawienie na `item.username`
      avatarUrl: item.avatarUrl || "", // Dodaj avatarUrl, jeśli dostępny
      fullName: item?.fullName,
      date: item.sessionDate,
      status: item.status || 'in-progress', // Używanie statusu z backendu, z domyślną wartością
      serviceType: item.planType === 'basic' ? 'session' : 'mentoring', // Mapa dla odpowiednich wartości
      serviceName: item.scheduleName, // Poprawienie na `item.scheduleName`
    })),
  };
};

