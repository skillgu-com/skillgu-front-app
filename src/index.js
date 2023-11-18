import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './scss/main.scss';
import axios from 'axios';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import rootReducer from './rootReducer';
import {PersistGate} from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import {persistStore, persistReducer} from 'redux-persist';

const persistConfig = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({
	reducer: persistedReducer,
	// ...
});

const persistor = persistStore(store);

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
		<PersistGate loading={null} persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>
);

reportWebVitals();
