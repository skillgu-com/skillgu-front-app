import {DropdownOption} from "@customTypes/dropdownOption";
import axios from "axios";


const mockResponse = (query: string): Promise<DropdownOption[]> => new Promise((resolve) => {
    const availableSkillsBase = [
        {label: 'UI/UX designer', value: 'ui/ux'},
        {label: 'React dev', value: 'react'},
        {label: 'Movie creator', value: 'movies'},
        {label: 'Business', value: 'business'},
    ]
    setTimeout(() => {
        // if no query return most popular skills
        if (!query) resolve([availableSkillsBase[0], availableSkillsBase[1]]);
        resolve(availableSkillsBase.filter((film) => film.label.toLowerCase().includes(query.toLowerCase())))
    }, 1000)
})

const getAvailableSkillsService = async (query: string, abortController: AbortController): Promise<DropdownOption[]> => {
    return mockResponse(query);
    // proper code:

    const response = await axios.get('someEP/here', {
        signal: abortController.signal,
    });

    return response.data;
}
export default getAvailableSkillsService;