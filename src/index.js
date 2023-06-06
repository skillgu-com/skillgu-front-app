import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './scss/main.scss';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));

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

root.render(<App />);

reportWebVitals();
