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

export const getAllMentorStudents = async () => {
    return await axios.get('/api/user/get-all-mentor-students');
}


export const getUserProfile = async (userID) => {
    return await axios.get(`/api/user/get-user-profile/${userID}`);
}

export const getUserProfileByEmail = async  (email) => {
    return await axios.get(`/api/user/user-profile/${email}`);
}

