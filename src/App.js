import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
// Pages
import AuthContextProvider from './context/AuthContextProvider';

import routes from './routes';

function App() {
	return (
		<BrowserRouter>
			<AuthContextProvider>
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
			</AuthContextProvider>
		</BrowserRouter>
	);
}

const ProtectedRoute = (props) => {
	const isAuthenticated = !!localStorage.getItem('jwttoken');

	return isAuthenticated ? props.children : <Navigate to='/login' replace />;
};

export default App;
