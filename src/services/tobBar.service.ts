import axios from "axios";

export const fetchUserImageFile = async (userId: number) => {
   return  await axios.get(`/api/file/files/${userId}`);
}