import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
// Pages
import AuthContextProvider from './context/AuthContextProvider';

import routes from './routes';
import AppLayout from './new-components/AppLayout/AppLayout'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);


function App() {
    const screen = (hasLayout, element) =>
        !!hasLayout ? <AppLayout>{element}</AppLayout> : <>{element}</>;

    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Elements stripe={stripePromise}>
                    <Routes>
                        {routes.map(({isProtected, path, element, id, hasLayout}) => (
                            <Route
                                key={id}
                                path={path}
                                element={
                                    isProtected ? (
                                        <ProtectedRoute>{screen(hasLayout, element)}</ProtectedRoute>
                                    ) : (
                                        screen(hasLayout, element)
                                    )
                                }
                            />
                        ))}
                    </Routes>
                </Elements>
            </AuthContextProvider>
        </BrowserRouter>
    );
}

const ProtectedRoute = (props) => {
    const isAuthenticated = !!localStorage.getItem('jwttoken');

    return isAuthenticated ? props.children : <Navigate to='/login' replace/>;
};

export default App;
