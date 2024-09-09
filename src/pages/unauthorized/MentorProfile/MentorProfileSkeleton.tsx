import React from "react";
import Container from "src/components/Container/Container";
import { Tag } from "src/types/tags";
import { MentorMainWrapper } from "./components/content";
import styles from "./MentorProfile.module.scss";
import { Skeleton } from "@mui/material";
import { UserProfileHeaderSkeleton } from "src/components/_grouped/user-profile-header/UserProfileHeaderSkeleton";

export const MentorProfilePageSkeleton = () => {
  return (
    <>
      <UserProfileHeaderSkeleton />
      <Container as={Tag.Div}>
        <MentorMainWrapper>
          <main>
            <div className={styles.boxContentSkeleton}>
              <Skeleton
                variant="text"
                style={{ width: "100px", height: "32px" }}
              />
              <Skeleton
                variant="text"
                style={{ width: "100px", height: "32px" }}
              />
              <Skeleton
                variant="text"
                style={{ width: "100px", height: "32px" }}
              />
            </div>
            <div className={styles.boxLinksSkeleton}>
              <div className={styles.onlyDesktop}>
                <Skeleton
                  variant="text"
                  style={{ width: "100px", height: "32px" }}
                />
              </div>

              <div className={styles.linksSkeleton}>
                <Skeleton
                  variant="circular"
                  style={{ width: "32px", height: "32px" }}
                />
                <Skeleton
                  variant="circular"
                  style={{ width: "32px", height: "32px" }}
                />
                <Skeleton
                  variant="circular"
                  style={{ width: "32px", height: "32px" }}
                />
                <Skeleton
                  variant="circular"
                  style={{ width: "32px", height: "32px" }}
                />
                <Skeleton
                  variant="circular"
                  style={{ width: "32px", height: "32px" }}
                />
              </div>
            </div>
          </main>
          <aside>
            <div className={styles.boxSessionSkeleton}>
              <Skeleton
                variant="rounded"
                style={{ width: "100%", height: "45px" }}
              />
              <Skeleton
                variant="rounded"
                style={{ width: "100%", height: "45px", borderRadius: "50px" }}
              />
              <Skeleton variant="text" style={{ width: "100px" }} />
            </div>
          </aside>
        </MentorMainWrapper>
      </Container>
      {/* 
      {!pending && mentorData.mentorId ? (
        <Container as={Tag.Section}>
          <MentorReviewsConnected mentorId={mentorData.mentorId} />
        </Container>
      ) : null} */}
    </>
  );
};
