import React, {useEffect, useState} from "react";
import {createStripeAccount, createStripeAccountLink, getStripeAccount} from "@services/stripe/stripeService";


export const MentorPaymentIntegration = () => {
    const [connectedAccountId, setConnectedAccountId] = useState<string | null>(null);
    const [accountCreatePending, setAccountCreatePending] = useState(false);
    const [accountLinkCreatePending, setAccountLinkCreatePending] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchStripeAccount = async () => {
            try {
                const accountId = await getStripeAccount();
                setConnectedAccountId(accountId);
            } catch (error) {
                console.error('Error fetching Stripe account:', error);
            }
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
            console.error('Error creating Stripe account:', error);
            setError(true);
            setAccountCreatePending(false);
        }
    };

    const handleCreateAccountLink = async () => {
        try {
            setAccountLinkCreatePending(true);
            setError(false);

            if (!connectedAccountId) {
                throw new Error('No connected account id available'); // Obsługa błędu, jeśli nie ma ID konta
            }

            const url = await createStripeAccountLink(connectedAccountId);

            setAccountLinkCreatePending(false);

            if (url) {
                window.location.href = url; // Przekierowanie do Stripe
            } else {
                setError(true);
            }
        } catch (error) {
            console.error('Error creating Stripe account link:', error);
            setError(true);
            setAccountLinkCreatePending(false);
        }
    };

    return (
        <>
            <h1>Integrate with Stripe</h1>
            <div>
                {!connectedAccountId && !accountCreatePending && (
                    <button onClick={handleCreateAccount}>
                        Create an account!
                    </button>
                )}
                {connectedAccountId && !accountLinkCreatePending && (
                    <button onClick={handleCreateAccountLink}>
                        Integrate with Stripe
                    </button>
                )}
                {error && <p>Error occurred while processing your request.</p>}
            </div>
        </>
    );
};

export default MentorPaymentIntegration;
