import React, {useEffect, useState} from "react";
import {EmbeddedCheckout, EmbeddedCheckoutProvider, useStripe,} from "@stripe/react-stripe-js";
import {useSelector} from "react-redux";
import { createCheckoutSession} from "@services/paymentService";
import {CombinedData} from "@customTypes/mentorship";

export const Payment = () => {
    const stripe = useStripe();
    const [clientSecret, setClientSecret] = useState("");
    const bookSession = useSelector((state: any) => state.book.bookSessionState);
    const customerEmail = useSelector((state: any) => state.booking.customerEmail);
    const customerPhone = useSelector((state: any) => state.booking.customerPhone);
    const customerMessage = useSelector((state: any) => state.booking.customerMessage);
    const GuestMentee = useSelector((state: any) => state.booking.teamMembers);

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
        guestMentee: GuestMentee || [],
        hour: bookSession.hour,
        term: bookSession.term
    };

    useEffect(() => {
        createCheckoutSession(combinedData).then((res) => {
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
