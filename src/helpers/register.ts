// Libraries
import {NavigateFunction} from 'react-router-dom';
// Services
import {registerAccount} from '../services/AuthenticationService';
import paths from "../paths";

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
			navigate(paths.login);
		})
		.catch((err) => {
			console.log(err);
		});
};
