import axios from "axios";


export const registerAccount = async (firstName, lastName, industry, email, password, agreement) => {
    return await axios
        .post('/auth/register', {
            firstName: firstName,
            lastName: lastName,
            industry: industry,
            email: email,
            password: password,
            agreement: agreement
        });
}

export const loginUser = async (email, password) => {
    return await axios
        .post('/auth/login', {
            email: email,
            password: password,
        });
}