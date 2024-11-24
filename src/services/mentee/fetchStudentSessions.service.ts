import {
  FetchStudentSessionsInput,
  FetchStudentSessionsOutput,
} from "./fetchStudentSessions.types";
import axios from "axios";
import {FetchMentorReviewsData} from "@customTypes/review";
import {FetchMentorSessionsInput, FetchMentorSessionsOutput} from "@customTypes/mentor";


export const fetchStudentSessions = async ({
                                             take = 10,
                                             skip = 0,
                                           }: FetchStudentSessionsInput): Promise<FetchStudentSessionsOutput> => {
  const response = await axios.get('/mentee/home/meeting/history', {
    params: { take, skip },
  });

  const data = response.data;

  console.log('tutaj jestem ');

  return {
    total: data.total, // Całkowita liczba rekordów
    mentors: data.subscriptions.map((item: any) => ({
      id: item.id,
      userName: item.username || "",      // Ustawienie domyślnej wartości
      avatarUrl: item.avatarUrl || "",   // Domyślny avatar, jeśli brak danych
      fullName:'Maciek Glazer TEST'|| "",     // Domyślna wartość
      date: item.sessionDate || "",      // Domyślna wartość daty
      status: (item.status?.toLowerCase() as 'in-progress' | 'planned' | 'cancelled' | 'completed') || 'in-progress', // Domyślny status
      serviceType: item.serviceType || 'mentoring', // Stała wartość 'mentoring'
      serviceName: item.serviceName || "", // Nazwa usługi (np. planu)
      planType: item.planType || "", // Dodano planType z backendu
    })),
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

