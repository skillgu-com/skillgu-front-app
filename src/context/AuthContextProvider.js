import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import axios from 'axios';

import {
	loginGoogleUser,
	loginUser,
	registerAccount,
} from '../services/AuthenticationService';
import {fetchUserIDByEmail} from '../services/UserProfileService';
import {googleCalendar} from '../services/GoogleService';
import { parseUserFromJwt } from 'src/helpers/parseUserFromJwt';

export const AuthContext = createContext({
	//TODO czy to ponizej wyszarzone jest do wywalenia?
	user: {email: '', role: '', id: ''},
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
	loginGoogle: (prop1, prop2) => {},
	logout: () => {},
});

// TODO AuthContextProvider do wyrzucenia, poniewaz duplikuje sie z login.ts !!!!!!!!!!!!!!!
// TODO AuthContextProvider do wyrzucenia, poniewaz duplikuje sie z login.ts !!!!!!!!!!!!!!!
// TODO AuthContextProvider do wyrzucenia, poniewaz duplikuje sie z login.ts !!!!!!!!!!!!!!!
// TODO AuthContextProvider do wyrzucenia, poniewaz duplikuje sie z login.ts !!!!!!!!!!!!!!!
// TODO AuthContextProvider do wyrzucenia, poniewaz duplikuje sie z login.ts !!!!!!!!!!!!!!!
// TODO AuthContextProvider do wyrzucenia, poniewaz duplikuje sie z login.ts !!!!!!!!!!!!!!!
// TODO AuthContextProvider do wyrzucenia, poniewaz duplikuje sie z login.ts !!!!!!!!!!!!!!!
// TODO AuthContextProvider do wyrzucenia, poniewaz duplikuje sie z login.ts !!!!!!!!!!!!!!!
const AuthContextProvider = (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [token, setToken] = useState('');
	const [user, setUser] = useState(token ? parseUserFromJwt(token) : null);

	useEffect(() => {
		setToken(localStorage.getItem('jwttoken'));
	}, []);

	const login = (email, password) => {
		loginUser(email, password)
			.then((res) => {
				const userData = parseUserFromJwt(res.data);
				const userSender = {
					email: email,
				};
				fetchUserIDByEmail(email).then((idResponse) => {
					dispatch({
						type: 'LOGIN',
						payload: {
							id: idResponse.data,
							email: userData.email,
							role: userData.role,
						},
					});
				});
				localStorage.setItem('jwttoken', res.data);
				setUser(userData);
				navigate('/home');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const loginGoogle = (response, email) => {
		loginGoogleUser(response)
			.then((res) => {
				const userData = parseUserFromJwt(res.data.body);
				const userSender = {
					email: email,
				};
				fetchUserIDByEmail(userSender).then((idResponse) => {
					dispatch({
						type: 'LOGIN-GOOGLE_SUCCESS',
						payload: {
							id: idResponse.data,
							email: userData.email,
							role: userData.role,
						},
					});
				});
				localStorage.setItem('jwttoken', res.data.body);
				setUser(userData);
				navigate('/home');
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const register = (
		firstName,
		lastName,
		email,
		password,
		agreement,
	) => {
		registerAccount(
			firstName,
			lastName,
			email,
			password,
			agreement,
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
		dispatch({type: 'LOGOUT'});
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

	const value = {user, login, register, logout, loginGoogle};

	return (
		<AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
	);
};

export default AuthContextProvider;
