import React from "react";
import clx from "classnames";

import Button, { ButtonVariant } from "src/components/Button/Button";
import FAQ from "src/components/FAQ/Accordion/Accordion";
import { stripeIntegration } from "src/components/FAQ/Accordion/content/stripe-integration";
import Container from "src/components/Container/Container";

import styles from "../styles.module.scss";
import { Tag } from "@customTypes/tags";

type Props = {
  error: string;
  handleCreateAccount: () => void;
};

export const NotConnected = ({ error, handleCreateAccount }: Props) => {
  return (
    <main>
      <Container as={Tag.Section} classes={styles.wrapper}>
        <h1 className={styles.title}>Płatności</h1>
        <p className={styles.description}>
          Płatności na platformie obsługuje firma Stripe. Po kliknięciu w
          "Konfiguruj płatności", zostaniesz przekierowany do formularza
          konfiguracji. Stripe poprosi Cię o dane niezbędne do wypłacenia
          środków.
        </p>
        <div className={clx(styles.cols2, styles.cols2Reverse)}>
          <div className={styles.imgCtaWrapper}>
            <div className={styles.imgCtaBox}>
              <img
                width="308.33px"
                height="308.33px"
                src="/images/m0043-36_1.svg"
                alt="woman payment"
              />
              <div>
                <Button
                  onClick={handleCreateAccount}
                  fullWidth
                  variant={ButtonVariant.Primary}
                >
                  Konfiguruj płatności
                </Button>

                {error && <p>Error occurred while processing your request.</p>}
              </div>
            </div>
          </div>
          <div className={styles.faqWrapper}></div>
        </div>
        <section>
          <div className={styles.faqBox}>
            <FAQ title="FAQ" elements={stripeIntegration} />
          </div>
        </section>
      </Container>
    </main>
  );
};
