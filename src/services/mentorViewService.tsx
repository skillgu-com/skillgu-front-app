import axios from "axios";


export const getMentorProfileByID = async (mentorID: any) => {
    return await axios.get(`/api/mentor/get-mentor-by-mentor-id/${mentorID}`);

}
export const getMentorByUsername = async (username: any) => {
    console.log('pizda nad niebem: ', username)
    return await axios.get(`/api/mentor/get-mentor-by-mentor-username/${username}`);
}