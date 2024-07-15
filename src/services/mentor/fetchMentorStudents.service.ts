import {
  FetchMentorStudentsInput,
  FetchMentorStudentsOutput,
} from "./fetchMentorStudents.types";

export const fetchMentorStudents = async (
  props: FetchMentorStudentsInput
): Promise<FetchMentorStudentsOutput> => {
  const res = await fetch('/mentor-studentss.json')
  const data = await res.json() as FetchMentorStudentsOutput['students']
  const filtered = data.filter(d => d.status === props.status)

  return {
    students: filtered.slice(props.skip, props.skip + props.take),
    total: filtered.length,
  };
};
