import React from "react";
import clx from "classnames";
import styles from "./MentorHeader.module.scss";
import { LangSwitcherConnected } from "@newComponents/_connected/lang-switcher/LangSwitcher";
import { MapMarkIcon } from "@icons/MapMarkIcon";

type Props = {
  avatarUrl?: string;
  fullname?: string;
  location?: string;
  profession?: string;
  company?: string;
};

export const MentorHeader = ({
  avatarUrl,
  fullname,
  location,
  profession,
  company,
}: Props) => {
  return (
    <>
      <div className={styles.desktop}>
        <div className={styles.bar}>
          {avatarUrl ? (
            <div className={styles.avatar}>
              <img alt={`Mentor ${fullname} Avatar`} src={avatarUrl} />
            </div>
          ) : null}
          <div className={styles.main}>
            <h2 className={styles.fullname}>{fullname}</h2>
            <div className={styles.subtitle}>
              <span>
                {profession} w {company}
              </span>
              <div className={styles.dot} />
              <span className={styles.location}>
                <MapMarkIcon /> {location}
              </span>
            </div>
          </div>
          <div className={styles.languages}>
            <LangSwitcherConnected />
          </div>
        </div>
      </div>

      <div className={styles.mobile}>
        <div className={styles.bar}>
          {avatarUrl ? (
            <div className={styles.avatar}>
              <img alt={`Mentor ${fullname} Avatar`} src={avatarUrl} />
            </div>
          ) : null}
          <div className={styles.main}>
            <h2 className={styles.fullname}>{fullname}</h2>
            <div className={styles.subtitle}>
              <span>
                {profession} w {company}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.bar2nd}>
          <div className={styles.languages}>
            <LangSwitcherConnected />
          </div>
          <span className={styles.location}>
            <MapMarkIcon /> {location}
          </span>
        </div>
      </div>
    </>
  );
};
