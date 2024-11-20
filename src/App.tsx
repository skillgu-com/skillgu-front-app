import React, { FC, ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// Components
import AppLayout from "./components/AppLayout/AppLayout";
// Pages
import routes from "./routes";
import theme from "./styles/theme";
import { GlobalStyles, ThemeProvider } from "@mui/material";
import { LayoutVersion } from "@customTypes/layoutVersion";
import paths from "./paths";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthContextProvider from "./context/AuthContextProvider";
import { ConfirmationModalProvider } from "./context/ConfirmationModalContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { pl } from "date-fns/locale/pl";
import globalStylesOverride from "./styles/globalStylesOverride";
import AuthLayout from "./components/_layouts/AuthLayout/AuthLayout";
import SimpleLayout from "./components/SimpleLayout/SimpleLayout";
import LocationChangeListener from "./components/LocationChangeListener/LocationChangeListener";

const stripeKey = process.env.REACT_APP_STRIPE_KEY;

if (!stripeKey)
  throw new Error("Stripe key not provided, check environment variables");
const stripePromise = loadStripe(stripeKey);
// console.log("App working under server: ", process.env.REACT_APP_BASE_URL);
const ResolveLayout = ({
  children,
  version,
}: {
  children: ReactNode;
  version: LayoutVersion;
}) => {
  switch (version) {
    case "none":
      return <>{children}</>;
    case "simple":
      return <SimpleLayout>{children}</SimpleLayout>;
    case "auth":
      return <AuthLayout>{children}</AuthLayout>;
    case "default":
      return <AppLayout>{children}</AppLayout>;
  }
};


const queryClient = new QueryClient();
function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyles styles={globalStylesOverride} />
          <ConfirmationModalProvider>
            <SnackbarProvider maxSnack={3} style={{ fontSize: "14px" }}>
              <BrowserRouter>
                <LocationChangeListener />
                <AuthContextProvider>
                  <Elements stripe={stripePromise}>
                    <Routes>
                      {routes.map(
                        ({ isProtected, path, element, id, layoutVersion }) => (
                          <Route
                            key={id}
                            path={path}
                            element={
                              <ResolveLayout version={layoutVersion}>
                                {isProtected ? (
                                  <ProtectedRoute>{element}</ProtectedRoute>
                                ) : (
                                  element
                                )}
                              </ResolveLayout>
                            }
                          />
                        )
                      )}
                    </Routes>
                  </Elements>
                </AuthContextProvider>
              </BrowserRouter>
            </SnackbarProvider>
          </ConfirmationModalProvider>
        </ThemeProvider>
        {process.env.REACT_APP_SHOW_RQ_DEVTOOLS && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </LocalizationProvider>
  );
}

const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("jwttoken");
  if (!isAuthenticated) return <Navigate to={paths.login} replace />;
  return <>{children}</>;
};

export default App;
