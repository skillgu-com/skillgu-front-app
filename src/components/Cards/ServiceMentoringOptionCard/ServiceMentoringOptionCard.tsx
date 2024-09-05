import React from "react";
import { MentorshipPlan } from "@customTypes/order";
import styles from "./ServiceMentoringOptionCard.module.scss";
import clx from "classnames";
import { RadioInputIcon } from "@icons/RadioInput";
import { CrownIcon } from "@icons/CrownIcon";
import { CheckCircleSolidIcon } from "@icons/CheckCircleSolidIcon";
import Typography from "@mui/material/Typography";
import StarSvg from "@icons/StarSvg";
import { Collapse } from "@mui/material";

type Props = MentorshipPlan & {
  name?: string;
  value?: string;
  selected?: boolean;
  displayRadioInput?: boolean;
  sessionsPerMonth: number;
  sessionDurationMinutes: number;
  responseTimeHours: number;
  handleSelect?: React.MouseEventHandler<HTMLButtonElement>;
  mentorProfileReview?: {
    profileImage: string | null;
    firstName: string;
    lastName: string;
    jobPosition: string;
    reviewsAvgRate: number | null;
  };
};

export const ServiceMentoringOptionCard = ({
  name,
  value,
  title,
  price,
  id,
  subtitle,
  variant,
  descriptionRows,
  selected,
  displayRadioInput,
  handleSelect,
  sessionsPerMonth,
  sessionDurationMinutes,
  responseTimeHours,
  mentorProfileReview,
}: Props) => {
  console.log(  sessionsPerMonth,
    sessionDurationMinutes,
    responseTimeHours,)
  return (
    <button
      className={clx(styles.card, {
        [styles.selected]: selected,
        [styles.selectable]: !!handleSelect,
      })}
      onClick={handleSelect}
      name={name}
      value={value}
    >
      {mentorProfileReview && (
        <Collapse in={!!mentorProfileReview}>
          <div className={styles.mentorProfileReview}>
            <img
              className={styles.avatarImage}
              src={
                mentorProfileReview.profileImage ||
                "https://cdn.pixabay.com/photo/2023/04/21/15/42/portrait-7942151_640.jpg"
              }
              alt="mentor"
            />
            <div className={styles.mentorDescription}>
              <div className={styles.nameRow}>
                <Typography variant="buttonMd" align="left">
                  {[mentorProfileReview.firstName, mentorProfileReview.lastName]
                    .filter(Boolean)
                    .join(" ")}
                </Typography>
                {!!mentorProfileReview.reviewsAvgRate && (
                  <>
                    <StarSvg />
                    <Typography variant="buttonMd" sx={{ ml: 1 }}>
                      {mentorProfileReview.reviewsAvgRate}
                    </Typography>
                  </>
                )}
              </div>
              <Typography variant="caption">
                {mentorProfileReview.jobPosition}
              </Typography>
            </div>
          </div>
        </Collapse>
      )}
      <div className={styles.rowTitle}>
        {handleSelect && displayRadioInput ? (
          <RadioInputIcon filled={selected} />
        ) : null}
        <h5 className={styles.title}>{title}</h5>
        {variant === "pro" ? <CrownIcon className={styles.crown} /> : null}
      </div>
      {subtitle ? <p className={styles.subtitle}> {subtitle}</p> : null}

      <div className={styles.priceRow}>
        <strong>{Math.ceil(price)} zł</strong>
        <span>miesięcznie</span>
      </div>

      <div className={styles.listRow}>
        <h6>Plan obejmuje</h6>
        <ul>
          <li>
            <CheckCircleSolidIcon />
            <span>
              {`${sessionsPerMonth} sesje mentoringowe na miesiąc ${
                typeof sessionDurationMinutes !== "undefined"
                  ? `(${sessionDurationMinutes} minut każda)`
                  : null
              }`}
            </span>
          </li>
          <li>
            <CheckCircleSolidIcon />
            <span>
              {`Odpowiedzi na Twoje pytania w ciągu: ${responseTimeHours}h `}
            </span>
          </li>
          {descriptionRows && descriptionRows.length > 0
            ? descriptionRows.map((r, ind) => (
                <li key={ind}>
                  <CheckCircleSolidIcon />
                  <span>{r.description}</span>
                </li>
              ))
            : null}
        </ul>
      </div>
    </button>
  );
};
