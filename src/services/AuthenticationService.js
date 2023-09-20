import axios from "axios";


export const registerAccount = async (firstName, lastName, industry, email, password, agreement, selectedRole) => {
    return await axios
        .post('/api/mentor/register', {
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
        .post('api/mentor/login-mentor', {
            email: email,
            password: password,
        });
}
