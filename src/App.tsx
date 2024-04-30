import React, {FC, ReactNode} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
// Components
import AppLayout from './new-components/AppLayout/AppLayout';
import SimpleLayout from './new-components/SimpleLayout/SimpleLayout';
// Pages
import AuthContextProvider from './context/AuthContextProvider';
import routes from './routes';
import theme from "./styles/theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {LayoutVersion} from "@customTypes/layoutVersion";
import exhaustiveGuard from "./helpers/exhaustiveGuard";
import AuthLayout from "@newComponents/_layouts/AuthLayout/AuthLayout";
import paths from "./paths";
import {SnackbarProvider} from "notistack";

const stripeKey = process.env.REACT_APP_STRIPE_KEY;
if (!stripeKey) throw new Error('Stripe key not provided, check environment variables');
const stripePromise = loadStripe(stripeKey);

const resolveLayout = (children: ReactNode, layoutVersion: LayoutVersion): ReactNode => {
    switch (layoutVersion) {
        case 'none':
            return <>{children}</>;
        case 'simple':
            return <SimpleLayout>{children}</SimpleLayout>;
        case 'auth':
            return <AuthLayout>{children}</AuthLayout>;
        case 'default':
            return <AppLayout>{children}</AppLayout>;
        default:
            exhaustiveGuard(layoutVersion);
    }
}

function App() {

    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3} style={{ fontSize: '14px'}}>
                <CssBaseline/>
                <BrowserRouter>
                    <AuthContextProvider>
                        <Elements stripe={stripePromise}>
                            <Routes>
                                {routes.map(
                                    ({isProtected, path, element, id, layoutVersion}) => (
                                        <Route
                                            key={id}
                                            path={path}
                                            element={
                                                isProtected ? (
                                                    <ProtectedRoute>
                                                        {resolveLayout(element, layoutVersion)}
                                                    </ProtectedRoute>
                                                ) : (
                                                    resolveLayout(element, layoutVersion)
                                                )
                                            }
                                        />
                                    )
                                )}
                            </Routes>
                        </Elements>
                    </AuthContextProvider>
                </BrowserRouter>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

const ProtectedRoute: FC<{ children: ReactNode }> = ({children}) => {
    const isAuthenticated = !!localStorage.getItem('jwttoken');

    if (!isAuthenticated) return <Navigate to={paths.login} replace/>
    return <>{children}</>
};

export default App;
