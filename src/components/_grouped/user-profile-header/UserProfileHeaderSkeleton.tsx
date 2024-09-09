import React from "react";
import styles from "./UserProfileHeader.module.scss";
import { Tag } from "src/types/tags";
import Container from "src/components/Container/Container";
import { Skeleton } from "@mui/material";

export const UserProfileHeaderSkeleton = () => {
  return (
    <div className={styles.wrapper}>

      <img alt="grey background" className={styles.bg} src={"/images/grey-bg.png"} />
      <Container as={Tag.Section}>
        <div className={styles.desktop}>
          <div className={styles.bar}>
            <div className={styles.avatar}></div>
            <div className={styles.main}>
              <Skeleton
                variant="text"
                style={{ width: "150px", height: "42px" }}
              />
              <div className={styles.subtitle}>
                <Skeleton
                  variant="text"
                  style={{ width: "150px", height: "25px" }}
                />
              </div>
            </div>

            <div className={styles.actions}>
              <Skeleton variant="rounded" style={{ width: "260px", height:"18px", marginTop:"48px" }} />
            </div>
          </div>
        </div>

        <div className={styles.mobile}>
          <div className={styles.bar}>
            <div className={styles.avatar}></div>
            <div className={styles.main}>
              <Skeleton
                variant="text"
                style={{ width: "150px", height: "42px" }}
              />
              <div className={styles.subtitle}>
                <Skeleton variant="text" style={{ width: "120px" }} />
              </div>
            </div>
          </div>
          <div className={styles.bar2nd}>
            <Skeleton
              variant="text"
              style={{ width: "120px", height: "18px" }}
            />
          </div>

          <div className={styles.action}>
            <Skeleton
              variant="rounded"
              style={{ height: "42px", borderRadius: "50px" }}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};
