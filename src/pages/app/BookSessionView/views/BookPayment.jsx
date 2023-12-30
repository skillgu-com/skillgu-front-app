import React, {useState, useEffect} from 'react';
import {EmbeddedCheckoutProvider, EmbeddedCheckout} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js";
import {testStripePayment} from "../../../../services/Payment";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const stripePromise = loadStripe('pk_test_51ONE6SIhrdFvuFOceDIubeZWQ6hGTYF5gaFtfg1FIg2iMRpmdZ9d6MQQaKNuEWBCUJOLGLIr1lc5Dp8CcgZ9FhHk002z9EwYZy');

const BookPayment = ({changeStepHandler}) => {
    const [clientSecret, setClientSecret] = useState('');
    const navigate = useNavigate();
    const userFromRedux = useSelector(
        (state) => state.connectionProcess.sessionStep
    );

    const createSessionRequest = {
        mentorID: userFromRedux.mentorID,
        sessionTypeID: userFromRedux.sessionTypeID,
    };


    useEffect(() => {
        testStripePayment().then(res => {
            setClientSecret(res.data.clientSecret)
            // res.json())
        });

    }, []);


    if (!clientSecret) {
        console.log(clientSecret);
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
                <EmbeddedCheckoutProvider stripe={stripePromise} options={{clientSecret}}>}
                    <EmbeddedCheckout/>
                </EmbeddedCheckoutProvider>
            </div>
        </div>
    );
};


export default BookPayment;