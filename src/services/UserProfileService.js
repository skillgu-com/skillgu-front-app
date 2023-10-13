import axios from "axios";


export const getClientUser = async () => {

    return await axios.get('/api/user/get-user');

}

export const getAllClientUsers = async () => {

    return await axios.get('/api/user/get-all-users');

}

export const getClientUserUUID = async (uuid) => {

    return await axios.get(`/api/user/get-client-user/${uuid}`);

}

export const getAllUsersWithRoles = async () => {
    return await axios.get('/api/user/users-with-roles');
}

export const getUserProfile = async (userData) => {
    return await axios.post('/api/user/get-user-profile', userData);

}

export const getUserProfileByEmail = async (email) => {
    return await axios.get(`/api/user/user-profile/${email}`);
}

export const getLoggedProfileByEmail = async (userData) => {
    return await axios.post('/api/user/get-logged-profile', userData);
}

export const getAllMentors = async () => {
    return await axios.get(`/api/user/get-all-mentors`);
}

export const updateUser = async (email) => {
    return await axios.post('/api/user/update-user-by-id', email)
}
