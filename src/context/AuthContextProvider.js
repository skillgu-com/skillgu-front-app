import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { loginUser, registerAccount } from '../services/AuthenticationService';

export const AuthContext = createContext({
	user: { email: '', role: '' },
	login: (email, password) => {},
	register: (
		firstName,
		lastName,
		industry,
		email,
		password,
		agreement,
		selectedRole
	) => {},
});

const AuthContextProvider = (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [token, setToken] = useState('');
	const [user, setUser] = useState(token ? _parseUserFromJwt(token) : null);

	useEffect(() => {
		setToken(localStorage.getItem('jwttoken'));
	}, []);

	const login = (email, password) => {
		loginUser(email, password)
			.then((res) => {
				dispatch({ type: 'LOGIN', payload: _parseUserFromJwt(res.data) });
				localStorage.setItem('jwttoken', res.data);
				setUser(_parseUserFromJwt(res.data));
				navigate('/home');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const register = (
		firstName,
		lastName,
		industry,
		email,
		password,
		agreement,
		selectedRole
	) => {
		registerAccount(
			firstName,
			lastName,
			industry,
			email,
			password,
			agreement,
			selectedRole
		)
			.then((res) => {
				navigate('/login');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const logout = () => {
		localStorage.removeItem('jwttoken');
		setUser(null);
		dispatch({ type: 'LOGOUT' });
		navigate('/');
	};

	useEffect(() => {
		const interceptor = axios.interceptors.response.use(
			(response) => {
				return response;
			},
			(error) => {
				if (error.response.status === 401) {
					//TODO: in future try to use here refresh token and resend previous request
					logout();
				}
				return error;
			}
		);

		return () => {
			axios.interceptors.response.eject(interceptor);
		};
	}, []);

	const value = { user, login, register, logout };

	return (
		<AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
	);
};

const _parseUserFromJwt = (token) => {
	if (token) {
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace(/-/g, '+')?.replace(/_/g, '/');
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split('')
				.map((c) => {
					return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
				})
				.join('')
		);
		const payload = JSON.parse(jsonPayload);
		return {
			email: payload.sub,
			role: payload?.role,
		};
	}
	return null;
};

export default AuthContextProvider;
