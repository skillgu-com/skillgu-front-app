import React from "react";
import Container from "src/components/Container/Container";
import { UserProfileHeaderSkeleton } from "src/components/_grouped/user-profile-header/UserProfileHeaderSkeleton";
import { Tag } from "@customTypes/tags";
import styles from "./ProfileEditSkeleton.module.scss";
import { Skeleton } from "@mui/material";

export const ProfileEditPageSkeleton = () => {
  return (
    <>
      <UserProfileHeaderSkeleton />

      <Container as={Tag.Section}>
        <div className={styles.container}>
          <div className={styles.colTitle}>
            <Skeleton variant="text" sx={{ width: "120px", height: "32px" }} />
            <Skeleton variant="text" sx={{ width: "200px", height: "24px" }} />
          </div>
          <div className={styles.colContent}>
            <div className={styles.InputsCols2}>
              <div>
                <Skeleton
                  variant="text"
                  sx={{ width: "120px", height: "24px" }}
                />
                <Skeleton
                  variant="text"
                  sx={{ width: "100%", height: "56px" }}
                />
              </div>
              <div>
                <Skeleton
                  variant="text"
                  sx={{ width: "120px", height: "24px" }}
                />
                <Skeleton
                  variant="text"
                  sx={{ width: "100%", height: "56px" }}
                />
              </div>
            </div>
            <div>
              <Skeleton
                variant="text"
                sx={{ width: "120px", height: "24px" }}
              />
              <Skeleton
                variant="text"
                sx={{ width: "100%", height: "170px" }}
              />
            </div>
            <div>
              <Skeleton
                variant="text"
                sx={{ width: "120px", height: "24px" }}
              />
              <Skeleton
                variant="text"
                sx={{ width: "100%", height: "170px" }}
              />
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.colTitle}>
            <Skeleton variant="text" sx={{ width: "120px", height: "32px" }} />
            <Skeleton variant="text" sx={{ width: "200px", height: "24px" }} />
          </div>
          <div className={styles.colContent}>
            <div className={styles.InputsCols2}>
              <div>
                <Skeleton
                  variant="text"
                  sx={{ width: "120px", height: "24px" }}
                />
                <Skeleton
                  variant="text"
                  sx={{ width: "100%", height: "56px" }}
                />
              </div>
              <div>
                <Skeleton
                  variant="text"
                  sx={{ width: "120px", height: "24px" }}
                />
                <Skeleton
                  variant="text"
                  sx={{ width: "100%", height: "56px" }}
                />
              </div>
            </div>
            <div>
              <Skeleton
                variant="text"
                sx={{ width: "120px", height: "24px" }}
              />
              <Skeleton
                variant="text"
                sx={{ width: "100%", height: "170px" }}
              />
            </div>
            <div>
              <Skeleton
                variant="text"
                sx={{ width: "120px", height: "24px" }}
              />
              <Skeleton
                variant="text"
                sx={{ width: "100%", height: "170px" }}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
