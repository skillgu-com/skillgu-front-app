import {DropdownOption} from "@customTypes/dropdownOption";


const mockResponse = (query: string): Promise<DropdownOption[]> => new Promise((resolve) => {
    const availableSkillsBase = [
        {label: 'Regularne spotkania', value: 'regular-meetings'},
        {label: 'Praca z zadaniami', value: 'task-work'},
        {label: 'Weekendowe spotkania', value: 'weekend-meetings'},
        {label: 'Tylko sesje', value: 'sessions-only'},
        {label: 'Intensywna praca', value: 'intensive-work'},
        {label: 'Chat', value: 'chat'},
        {label: 'Mentoring grupowy', value: 'group-mentoring'},
        {label: 'Warsztaty tematyczne', value: 'thematic-workshops'}
    ]
    setTimeout(() => {
        resolve(availableSkillsBase)
    }, 1000)
})

const getAvailableTagsService = async (query: string, abortController: AbortController): Promise<DropdownOption[]> => {
    return mockResponse(query);
}
export default getAvailableTagsService;