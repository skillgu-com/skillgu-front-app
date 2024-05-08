import React, { useState } from "react";
import styles from "./MentorContent.module.scss";
import clx from "classnames";
import { Expandable } from "@newComponents/_base/Expandable";
import { CheckCircleIcon } from "@icons/CheckCircleIcon";

type Props = {
  title: string;
  contentHtml: string;
  skills: string[];
  services: string[];
};

export const MentorContent = ({
  title,
  contentHtml,
  services,
  skills,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className={clx(styles.MentorContent, styles.border)}>
      <p className={styles.content_title}>{title}</p>
      <div>
        <Expandable foldedHeight={50} isExpanded={isExpanded}>
          <div
            className={styles.content_content}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </Expandable>
        <button
          className={styles.showMore}
          type="button"
          onClick={() => setIsExpanded((s) => !s)}
        >
          {isExpanded ? 'Pokaż mniej' : 'Pokaż więcej'}
        </button>
      </div>

      {skills.length ? (
        <div className={styles.skills}>
          <h5 className={styles.skillsTitle}>Umiejętności</h5>
          <ul className={styles.skillsTags}>
            {skills.map((skill: string, i: number) => (
              <li key={`${skill}-${i}`} className={styles.skillsTag}>{skill}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {services.length ? (
        <ul className={styles.servicesTags} >
          {services.map((skill: string, i: number) => (
            <li className={styles.servicesTag} key={`${skill}-${i}`}>
              <CheckCircleIcon />
              {skill}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
