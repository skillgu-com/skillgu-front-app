import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

import { Connected, NotConnected } from "./screens";
import { Loader } from "src/components/_grouped/loader";

import {
  createStripeAccount,
  createStripeAccountLink,
  getBalance,
  getStripeAccount,
} from "@services/stripe/stripeService";
import Button from "src/components/Button/Button";
import FAQ from "src/components/FAQ/Accordion/Accordion";
import { stripeIntegration } from "src/components/FAQ/Accordion/content/stripe-integration";
import { payment } from "src/components/FAQ/Accordion/content/payment";

import styles from "./styles.module.scss";
import Container from "src/components/Container/Container";
import { Tag } from "@customTypes/tags";

export const MentorPaymentIntegration = () => {
  const [price, setPrice] = useState(0);

  const [initialDataPending, setInitialDataPending] = useState<boolean>(true);
  const [connectedAccountId, setConnectedAccountId] = useState<string | null>(
    null
  );
  const [accountCreatePending, setAccountCreatePending] = useState(false);
  const [accountLinkCreatePending, setAccountLinkCreatePending] =
    useState(false);
  const [error, setError] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchStripeAccount = async () => {
      try {
        const accountId = await getStripeAccount();
        setConnectedAccountId(accountId);
        setInitialDataPending(false);
      } catch (error) {
        console.error("Error fetching Stripe account:", error);
      }
      setInitialDataPending(false);
    };

    fetchStripeAccount();
  }, []);

  const handleCreateAccount = async () => {
    try {
      setAccountCreatePending(true);
      setError(false);

      const account = await createStripeAccount(); // Załóżmy, że createStripeAccount zwraca accountId

      setAccountCreatePending(false);

      if (account) {
        setConnectedAccountId(account);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error creating Stripe account:", error);
      setError(true);
      setAccountCreatePending(false);
    }
  };

  const handleCreateAccountLink = async () => {
    setAccountLinkCreatePending(true);
    setError(false);
    try {
      if (!connectedAccountId) {
        throw new Error("No connected account id available"); // Obsługa błędu, jeśli nie ma ID konta
      }

      const url = await createStripeAccountLink(connectedAccountId);

      if (!url) {
        throw new Error("Empty stripe url");
      }

      // navigate(url);
      window.location.href = url;
    } catch (error) {
      console.error("Error creating Stripe account link:", error);
      setError(true);
    }
    setAccountLinkCreatePending(false);
  };

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balance = await getBalance();
        setPrice(balance);
      } catch (error) {
        console.error("Error retrieving balance:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBalance();
  }, []);

  return (
    <main>
      <Loader
        open={accountLinkCreatePending || initialDataPending}
        spinner
        shadow
        overlay="global"
        spinnerSize="lg"
      />

      {connectedAccountId ? (
        <Connected
          price={price}
          error={error ? "Error occurred while processing your request." : ""}
          handleCreateAccountLink={handleCreateAccountLink}
        />
      ) : null}

      {!connectedAccountId && !initialDataPending ? (
        <NotConnected
          error={error ? "Error occurred while processing your request." : ""}
          handleCreateAccount={handleCreateAccount}
          accountCreatePending={accountCreatePending} // Przekazanie stanu ładowania
        />
      ) : null}
      <Container as={Tag.Section} classes={styles.faqSection}>
        <div className={styles.faqContainer}>
          <div className={styles.faqHeader}>
            <h4 className={styles.faqTitle}>Najczęściej zadawane pytania</h4>
            <p className={styles.faqSubtitle}>
              Nie znalazłeś odpowiedzi na swoje pytanie? Napisz do nas, a
              odpowiemy najszybciej jak to możliwe.
            </p>
            <Button classes={styles.faqBtn}>Wyślij zapytanie</Button>
          </div>
          <FAQ
            className={styles.faq}
            title=""
            elements={connectedAccountId ? payment : stripeIntegration}
          />
        </div>
      </Container>
    </main>
  );
};
export default MentorPaymentIntegration;
