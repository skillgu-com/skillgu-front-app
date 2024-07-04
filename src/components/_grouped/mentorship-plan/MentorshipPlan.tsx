import React, {
  ChangeEvent,
  ChangeEventHandler,
  FocusEvent,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useState,
} from "react";
import styles from "./MentorshipPlan.module.scss";
import clx from "classnames";
import { MentorhsipPlanType, SubscriptionPlan } from "@customTypes/order";
import { displayPlanName } from "src/utils/plan";
import { CrownIcon } from "@icons/CrownIcon";
import { PlusIcon } from "@icons/PlusIcon";
import { CheckCircleIcon } from "@icons/CheckCircleIcon";
import Select from "src/components/Select/Select";
import { responseTimeOptions, sessionDurationOptions } from "./config";
import {
  OverflowMenu,
  OverflowMenuList,
  OverflowMenuOption,
  OverflowMenuToggle,
} from "../overflow-menu";
import { PlanName } from "src/components/_base/PlanName";
import { CheckCircleSolidIcon } from "@icons/CheckCircleSolidIcon";

type MentorhsipPlanPart = Pick<
  MentorhsipPlanType,
  | "id"
  | "description"
  | "price"
  | "sessionDuration"
  | "responseTime"
  | "sessionsPerMonth"
  | "planIncludes"
>;

type Props = MentorhsipPlanPart & {
  subscriptionVariant: SubscriptionPlan;
  userIdentity?: ReactNode;
  selected?: boolean;
  selectable?: boolean;
  onClick?: () => void;
};

const checkIcon = <CheckCircleSolidIcon className={styles.checkIcon} />;

export const MentorshipPlan = ({
  id,
  subscriptionVariant,
  description,
  price,
  sessionDuration,
  sessionsPerMonth,
  responseTime,
  planIncludes,
  userIdentity,
  selected,
  selectable,
  onClick,
}: Props) => {
  return (
    <div className={styles.wrapper}>
      {userIdentity}
      <div className={styles.rows}>
        <PlanName
          className={styles.planName}
          plan={subscriptionVariant}
          fontVariant="subtitle-1"
          iconSize={20}
          noPadding
          iconPosition="trailing"
        />
        <div className={clx(styles.row, styles.priceRow)}>
          <span className={styles.textCurrency}>{price} zł</span>
          <span>miesięcznie</span>
        </div>
        {description ? (
          <div className={clx(styles.row, styles.description)}>
            <span>{description}</span>
          </div>
        ) : null}

        <h6 className={styles.subtitle}>Plan obejmuje</h6>
        {typeof sessionsPerMonth !== "undefined" ? (
          <div className={clx(styles.row)}>
            {checkIcon}
            <div>
              <span className={styles.text}>
                {sessionsPerMonth} sesje mentoringowe na miesiąc{" "}
                {typeof sessionDuration !== "undefined"
                  ? `(${sessionDuration} minut każda)`
                  : null}
              </span>
            </div>
          </div>
        ) : null}
        {typeof responseTime !== "undefined" ? (
          <div className={clx(styles.row)}>
            {checkIcon}
            <div className={styles.text}>
              <span>Odpowiedzi na Twoje pytania w ciągu {responseTime}h </span>
            </div>
          </div>
        ) : null}
        {planIncludes.map((r, i) => (
          <div className={clx(styles.row)} key={r + "_" + i}>
            {checkIcon}
            <div className={styles.text}>
              <span>{r}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
