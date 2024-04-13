import { FiltersSelected, Mentor } from "@customTypes/mentor";

type ResponseData = {
  mentors: Mentor[];
  total: number;
};

export const fetchMentors = async (
  take: number,
  skip: number,
  filters?: FiltersSelected
): Promise<ResponseData> => {
  // @TODO: call to backend, add filters
  const response = await fetch("/search-mentor-results-mocked.json");
  const data = await response.json();
  return data as ResponseData;
};
