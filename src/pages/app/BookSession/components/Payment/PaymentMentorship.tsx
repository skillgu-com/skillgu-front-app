import React, {useEffect, useState} from "react";
import {EmbeddedCheckout, EmbeddedCheckoutProvider, useStripe,} from "@stripe/react-stripe-js";
import {createCheckoutSubscription, MentorshipData} from "@services/paymentService";
import { useBookingReducer} from "../../../../../reducers/booking";

export const PaymentMentorship = () => {
    const stripe = useStripe();
    const [clientSecret, setClientSecret] = useState("");
    const [bookingState] = useBookingReducer();

    const prepareMentorshipDataRequest = (): MentorshipData => {
        const { mentorId, mentorshipId, subscriptionId,slots } = bookingState;

        const mentorshipDataRequest: MentorshipData = {
            mentorId:mentorId,
            mentorshipId:mentorshipId,
            calendarEventId: slots.map(slot => slot.id),
            subscriptionId: subscriptionId,
        };

        return mentorshipDataRequest;
    };

    const mentorshipDataRequest = prepareMentorshipDataRequest();

    useEffect(() => {
        createCheckoutSubscription(mentorshipDataRequest).then((res) => {
            setClientSecret(res.data.clientSecret);
        });
    }, [bookingState]);

    return (
        <div className="book-payment-stripe">
            <EmbeddedCheckoutProvider stripe={stripe} options={{clientSecret}}>
                <EmbeddedCheckout/>
            </EmbeddedCheckoutProvider>
        </div>
    );
};
