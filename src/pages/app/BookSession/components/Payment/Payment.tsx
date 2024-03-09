import React, {useEffect, useState} from 'react';
import {EmbeddedCheckoutProvider, EmbeddedCheckout} from '@stripe/react-stripe-js';
import {useStripe} from '@stripe/react-stripe-js';
import FAQ from 'src/new-components/FAQ/Accordion';
import styles from '../BookForm/BookForm.module.scss';
import {createCheckoutSession} from 'src/services/PaymentService';
import {useSelector} from "react-redux";

const Payment = () => {
    const stripe = useStripe();
    const [clientSecret, setClientSecret] = useState('');
    const bookSession = useSelector((state: any) => state.book.bookSessionState);

    console.log(bookSession)

    useEffect(() => {
        createCheckoutSession(bookSession).then((res) => {
            setClientSecret(res.data.clientSecret);
        });
    }, []);

    return (
        <section className={styles.wrapper}>
            <div className='book-payment-stripe'>
                <EmbeddedCheckoutProvider stripe={stripe} options={{clientSecret}}>
                    <EmbeddedCheckout/>
                </EmbeddedCheckoutProvider>
            </div>
            <FAQ
                elements={[
                    {
                        id: '01',
                        title: 'Jak mogę się zarejestrować na stronie?',
                        description:
                            'Aby się zarejestrować, kliknij przycisk „Zarejestruj się” znajdujący się w prawym górnym rogu strony głównej. Następnie wypełnij formularz rejestracyjny swoimi danymi, takimi jak adres e-mail i hasło, i postępuj zgodnie z instrukcjami weryfikacji. Po zakończeniu procesu rejestracji otrzymasz e-mail z linkiem aktywacyjnym. Kliknij w link, aby aktywować swoje konto.',
                    },
                    {
                        id: '02',
                        title: 'Czy mogę zmienić swoje hasło?',
                        description:
                            'Tak, zmiana hasła jest możliwa w każdej chwili. Aby to zrobić, zaloguj się na swoje konto, a następnie przejdź do sekcji „Ustawienia konta” lub „Moje konto”. Znajdziesz tam opcję „Zmień hasło”. Kliknij w nią i postępuj zgodnie z instrukcjami, aby ustawić nowe hasło. Zalecamy wybór silnego hasła, które zawiera kombinację liter, cyfr i symboli, aby zwiększyć bezpieczeństwo Twojego konta.',
                    },
                    {
                        id: '03',
                        title: 'Jak odstąpić od płatności?',
                        description:
                            'Tak, zmiana hasła jest możliwa w każdej chwili. Aby to zrobić, zaloguj się na swoje konto, a następnie przejdź do sekcji „Ustawienia konta” lub „Moje konto”. Znajdziesz tam opcję „Zmień hasło”. Kliknij w nią i postępuj zgodnie z instrukcjami, aby ustawić nowe hasło. Zalecamy wybór silnego hasła, które zawiera kombinację liter, cyfr i symboli, aby zwiększyć bezpieczeństwo Twojego konta.',
                    },
                ]}
            />
        </section>
    );
};

export default Payment;
