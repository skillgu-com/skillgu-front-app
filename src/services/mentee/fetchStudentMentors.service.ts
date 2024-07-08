import {FetchStudentMentorsInput, FetchStudentMentorsOutput,} from "./fetchStudentMentors.types";
import axios from "axios";


export const getMenteeMeetingHistory = async (
    props: FetchStudentMentorsInput
): Promise<FetchStudentMentorsOutput> => {
  // const res = await fetch('/sessions-mocked.json')
  const response = await axios.get('/mentor/home/meeting/history');
  const data = response.data;


  return {
    mentors: data.slice(0, props.take),
    total: data.length,
  };
};