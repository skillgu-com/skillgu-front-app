import {DropdownOption} from "@customTypes/dropdownOption";
import axios from "axios";


export const fetchMentorCategory = (query: string): Promise<DropdownOption[]> => {
    return new Promise((resolve, reject) => {
        axios.get('/api/mentor/get-all-mentor-category')
            .then(response => {
                const data: DropdownOption[] = response.data.map((item: any) => ({
                    label: item.name,
                    value: item.name
                }));
                resolve(data);
            })
            .catch(error => {
                console.error('Error fetching mentor categories:', error);
                reject({success: false, error: 'Error'});
            });
    });
};

const getAvailableCategoriesService = async (query: string, abortController: AbortController): Promise<DropdownOption[]> => {
    return fetchMentorCategory(query);
}
export default getAvailableCategoriesService;