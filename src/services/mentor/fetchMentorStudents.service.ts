import {
  FetchMentorStudentsInput,
  FetchMentorStudentsOutput,
} from "./fetchMentorStudents.types";

export const fetchMentorStudents = async (
  props: FetchMentorStudentsInput
): Promise<FetchMentorStudentsOutput> => {
  const res = await fetch('/mentor-students.json')
  const data = await res.json() 

  return {
    students: data.slice(0, props.take),
    total: data.length,
  };
};
