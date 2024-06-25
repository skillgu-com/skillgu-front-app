import {
  FetchMentorSessionsInput,
  FetchMentorSessionsOutput,
} from "./fetchMentorSessions.types";

export const fetchMentorSessions = async (
  props: FetchMentorSessionsInput
): Promise<FetchMentorSessionsOutput> => {
  const res = await fetch('/sessions-mocked.json')
  const data = await res.json() 

  return {
    total: data.length,
    students: data.slice(props.skip, props.skip + props.take),
  };
};
