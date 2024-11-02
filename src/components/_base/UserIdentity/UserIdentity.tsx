import React, { ReactNode } from "react";
import clx from "classnames";
import styles from "./UserIdentity.module.scss";
import StarSvg from "@icons/StarSvg";
import { MapMarkIcon } from "@icons/MapMarkIcon";

interface UserProfileCardProps {
  className?: string;
  avatarUrl?: string;
  avatarSize?: 40 | 48 | 56 | 64;
  avatarAlt?: string;
  avatar?: ReactNode;
  title?: string | ReactNode;
  timeZone?: string;
  subtitle?: string | ReactNode;
  rate?: number;
  noPadding?: boolean;
  fullWidth?: boolean;
}

export const UserIdentity = ({
  className,
  avatar,
  avatarUrl,
  avatarAlt,
  avatarSize,
  title,
  subtitle,
  timeZone,
  noPadding,
  rate,
  fullWidth,
}: UserProfileCardProps) => {
  return (
    <>
      <div
        className={clx(
          styles.card,
          {
            [styles.noPadding]: noPadding,
            [styles.fullWidth]: fullWidth,
          },
          className
        )}
      >
        {avatar ? (
          avatar
        ) : avatarUrl ? (
          <img
            src={avatarUrl}
            alt={avatarAlt}
            className={styles.avatar}
            width={`${avatarSize}px`}
            height={`${avatarSize}px`}
          />
        ) : null}

        <div className={styles.content}>
          <div className={styles.main}>
            {typeof title === "string" ? (
              <span className={styles.title}>{title}</span>
            ) : title ? (
              title
            ) : null}
            {rate ? (
              <div className={styles.rate}>
                <StarSvg /> <span>{rate}</span>
              </div>
            ) : null}
          </div>
          {typeof subtitle === "string" ? (
            <span className={styles.subtitle}>{subtitle}</span>
          ) : subtitle ? (
            subtitle
          ) : null}
        </div>
      </div>
      {timeZone && (
        <span className={styles.timeZone}>
          <MapMarkIcon /> <p>{timeZone}</p>
        </span>
      )}
    </>
  );
};
