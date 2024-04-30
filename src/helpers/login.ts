// Libraries
import {Dispatch, useEffect} from 'react';
import {NavigateFunction} from 'react-router-dom';
// Service
import {loginGoogleUser, loginUser} from '../services/AuthenticationService';
import {parseUserFromJwt} from './parseUserFromJwt';
import {fetchUserIDByEmail} from '../services/UserProfileService';

type SuccessResponse = { success: true, userData: ReturnType<typeof parseUserFromJwt> & { id: string } };
type ErrorResponse = { success: false, errorMessage: string };

type LoginReturn = Promise<SuccessResponse | ErrorResponse>;


const getStoreAndReturnUserData = async (userJWT: string, email: string, errorMsg: string): Promise<SuccessResponse> => {
    const userData = parseUserFromJwt(userJWT);

    if (!userData) throw Error(errorMsg);

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
}


export const loginUserByEmail = async (email: string, password: string, rememberMe: boolean): LoginReturn => {
    // TODO MENTEE
    // co z rememberMe?
    try {
        const {data: userJWT} = await loginUser(email, password);
        return getStoreAndReturnUserData(userJWT, email, 'Dane logowania są niepoprawne');
    } catch (err) {
        return {success: false, errorMessage: typeof err === 'string' ? err : 'Wystąpił problem z zalogowaniem'};
    }
}

export const loginUserByGoogle = async (email: string, token: string): LoginReturn => {
    try {
        const {data: userJWT} = await loginGoogleUser(token);
        return getStoreAndReturnUserData(userJWT, email, 'Nie udało się zalogować przez Google');
    } catch (err) {
        return {
            success: false,
            errorMessage: typeof err === 'string' ? err : 'Wystąpił problem z zalogowaniem przez Google'
        };
    }
};

export const logout = (dispatch: Dispatch<any>, navigate: NavigateFunction) => {
    localStorage.removeItem('jwttoken');
    dispatch({type: 'LOGOUT'});
    navigate('/login');
};


