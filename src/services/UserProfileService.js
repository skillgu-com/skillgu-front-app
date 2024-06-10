import axios from "axios";



export const fetchUserIDByEmail = async (email) => {
    return await axios.post(`/api/user/fetch-user-id-by-email/${email}`)
}

export const fetchAllUserData = async () => {
    return await axios.get('/api/user/setting/get-all-users-data');
}