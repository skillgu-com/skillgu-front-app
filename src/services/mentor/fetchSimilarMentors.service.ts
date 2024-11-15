import axios from "axios";
import {FetchSimilarMentorsInput, FetchSimilarMentorsOutput} from "@customTypes/mentor";

export const fetchSimilarMentors = async (props: FetchSimilarMentorsInput): Promise<FetchSimilarMentorsOutput> => {
  try {
    const response = await axios.get('/mentor/home/mentors/similar');
    const data = response.data;

    return {
      mentors: data ? data.slice(0, props.take) : [],
    };
  } catch (error) {
    console.error('Error fetching similar mentors:', error);
    return {
      mentors: []
    }
  }
};
