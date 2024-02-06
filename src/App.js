import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
// Components
import AppLayout from './new-components/AppLayout/AppLayout';
import SimpleLayout from './new-components/SimpleLayout/SimpleLayout';
// Pages
import AuthContextProvider from './context/AuthContextProvider';
import routes from './routes';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function App() {
	const screen = (hasLayout, hasSimpleLayout, element) =>
		!!hasLayout ? (
			<AppLayout>{element}</AppLayout>
		) : !!hasSimpleLayout ? (
			<SimpleLayout>{element}</SimpleLayout>
		) : (
			<>{element}</>
		);

	return (
		<BrowserRouter>
			<AuthContextProvider>
				<Elements stripe={stripePromise}>
					<Routes>
						{routes.map(
							({isProtected, hasSimpleLayout, path, element, id, hasLayout}) => (
								<Route
									key={id}
									path={path}
									element={
										isProtected ? (
											<ProtectedRoute>
												{screen(hasLayout, hasSimpleLayout, element)}
											</ProtectedRoute>
										) : (
											screen(hasLayout, hasSimpleLayout, element)
										)
									}
								/>
							)
						)}
					</Routes>
				</Elements>
			</AuthContextProvider>
		</BrowserRouter>
	);
}

const ProtectedRoute = (props) => {
	const isAuthenticated = !!localStorage.getItem('jwttoken');

	return isAuthenticated ? props.children : <Navigate to='/login' replace />;
};

export default App;
