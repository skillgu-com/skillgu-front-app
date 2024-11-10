import {
  FetchStudentSessionsInput,
  FetchStudentSessionsOutput,
} from "./fetchStudentSessions.types";
import axios from "axios";


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

export const fetchMenteeSubscriptionHistory = async (
    props: FetchStudentSessionsInput
): Promise<FetchStudentSessionsOutput> => {


  const response = await axios.get('/mentee/home/meeting/subscription/history');
  const data = response.data;

  return {
    mentors: data.slice(0, props.take),
    total: data.length,
  };
};