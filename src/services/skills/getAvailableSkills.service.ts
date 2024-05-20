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


const fetchMentorSkill = (query: string): Promise<DropdownOption[]> => {
    return new Promise((resolve, reject) => {
        axios.get('/api/mentor/get-all-skills')
            .then(response => {
                // Mapowanie odpowiedzi z backendu
                const data: DropdownOption[] = response.data.map((item: any) => ({
                    label: item.name,
                    value: item.id
                }));

                setTimeout(() => {
                    if (!query) {resolve([data[0], data[1]]);
                    } else {resolve(data.filter((element) => element.label.toLowerCase().includes(query.toLowerCase())));}},1000);
            })
            .catch(error => {
                console.error('Error fetching mentor skills:', error);
                reject({ success: false, error: 'Error' });
            });
    });
};


const getAvailableSkillsService = async (query: string, abortController: AbortController): Promise<DropdownOption[]> => {
    return fetchMentorSkill(query);
}

export default getAvailableSkillsService;