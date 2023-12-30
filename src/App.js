import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
// Pages
import AuthContextProvider from './context/AuthContextProvider';

import routes from './routes';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_test_51ONE6SIhrdFvuFOceDIubeZWQ6hGTYF5gaFtfg1FIg2iMRpmdZ9d6MQQaKNuEWBCUJOLGLIr1lc5Dp8CcgZ9FhHk002z9EwYZy');


function App() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Elements stripe={stripePromise}>
                    <Routes>
                        {routes.map(({isProtected, path, element, id}) => (
                            <Route
                                key={id}
                                path={path}
                                element={
                                    isProtected ? <ProtectedRoute>{element}</ProtectedRoute> : element
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
