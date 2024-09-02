import React, {useEffect, useState} from "react";
import {EmbeddedCheckout, EmbeddedCheckoutProvider, useStripe,} from "@stripe/react-stripe-js";
import {useSelector} from "react-redux";
import {CombinedData, createCheckoutSession} from "@services/paymentService";

export const Payment = () => {
  const stripe = useStripe();
  const [clientSecret, setClientSecret] = useState("");
  const bookSession = useSelector((state: any) => state.book.bookSessionState);
  const customerEmail = useSelector((state: any) => state.booking.customerEmail);
  const customerPhone = useSelector((state: any) => state.booking.customerPhone);
  const customerMessage = useSelector((state: any) => state.booking.customerMessage);
  const teamMembers = useSelector((state: any) => state.booking.teamMembers);

  const combinedData: CombinedData = {
    sessionID: bookSession.sessionID,
    name: bookSession.name,
    time: bookSession.time,
    sessionPrice: bookSession.sessionPrice,
    description: bookSession.description,
    mentorID: bookSession.mentorID,
    calendarEventId: bookSession.calendarEventId,
    customerEmail: customerEmail || '',
    customerPhone: customerPhone || '',
    customerMessage: customerMessage || '',
    teamMembers: teamMembers || []
  };

  console.log(combinedData);
  useEffect(() => {
    createCheckoutSession(bookSession).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [bookSession]);

  return (
      <div className="book-payment-stripe">
        <EmbeddedCheckoutProvider stripe={stripe} options={{ clientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
  );
};
