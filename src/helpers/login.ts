// Libraries
import {Dispatch} from 'react';
import {NavigateFunction} from 'react-router-dom';
// Service
import {loginGoogleUser, loginUser} from '../services/AuthenticationService';
import {parseUserFromJwt} from './parseUserFromJwt';
import {updateUser} from '../services/UserProfileService';

export const login = (
	email: string,
	password: string,
	dispatch: Dispatch<any>,
	navigate: NavigateFunction
) => {
	loginUser(email, password)
		.then((res) => {
			const userData = parseUserFromJwt(res.data);

			if (!!!userData) return;

			const userSender = {
				email: email,
			};
			updateUser(userSender).then((idResponse) => {
				dispatch({
					type: 'LOGIN',
					payload: {
						id: idResponse.data,
						email: userData.email,
						role: userData.role[0],
					},
				});
			});
			localStorage.setItem('jwttoken', res.data);
			navigate('/home');
		})
		.catch((err) => {
			console.log(err);
		});
};

export const loginGoogle = (
	email: string,
	token: any,
	dispatch: Dispatch<any>,
	navigate: NavigateFunction
) => {
	loginGoogleUser(token)
		.then((res) => {
			const userData = parseUserFromJwt(res.data.body);
			if (!!!userData) return;
			const userSender = {
				email: email,
			};
			updateUser(userSender).then((idResponse) => {
				dispatch({
					type: 'LOGIN-GOOGLE_SUCCESS',
					payload: {
						id: idResponse.data,
						email: userData.email,
						role: userData.role[0],
					},
				});
			});
			localStorage.setItem('jwttoken', res.data.body);
			navigate('/home');
		})
		.catch((err) => {
			console.error(err);
		});
};

export const logout = (dispatch: Dispatch<any>, navigate: NavigateFunction) => {
	localStorage.removeItem('jwttoken');
	dispatch({type: 'LOGOUT'});
	navigate('/login');
};
