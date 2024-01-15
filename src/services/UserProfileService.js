import axios from "axios";

export const findRelatedUsersBasedOnRole = async () => {
    return await axios.get('/api/user/related-users');
}

export const getClientUser = async () => {
    return await axios.get('/api/user/get-user');

}

export const getAllClientUsers = async () => {
    return await axios.get('/api/user/get-all-users');

}

export const getClientUserUUID = async (uuid) => {
    return await axios.get(`/api/user/get-client-user/${uuid}`);

}

export const getUserProfile = async (userData) => {
    return await axios.post('/api/user/get-user-profile', userData);
}

export const getUserProfileByEmail = async (email) => {
    return await axios.get(`/api/user/user-profile/${email}`);
}

export const fetchUserProfileByEmail = async (userData) => {
    return await axios.post('/api/user/fetch-user-profile-by-email', userData);
}

export const getAllMentors = async () => {
    return await axios.get(`/api/mentor/get-all-mentors`);
}

export const updateUser = async (email) => {
    return await axios.post('/api/user/update-user-by-id', email)
}

export const settingUser = async (userSettingState) => {
    return await axios.patch('/api/user/setting-user', userSettingState)
}

export const fetchAllUserData = async () => {
    return await axios.get('/api/user/setting/get-all-users-data');
}