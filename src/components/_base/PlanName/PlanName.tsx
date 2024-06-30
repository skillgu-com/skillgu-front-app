import React from "react";
import clx from "classnames";
import styles from "./PlanName.module.scss";
import { SubscriptionPlan } from "@customTypes/order";
import { CrownIcon } from "@icons/CrownIcon";

interface Props {
  className?: string;
  plan: SubscriptionPlan;
  planName?: string;
  iconSize?: 24
  fontVariant?: 'buttonMd'
  pillBg?: boolean
  noPadding?: boolean
}

const getDefaultPlanName = (plan: SubscriptionPlan) : string => {
  switch(plan){
    case 'advanced':
      return 'Plan zaawansowany';
    case 'basic':
      return 'Plan podstawowy';
    case 'pro':
      return 'Plan pro'
  }
}

export const PlanName = ({
  className,
  plan,
  planName,
  iconSize = 24, 
  fontVariant = 'buttonMd', 
  pillBg,
  noPadding,
}: Props) => {
  return (
    <div className={clx(styles.card, {
      [styles.pillBg]: !!pillBg,
      [styles.noPadding]: !!noPadding,
    }, className)}>
      {plan === 'pro' ? (<CrownIcon />) : null}
      <span>{planName ?? getDefaultPlanName(plan)}</span>
    </div>
  );
};
