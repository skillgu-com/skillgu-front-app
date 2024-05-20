import {DropdownOption} from "@customTypes/dropdownOption";


const mockResponse = (query: string): Promise<DropdownOption[]> => new Promise((resolve) => {
    const availableSkillsBase = [
        {label: 'UI/UX designer', value: 'ui/ux'},
        {label: 'React dev', value: 'react'},
        {label: 'Movie creator', value: 'movies'},
        {label: 'Business', value: 'business'},
    ]
    setTimeout(() => {
        resolve(availableSkillsBase)
    }, 1000)
})

const getAvailableTopicsService = async (query: string, abortController: AbortController): Promise<DropdownOption[]> => {
    return mockResponse(query);
}

// /get-all-mentoring-topics
export default getAvailableTopicsService;