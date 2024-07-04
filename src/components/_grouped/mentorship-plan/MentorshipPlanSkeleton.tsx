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

type Props = {
  withUser: boolean;
};

export const MentorshipPlanSkeleton = ({ withUser }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={clx(styles.row, styles.priceRow)}></div>
        <div className={clx(styles.row)}></div>
        <h6 className={styles.subtitle}>Plan obejmuje</h6>
      </div>
    </div>
  );
};
