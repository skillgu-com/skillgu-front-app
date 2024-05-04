import { type Review as ReviewType } from "@customTypes/mentor";
import { Pagination } from "@newComponents/_grouped";
import {
  Reviews,
  Review,
  ReviewSkeleton,
} from "@newComponents/_grouped/reviews";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMentorReviews } from "src/services/MentorsService";

type Props = {
  mentorId: string;
};

const REVIEWS_PER_PAGE = 3;

/**
 * Mentor reviews Connected
 */
export const MentorReviewsConnected = ({ mentorId }: Props) => {
  const [error, setError] = useState<string>("");
  const [pending, setPending] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const run = async (page: number) => {
      setPending(true);
      // setReviews([]);
      setError("");
      try {
        const { total, reviews } = await fetchMentorReviews({
          mentorId: String(mentorId),
          take: 3,
          skip: (page - 1) * REVIEWS_PER_PAGE,
        });
        setTotal(total);
        setReviews(reviews.slice(0, REVIEWS_PER_PAGE));
      } catch (e) {
        setError("Nie udało się pobrać ocen mentora.");
        setTotal(0);
      }
      setPending(false);
    };
    run(page);
  }, [mentorId, page]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.target as HTMLButtonElement;
    setPage(Number(value));
  }, []);

  return (
    <Reviews avgRate={4} title="Opinie" total={12}>
      <Reviews.List>
        {pending
          ? new Array(3).fill(null).map(() => <ReviewSkeleton />)
          : reviews.map((r) => {
              return <Review review={r} />;
            })}
      </Reviews.List>
      {total ? (
        <Reviews.Footer>
          <Pagination
            current={page}
            last={Math.ceil(total / REVIEWS_PER_PAGE)}
            onClick={handleClick}
          />
        </Reviews.Footer>
      ) : null}
    </Reviews>
  );
};
