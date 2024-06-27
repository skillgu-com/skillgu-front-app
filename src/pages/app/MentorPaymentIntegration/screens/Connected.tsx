import React from "react";
import clx from "classnames";

import Button, { ButtonVariant } from "src/components/Button/Button";
import { payment } from "src/components/FAQ/Accordion/content/payment";
import FAQ from "src/components/FAQ/Accordion/Accordion";
import Container from "src/components/Container/Container";
import { LinksList, LinksListRow } from "src/components/FAQ/LinksList";
import { Reports } from "../elements/Reports";
import { Schedule } from "../elements/Schedule";

import styles from "../styles.module.scss";
import { Tag } from "@customTypes/tags";

type Props = {
  price: number;
  error: string;
  handleCreateAccountLink: () => void;
};

export const Connected = ({ price, error, handleCreateAccountLink }: Props) => {
  const formattedPrice = price
    ? (price / 100).toLocaleString("pl-PL", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "";

  return (
    <main>
      <Container as={Tag.Section} classes={styles.wrapper}>
        <h1 className={styles.title}>Płatności</h1>
        <p className={styles.description}>
          Płatności na platformie obsługuje firma Stripe. Jeżeli chcesz edytować
          jakieś dane lub wypłacić środki, kliknij "Przejdź do Stripe".
        </p>
        <div className={clx(styles.cols2)}>
          <div className={styles.priceCtaWrapper}>
            <div className={styles.priceCtaBox}>
              {formattedPrice ? (
                <span className={styles.priceLabel}>
                  Obecne saldo wynosi
                  <span className={styles.priceAmount}>
                    {formattedPrice} zł
                  </span>
                </span>
              ) : null}
              <div>
                <Button
                  onClick={handleCreateAccountLink}
                  fullWidth
                  variant={ButtonVariant.Primary}
                >
                  Połącz ze Stripe
                </Button>
                {error && <p>Error occurred while processing your request.</p>}
              </div>
            </div>
          </div>
          <div className={styles.scheduleWrapper}>
            <Schedule />
          </div>
        </div>
        <section>
          <Reports />
        </section>
        <section>
          <div className={styles.faqBox}>
            <FAQ title="FAQ" elements={payment} />
          </div>
        </section>
      </Container>
    </main>
  );
};
