import React from "react";
import { LinksList, LinksListRow } from "src/components/FAQ/LinksList";
import clx from "classnames";
import styles from "../styles.module.scss";
import Button, { ButtonVariant } from "src/components/Button/Button";

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
    <div className={styles.wrapper}>
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
                <span className={styles.priceAmount}>{formattedPrice} zł</span>
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
