import axios from "axios";


export const registerAccount = async (firstName, lastName, industry, email, password, agreement, selectedRole) => {
    return await axios
        .post('/api/user/register', {
            firstName: firstName,
            lastName: lastName,
            industry: industry,
            email: email,
            password: password,
            agreement: agreement,
            role: selectedRole
        });
}
export const loginUser = async (email, password) => {
    return await axios
        .post('api/auth/login', {
            email: email,
            password: password,
        });
}

export const loginGoogleUser = async (response) => {
    return await axios
        .post('api/auth/google-login', {
            tokenId: response
        });
}
