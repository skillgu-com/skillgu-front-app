import React, { ReactNode } from "react";
import styles from "../MentorshipApplication.module.scss";
import clx from "classnames";

import Accordion from "src/components/FAQ/Accordion/Accordion";
import {
   mentorshipSignupFaq
} from "src/components/FAQ/Accordion/content/mentorship-application";
import { PlanDetails } from "./PlanDetails";
import { ProgressBarStepper } from "src/components/_base/progress-bar";
import Button, { ButtonVariant } from "src/components/Button/Button";

type Props = {
  title: string;
  subtitle: string;
  description: ReactNode;
  submitText: string;
  submitDisabled?: boolean;
  submitHandler: () => void;
  step: 1 | 2 | 3 | 4;
  sidebar?: boolean;
  children?: ReactNode;
};

export const ContentWrapper = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={clx(styles.grid, {
        [styles.withSidebar]: props.sidebar,
        [styles.gridCenter]: !props.sidebar,
      })}>
        <main className={styles.main}>
          <div className={styles.mainContent}>
            <ProgressBarStepper
              className={styles.stepper}
              current={props.step}
              max={4}
            />
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
              <Button
                variant={ButtonVariant.Primary}
                size="lg"
                fullWidth
                fontVariant="button-md"
                onClick={props.submitHandler}
                disabled={props.submitDisabled}
                disableButton={props.submitDisabled}
              >
                {props.submitText}
              </Button>
            </div>
          </div>

          {props.sidebar ? (
            <aside className={clx(styles.sidebar, styles.sidebarMobile)}>
              <PlanDetails />
            </aside>
          ) : null}

          <footer className={styles.faq}>
            <Accordion title="FAQ" elements={mentorshipSignupFaq} />
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
