import {
  FetchSimilarMentorsOutput,
  FetchSimilarMentorsInput,
} from "./fetchSimilarMentors.types";

export const fetchSimilarMentors = async (
  props: FetchSimilarMentorsInput
): Promise<FetchSimilarMentorsOutput> => {
  const res = await fetch('/similar-mentors.json')
  const data = await res.json() 

  return {
    mentors: data.slice(0, props.take),
  };
};
