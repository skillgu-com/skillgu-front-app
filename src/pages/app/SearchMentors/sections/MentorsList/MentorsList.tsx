// Libraries
import React from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
// Components
import Container from "src/new-components/Container/Container";
import {
    MentorListingCard,
    MentorListingCardSkeleton,
} from "@newComponents/Cards/MentorListingCard";
// Styles
import styles from "./MentorsList.module.scss";
// Types
import {Tag} from "src/types/tags";
// Utils
import {buildMentorLink} from "../../utils";
import {Mentor} from "@customTypes/mentor";

type Props = {
    error?: string;
    hasNextPage: boolean;
    mentors: Mentor[];
    pending: boolean;
    handleLoadMore: () => void;
};

export const MentorsList = ({
                                error,
                                hasNextPage,
                                mentors,
                                pending,
                                handleLoadMore,
                            }: Props) => {
    const [sentryRef] = useInfiniteScroll({
        loading: pending,
        hasNextPage,
        onLoadMore: handleLoadMore,
        disabled: !!error,
        rootMargin: "0px 0px 400px 0px",
    });

    return (
        <Container as={Tag.Section} classes={styles.wrapper}>
            <div className={styles.mentorsList}>
                {mentors?.map((item: any) => (
                    <MentorListingCard
                        key={item.id}
                        avatar_url={item.avatar_url}
                        description={item.description}
                        fullName={item.name}
                        id={item.id}
                        link={buildMentorLink(item)}
                        price={`${item.price}zł/h`}
                        profession={item.profession}
                        reviewsAvgRate={String(item.reviewsAvgRate)}
                        reviewsCount={String(item.reviewsCount)}
                        special={item.special}
                        specialVariant={item.specialVariant}
                        skills={item.skills}
                        title={item.title}
                    />
                ))}
                {!error && (pending || hasNextPage) ? (
                    <div ref={pending ? undefined : sentryRef}>
                        <MentorListingCardSkeleton/>
                    </div>
                ) : null}
                {error && (
                    <div className={styles.errorMsg}>
                        <p>{error}</p>
                    </div>
                )}
            </div>
        </Container>
    );
};
