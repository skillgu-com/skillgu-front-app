import type {MentorCategoryT} from "@services/dictionaries/sessionCategoriesDictionary/sessionCategoriesDictionary.data";
import {DropdownOption} from "@customTypes/dropdownOption";
import parseDictionaryToDropdown from "@services/dictionaries/_helpers/parseDictionaryToDropdown";
import sessionTypesDictionaryData from "@services/dictionaries/sessionTypesDictionary/sessionTypesDictionary.data";

const getSessionTypesDictionary = async (category: (MentorCategoryT | '')): Promise<DropdownOption<undefined>[]> => {
    // Implemented as Promise to make it easier to move to API call
    return new Promise((resolve) => {
        if(!category) return [];
        resolve(parseDictionaryToDropdown(sessionTypesDictionaryData[category]));
    });
}

export default getSessionTypesDictionary;