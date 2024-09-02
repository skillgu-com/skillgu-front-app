import React from "react";
import clx from "classnames";

import FAQ from "src/components/FAQ/Accordion/Accordion";
import { stripeIntegration } from "src/components/FAQ/Accordion/content/stripe-integration";
import { Box, CircularProgress } from "@mui/material";
import { SectionTemplate } from "src/components/SectionTemplate";

import styles from "../styles.module.scss";
import { StripeSvg } from "@icons/StripeSvg";

type Props = {
  error: string;
  handleCreateAccount: () => void;
  accountCreatePending: boolean;
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
          additionalContent={
            <div className={styles.stripeContainer}>
              {/*<StripeSvg />*/}
            </div>
          }
      >
        <div className={clx(styles.cols2, styles.cols2Reverse)}>
          <div className={styles.imgCtaWrapper}>
            <div className={styles.imgCtaBox}>
              <img
                  width="400px"
                  height="400px"
                  src="/images/m00430360-stripe.svg"
                  alt="woman payment"
                  onClick={handleCreateAccount}
                  style={{ cursor: "pointer" }}
              />
              <div>
                {accountCreatePending && (
                    <Box
                        sx={{
                          display: "flex",
                          paddingTop: 6,
                          justifyContent: "center",
                        }}
                    >
                      <CircularProgress size={45} />
                    </Box>
                )}

                {error && <p className={styles.error}>Error occurred while processing your request.</p>}
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
