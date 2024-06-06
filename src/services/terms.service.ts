import { Terms } from '@customTypes/mentor'
import axios from "axios";

// export const fetchTerms = async () : Promise<Terms> => {
//     const response = await fetch('/search-mentor-filters-mocked.json');
//     const data = await response.json()
//     return data as Terms;
// }


export const fetchTerms = async () : Promise<Terms> => {
    const response = await axios.get('/api/terms/fetch-all');

    console.log('fetchTerms response: ' , response.data)
    return response.data;
}
