import React, {useEffect, useState} from "react";
import {EmbeddedCheckout, EmbeddedCheckoutProvider, useStripe,} from "@stripe/react-stripe-js";
import {useSelector} from "react-redux";
import {createCheckoutSubscription} from "@services/paymentService";

export const PaymentMentorship = () => {
    const stripe = useStripe();
    const [clientSecret, setClientSecret] = useState("");
    const bookSession = useSelector((state: any) => state.book.bookSessionState);

    const mockBookSession = {
        mentorId: 1,
        mentorshipId: 2,
        calendarEventId: [101, 102, 103],
    };


    useEffect(() => {
        createCheckoutSubscription(mockBookSession).then((res) => {
            setClientSecret(res.data.clientSecret);
        });
    }, [bookSession]);


    return (
        <div className="book-payment-stripe">
            <EmbeddedCheckoutProvider stripe={stripe} options={{clientSecret}}>
                <EmbeddedCheckout/>
            </EmbeddedCheckoutProvider>
        </div>
    );
};
