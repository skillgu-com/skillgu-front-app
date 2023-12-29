// Libraries
import {NavigateFunction} from 'react-router-dom';
// Services
import {registerAccount} from '../services/AuthenticationService';

export const register = (
	firstName: string,
	lastName: string,
	email: string,
	password: string,
	agreement: boolean,
	navigate: NavigateFunction
) => {
	registerAccount(firstName, lastName, email, password, agreement)
		.then((res) => {
			navigate('/login');
		})
		.catch((err) => {
			console.log(err);
		});
};
