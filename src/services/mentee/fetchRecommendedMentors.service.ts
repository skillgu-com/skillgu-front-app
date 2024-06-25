import {
  FetchRecommendedMentorsOutput,
  FetchRecommendedMentorsInput,
} from "./fetchRecommendedMentors.types";

export const fetchRecommendedMentors = async (
  props: FetchRecommendedMentorsInput
): Promise<FetchRecommendedMentorsOutput> => {
  const res = await fetch('/similar-mentors.json')
  const data = await res.json() 

  return {
    mentors: data.slice(0, props.take),
  };
};
