import React from "react";
import { LinksList, LinksListRow } from "src/components/FAQ/LinksList";
import clx from "classnames";
import styles from "../styles.module.scss";
import Button, { ButtonVariant } from "src/components/Button/Button";

type Props = {
  error: string;
  handleCreateAccount: () => void;
};

export const NotConnected = ({ error, handleCreateAccount }: Props) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Płatności</h1>
      <p className={styles.description}>
        Płatności na platformie obsługuje firma Stripe. Po kliknięciu w
        "Konfiguruj płatności", zostaniesz przekierowany do formularza
        konfiguracji. Stripe poprosi Cię o dane niezbędne do wypłacenia środków.
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
        <div className={styles.faqWrapper}>
          <LinksList title="FAQ: Wypłaty środków" className={styles.faq}>
            <LinksListRow
              text="Kiedy moje środki będą gotowe do wypłaty?"
              href="#"
            />
            <LinksListRow
              text="Kiedy moje środki będą gotowe do wypłaty?"
              href="#"
            />
            <LinksListRow
              text="Kiedy moje środki będą gotowe do wypłaty?"
              href="#"
            />
            <LinksListRow
              text="Kiedy moje środki będą gotowe do wypłaty?"
              href="#"
            />
          </LinksList>

          <LinksList title="Rozliczanie ze Skilguru" className={styles.faq}>
            <LinksListRow
              text="Jak rozliczyć się z zarobków na platformie Skillguru?"
              href="#"
            />
          </LinksList>
        </div>
      </div>
    </div>
  );
};
