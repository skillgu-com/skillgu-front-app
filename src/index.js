import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './scss/main.scss';
import axios from 'axios';
import {configureStore} from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import rootReducer from './rootReducer';


const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({
	reducer: rootReducer,
	// ...
});

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
console.log(process.env.REACT_APP_BASE_URL);

axios.interceptors.request.use(
	(config) => {
		if (localStorage.getItem('jwttoken')) {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${localStorage.getItem('jwttoken')}`,
			};
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

root.render(
	<Provider store={store}>
		<App />
	</Provider>
);

reportWebVitals();
