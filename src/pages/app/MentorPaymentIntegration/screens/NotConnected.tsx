import React from "react";
import clx from "classnames";

import { Box, CircularProgress } from "@mui/material";
import { SectionTemplate } from "src/components/SectionTemplate";

import styles from "../styles.module.scss";

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
        <div className={styles.stripeContainer}>{/*<StripeSvg />*/}</div>
      }
    >
      <div className={clx(styles.cols2, styles.cols2Reverse)}>
        <div className={styles.imgCtaWrapper}>
          <div
            className={styles.imgCtaBox}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: accountCreatePending ? "60px" : "0px", // Zarezerwowanie miejsca
                transition: "width 0.3s ease", // Dodanie płynnej animacji zmiany szerokości
                marginRight: "24px", // Większy margines między loaderem a obrazkiem
              }}
            >
              {accountCreatePending && <CircularProgress size={45} />}
            </Box>
            <img
              width="400px"
              height="400px"
              src="/images/m00430360-stripe.svg"
              alt="woman payment"
              onClick={handleCreateAccount}
              style={{ cursor: "pointer" }}
            />
          </div>
          {error && (
            <p className={styles.error}>
              Error occurred while processing your request.
            </p>
          )}
        </div>
      </div>
    </SectionTemplate>
  );
};
