import React, { useEffect, useState } from "react";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useStripe } from "@stripe/react-stripe-js";
import styles from "../BookForm/BookForm.module.scss";
import { createCheckoutSession } from "src/services/PaymentService";
import { useSelector } from "react-redux";

export const Payment = () => {
  const stripe = useStripe();
  const [clientSecret, setClientSecret] = useState("");
  const bookSession = useSelector((state: any) => state.book.bookSessionState);

  console.log("BOOK SESSION: ", bookSession);

  useEffect(() => {
    createCheckoutSession(bookSession).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, []);

  return (
    <section className={styles.wrapper}>
      <div className="book-payment-stripe">
        <EmbeddedCheckoutProvider stripe={stripe} options={{ clientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </section>
  );
};
