import {DropdownOption} from "@customTypes/dropdownOption";
import axios from "axios";

export const fetchMentorServices = (): Promise<DropdownOption[]> => {
    return new Promise((resolve, reject) => {
        axios.get('/api/mentor/get-all-mentor-services')
            .then(response => {
                const data: DropdownOption[] = response.data.map((item: any) => ({
                    label: item.name,
                    value: item.id
                }));
                resolve(data);
            })
            .catch(error => {
                console.error('Error fetching mentor categories:', error);
                reject({success: false, error: 'Error'});
            });
    });
};

const getAvailableServices = async (): Promise<DropdownOption[]> => {
    return fetchMentorServices();
}
export default getAvailableServices;