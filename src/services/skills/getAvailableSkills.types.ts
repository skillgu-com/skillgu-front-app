import {DropdownOption} from "@customTypes/dropdownOption";


const availableSkillsBase = [
    {label: 'UI/UX designer', value: 'ui/ux'},
    {label: 'React dev', value: 'react'},
    {label: 'Movie creator', value: 'movies'},
    {label: 'Business', value: 'business'},
]

const getAvailableSkills = (query: string): Promise<DropdownOption[]> => new Promise((resolve) => {

    setTimeout(() => {
        // if no query return most popular skills
        if (!query) resolve([availableSkillsBase[0], availableSkillsBase[1]]);
        resolve(availableSkillsBase.filter((film) => film.label.toLowerCase().includes(query.toLowerCase())))
    }, 1000)
})