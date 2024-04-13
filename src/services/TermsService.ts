import { Terms } from '@customTypes/mentor'

export const fetchTerms = async () : Promise<Terms> => {
    const response = await fetch('/search-mentor-filters-mocked.json');
    const data = await response.json()
    return data as Terms;
}
