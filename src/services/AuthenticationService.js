import axios from "axios";

export const registerAccount = async (firstName, lastName, email, password, agreement) => {
    return await axios
        .post('/api/auth/student/register', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            agreement: agreement,
        });
}
export const loginUser = async (email, password) => {
    return await axios
        .post('api/auth/login', {
            email: email,
            password: password,
        });
}

export const loginGoogleUser = async (token) => {
    return await axios
        .post('api/auth/google-login', {
            tokenId: token
        });
}