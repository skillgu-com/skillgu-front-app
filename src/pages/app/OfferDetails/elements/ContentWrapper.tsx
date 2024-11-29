import React, { ReactNode } from "react";
import styles from "../MentorOfferDetails.module.scss";
import clx from "classnames";
import { PlanDetails } from "./PlanDetails";
import { ArrowLongLeft } from "@icons/ArrowLongLeft";
import { useSelector } from "react-redux";
import { getRole } from "src/redux/selectors/authSelectors";

type Props = {
  title: string;
  description: ReactNode;
  sidebarFirst?: boolean;
  children?: ReactNode;
  backArrow?: boolean;
};

export const ContentWrapper = (props: Props) => {
  const role = useSelector(getRole);
  return (
    <div className={styles.wrapper}>
      <div
        className={clx(styles.grid, {
          [styles.sidebarFirst]: props.sidebarFirst,
        })}
      >
        <header className={styles.header}>
          {props.title ? (
            <h1 className={styles.title}>
              {props.backArrow ? (
                <a
                  href={
                    role === "S"
                      ? "/mentee-subscriptions"
                      : "/mentor-subscriptions"
                  }
                  className={styles.arrow}
                >
                  <ArrowLongLeft />
                </a>
              ) : null}
              <span>{props.title}</span>
            </h1>
          ) : null}
          {props.description ? (
            <p className={styles.description}>{props.description}</p>
          ) : null}
        </header>

        <main className={styles.main}>{props.children}</main>

        <aside className={clx(styles.sidebar)}>
          <PlanDetails />
        </aside>
      </div>
    </div>
  );
};
