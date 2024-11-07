import axios from "axios";

type ReviewPropsTypes = {
  rating: number;
  mentor: string;
  date: Date;
  review: string;
};

export const sendReview = async (props: ReviewPropsTypes): Promise<boolean> => {
  await axios.post("/.....", props);

  return true;
};
