import React, { useEffect, useState } from "react";
import { OtherMentors } from "./OtherMentors";
import { Mentor } from "./types";
import { fetchSimilarMentors } from "@services/mentor/fetchSimilarMentors.service";
import {FetchSimilarMentorsOutput} from "@customTypes/mentor";

export const SimilarMentors = () => {
  const [data, setData] = useState<FetchSimilarMentorsOutput | null>(null);
  const [pending, setPending] = useState<boolean>(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await fetchSimilarMentors({ take: 8 });
      setData(data);
      setPending(false);
    };
    fetchInitialData();
  }, []);

  return (data && data.mentors.length > 0) ? (
    <OtherMentors
      title="Podobni do Ciebie"
      mentors={(data ? data.mentors : []) as unknown as Mentor[]}
      ready={!pending && data !== null}
      pending={pending}
    />
  ) : null
};
