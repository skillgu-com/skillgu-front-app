import {
  FetchStudentSessionsInput,
  FetchStudentSessionsOutput,
} from "./fetchStudentSessions.types";

export const fetchStudentSessions = async (
  props: FetchStudentSessionsInput
): Promise<FetchStudentSessionsOutput> => {
  const res = await fetch('/sessions-mocked.json')
  const data = await res.json() 

  return {
    total: data.length,
    mentors: data.slice(props.skip, props.skip + props.take),
  };
};
