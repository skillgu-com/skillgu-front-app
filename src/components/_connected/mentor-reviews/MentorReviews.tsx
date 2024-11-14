import { type Review as ReviewType } from "@customTypes/mentor";
import React, { useCallback, useEffect, useState } from "react";
import { fetchMentorReviews } from "src/services/mentor/fetchMentorServices.service";
import { Review, Reviews, ReviewSkeleton } from "../../_grouped/reviews";
import { Pagination } from "../../_grouped";

import styles from "./MentorReviews.module.scss";

type Props = {
  username: string | null | undefined;
};

const REVIEWS_PER_PAGE = 3;

export const MentorReviewsConnected = ({ username }: Props) => {
  const [error, setError] = useState<string>("");
  const [pending, setPending] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [avg, setAvg] = useState<number>(0);
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const run = async (page: number) => {
      if (!username) {
        setError("Brak nazwy użytkownika.");
        setPending(false);
        return;
      }

      setPending(true);
      setError("");
      try {
        const { total, reviews, avgRate } = await fetchMentorReviews({
          username: username,
          take: REVIEWS_PER_PAGE,
          skip: (page - 1) * REVIEWS_PER_PAGE,
        });
        setAvg(avgRate);
        setTotal(total);
        setReviews(reviews.slice(0, REVIEWS_PER_PAGE));
      } catch (e) {
        setError("Nie udało się pobrać ocen mentora.");
        setTotal(0);
        setReviews([]);
      }
      setPending(false);
    };
    run(page);
  }, [username, page]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.target as HTMLButtonElement;
    setPage(Number(value));
  }, []);

  return (
    <Reviews avgRate={avg} title="Opinie" total={total}>
      {!pending && reviews.length === 0 ? (
        <Reviews.Message>
          Ten mentor nie otrzymał na razie żadnych ocen.
        </Reviews.Message>
      ) : null}
      <Reviews.List>
        {pending
          ? new Array(REVIEWS_PER_PAGE)
              .fill(null)
              .map((_, ind) => <ReviewSkeleton key={ind} />)
          : reviews.map((r) => (
              <Review key={r.id} review={r} className={styles.review} />
            ))}
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
