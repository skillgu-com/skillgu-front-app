import {DropdownOption} from "@customTypes/dropdownOption";
import axios from "axios";

export const getAvailableLanguage = (): Promise<DropdownOption[]> => {
    return new Promise((resolve, reject) => {
        axios.get('/api/languages')

            .then(response => {
                const data: DropdownOption[] = response.data.map((item: DropdownOption) => ({
                    label: item.label,
                    value: item.value
                }));

                resolve(data);
            })
            .catch(error => {
                console.error('Error fetching mentor categories:', error);
                reject({success: false, error: 'Error'});
            });
    });
};

export default getAvailableLanguage;