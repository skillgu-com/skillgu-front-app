import React, { ReactNode } from "react";
import styles from "../MentorshipApplication.module.scss";
import clx from "classnames";
import { useMentAppReducer } from "src/reducers/mentorship-application";
import { Link } from "react-router-dom";
import { MentAppStep } from "src/reducers/mentorship-application/types";
import Accordion from "src/components/FAQ/Accordion/Accordion";
import { mentorshipApplicationFaq } from "src/components/FAQ/Accordion/content/mentorship-application";
import StepInput from "src/components/StepInput/StepInput";
import { PlanDetails } from "./PlanDetails";

type Props = {
  title: string;
  subtitle: string;
  description: ReactNode;
  submitText: string;
  submitHandler: () => void;
  step: 1 | 2 | 3 | 4;
  sidebar?: boolean;
  children?: ReactNode;
};

export const ContentWrapper = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        <main className={styles.main}>
          <div className={styles.mainContent}>
            <div className={styles.stepper}>
              <span data-active={props.step >= 1 ? "T" : 'F'} />
              <span data-active={props.step >= 2 ? "T" : 'F'} />
              <span data-active={props.step >= 3 ? "T" : 'F'} />
              <span data-active={props.step >= 4 ? "T" : 'F'} />
            </div>
            {props.title ? (
              <h1 className={styles.title}>{props.title}</h1>
            ) : null}
            {props.subtitle ? (
              <h3 className={styles.subtitle}>{props.subtitle}</h3>
            ) : null}
            {props.description ? (
              <p className={styles.description}>{props.description}</p>
            ) : null}
            <div className={styles.content}>{props.children}</div>
            <div className={styles.actions}>
              <button className={styles.btn} onClick={props.submitHandler}>
                {props.submitText}
              </button>
            </div>
          </div>

          {props.sidebar ? (
            <aside className={clx(styles.sidebar, styles.sidebarMobile)}>
              <PlanDetails />
            </aside>
          ) : null}

          <footer className={styles.faq}>
            <Accordion title="FAQ" elements={mentorshipApplicationFaq} />
          </footer>
        </main>

        {props.sidebar ? (
          <aside className={clx(styles.sidebar, styles.sidebarDesktop)}>
            <PlanDetails />
          </aside>
        ) : null}
      </div>
    </div>
  );
};
