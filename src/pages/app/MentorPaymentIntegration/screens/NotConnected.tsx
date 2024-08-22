import React from "react";
import clx from "classnames";
import styles from "../styles.module.scss";
import Button, { ButtonVariant } from "src/components/Button/Button";
import FAQ from "../../../../components/FAQ/Accordion/Accordion";
import { stripeIntegration } from "../../../../components/FAQ/Accordion/content/stripe-integration";
import { Box, CircularProgress } from "@mui/material";
import { Tag } from "@customTypes/tags";
import Container from "src/components/Container/Container";
import { Title } from "src/components/typography";
import { TitleTag, TitleVariant } from "src/components/typography/Title/Title";

type Props = {
  error: string;
  handleCreateAccount: () => void;
  accountCreatePending: boolean; // Dodany props dla stanu ładowania
};

export const NotConnected = ({
  error,
  handleCreateAccount,
  accountCreatePending,
}: Props) => {
  return (
    <Container as={Tag.Section} classes={styles.container}>
      <Title
        tag={TitleTag.h2}
        variant={TitleVariant.sectionConst}
        classes={styles.title}
      >
        Rozliczenia
      </Title>
      <p className={styles.description}>
        Płatności na platformie Skillgu obsługuje Stripe. Wybierz poniżej
        "Konfiguruj płatności", zostaniesz przekierowany do formularza Stripe,
        gdzie będziesz mógł podać dane, niezbędne do wypłacenia środków.
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
              {accountCreatePending ? (
                <Box
                  sx={{
                    display: "flex",
                    paddingTop: 6,
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress size={45} />
                </Box>
              ) : (
                <Button
                  onClick={handleCreateAccount}
                  fullWidth
                  variant={ButtonVariant.Primary}
                >
                  Konfiguruj płatności
                </Button>
              )}

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
  );
};
