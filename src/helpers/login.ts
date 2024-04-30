// Libraries
import {Dispatch, useEffect} from 'react';
import {NavigateFunction} from 'react-router-dom';
// Service
import {loginGoogleUser, loginUser} from '../services/AuthenticationService';
import {parseUserFromJwt} from './parseUserFromJwt';
import {fetchUserIDByEmail} from '../services/UserProfileService';

type LoginUserByEmailReturn = Promise<
    | { success: true, userData: ReturnType<typeof parseUserFromJwt> & { id: string } }
    | { success: false, errorMessage: string }
>

export const loginUserByEmail = async (email: string, password: string, rememberMe: boolean): LoginUserByEmailReturn => {
    // TODO MENTEE
    // co z rememberMe?
    try {
        const {data: userJWT} = await loginUser(email, password);
        const userData = parseUserFromJwt(userJWT);

        if (!userData) throw Error('Dane logowania są niepoprawne');

        const {data: userId} = await fetchUserIDByEmail(email)

        localStorage.setItem('jwttoken', userJWT);
        return {
            success: true,
            userData: {
                id: userId,
                email: userData?.email,
                role: userData?.role[0],
            }
        };

    } catch (err) {
        return { success: false, errorMessage: typeof err === 'string' ? err : 'Wystąpił problem z zalogowaniem' };
    }
}

export const loginGoogle = async (email: string, token: string, dispatch: Dispatch<any>, navigate: NavigateFunction) => {
    try {
        const res = await loginGoogleUser(token);
        const userData = parseUserFromJwt(res.data.body);
        if (!userData) {
            return;
        }

        const idResponse = await fetchUserIDByEmail(userData.email);
        dispatch({
            type: 'LOGIN-GOOGLE_SUCCESS',
            payload: {
                id: idResponse?.data,
                email: userData.email,
                role: userData.role[0],
            },
        });

        localStorage.setItem('jwttoken', res.data.body);
        navigate('/home');
    } catch (err) {
        console.error(err);
    }
};

export const logout = (dispatch: Dispatch<any>, navigate: NavigateFunction) => {
    localStorage.removeItem('jwttoken');
    dispatch({type: 'LOGOUT'});
    navigate('/login');
};


