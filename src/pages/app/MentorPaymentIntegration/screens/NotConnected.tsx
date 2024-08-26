import React from "react";
import clx from "classnames";

import Button, { ButtonVariant } from "src/components/Button/Button";
import FAQ from "src/components/FAQ/Accordion/Accordion";
import { stripeIntegration } from "src/components/FAQ/Accordion/content/stripe-integration";
import { Box, CircularProgress } from "@mui/material";
import { SectionTemplate } from "src/components/SectionTemplate";

import styles from "../styles.module.scss";
import { StripeSvg } from "@icons/StripeSvg";

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
    <SectionTemplate
      title="Rozliczenia"
      description='Płatności na platformie Skillgu obsługuje Stripe. Wybierz poniżej "Konfiguruj płatności", zostaniesz przekierowany do formularza Stripe, gdzie będziesz mógł podać dane, niezbędne do wypłacenia środków.'
      additionalContent={<div className={styles.stripeContainer}><StripeSvg/></div>}
    >
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
    </SectionTemplate>
  );
};
