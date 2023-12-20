import axios from "axios";


export const getAllSkills = async () => {
    return await axios.get('/api/mentor/get-all-skills');
}

export const getAllCategories = async () => {
    return await axios.get('/api/mentor/get-all-category');
}


export const getAllFilteredMentors = async (user) => {
    console.log(user)
    return await axios.post('/api/mentor/filtered-mentors',user);
}


