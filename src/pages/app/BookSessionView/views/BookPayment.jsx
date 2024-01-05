import React, {useState, useEffect} from 'react';
import {EmbeddedCheckoutProvider, EmbeddedCheckout} from '@stripe/react-stripe-js';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {createCheckoutSession} from "../../../../services/PaymentService";

import { useStripe } from '@stripe/react-stripe-js';

const BookPayment = ({changeStepHandler}) => {
    const stripe = useStripe();
    const [clientSecret, setClientSecret] = useState('');
    const navigate = useNavigate();
    const userFromRedux = useSelector(
        (state) => state.connectionProcess.sessionStep
    );


    const sessionData = {
        mentorID: userFromRedux.mentorID,
        sessionTypeID: userFromRedux.sessionTypeID,
        sessionName: userFromRedux.sessionName,
        sessionPrice: userFromRedux.sessionPrice
    };

    useEffect(() => {
        createCheckoutSession(sessionData).then(res => {
            console.log(sessionData)
            setClientSecret(res.data.clientSecret)

        });

    }, []);

    if (!clientSecret) {
        return <div>Loading...</div>; // or some loading indicator
    }

    return (
        <div className='book-payment-wrapper'>
            <div className='book-payment-container'>
                <div className='book-payment__submit'>
                    <button
                        onClick={() => changeStepHandler(1)}
                        className='book-payment__submit-button'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            height='48'
                            viewBox='0 -960 960 960'
                            width='48'>
                            <path d='m274-450 248 248-42 42-320-320 320-320 42 42-248 248h526v60H274Z'/>
                        </svg>
                        <span>Cofnij</span>
                    </button>
                    <h2 className='book-payment__submit-session-name'>
                        Nazwa sesji: {userFromRedux.sessionName}
                    </h2>
                    <h3 className='book-payment__submit-session-price'>
                        Cena sesji: {userFromRedux.sessionPrice} zł
                    </h3>
                    <h4 className='book-payment__submit-session-submit'>
                        Czas sesji ({userFromRedux.sessionMinutes} minut) z mentorem
                    </h4>
                    <div className='book-payment__submit-image'>
                        <img
                            src='https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg'
                            alt='mentor'
                        />
                    </div>
                </div>
            </div>
            <div className='book-payment-stripe'>
                <EmbeddedCheckoutProvider stripe={stripe} options={{clientSecret}}>
                    <EmbeddedCheckout/>
                </EmbeddedCheckoutProvider>
            </div>
        </div>
    );
};

export default BookPayment;