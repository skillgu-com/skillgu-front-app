import axios from "axios";


export const getAllSkills = async () => {
    return await axios.get('/api/mentor/get-all-skills');
}

export const getAllMentorCategories = async () => {
    return await axios.get('/api/mentor/get-all-mentor-category');
}

export const getAllSessionTypes = async () => {
    return await axios.get('/api/mentor/get-all-session-type');
}

export const getAllMentoringTopics = async () => {
    return await axios.get('/api/mentor/get-all-mentoring-topics');
}

export const getAllFilteredMentors = async (user) => {
    return await axios.post('/api/mentor/filtered-mentors', user);
}

export const getAllMentorServices = async () => {
    return await axios.get('/api/mentor/get-all-mentor-services');
}

export const getMentorProfileByID = async (mentorID) => {
    return await axios.get(`/api/mentor/get-mentor-by-mentor-id/${mentorID}`);
}