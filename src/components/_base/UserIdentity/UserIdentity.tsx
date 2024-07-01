import React, { ReactNode } from "react";
import clx from "classnames";
import styles from "./UserIdentity.module.scss";

interface UserProfileCardProps {
  className?: string;
  avatarUrl?: string;
  avatarSize?: 40 | 48 | 56;
  avatarAlt?: string;
  avatar?: ReactNode;
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
}

export const UserIdentity = ({
  className,
  avatar,
  avatarUrl,
  avatarAlt,
  avatarSize,
  title,
  subtitle,
}: UserProfileCardProps) => {
  return (
    <div className={clx(styles.card, className)}>
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
        {title ? <span className={styles.title}>{title}</span> : null}
        {subtitle ? <span className={styles.subtitle}>{subtitle}</span> : null}
      </div>
    </div>
  );
};
