import sessionCategoriesDictionaryData
    from "@services/dictionaries/sessionCategoriesDictionary/sessionCategoriesDictionary.data";
import {DropdownOption} from "@customTypes/dropdownOption";
import parseDictionaryToDropdown from "@services/dictionaries/_helpers/parseDictionaryToDropdown";

const getSessionCategoriesDictionary = async (): Promise<DropdownOption<undefined>[]> => {
    // Implemented as Promise to make it easier to move to API call
    return new Promise((resolve) => {
        resolve(parseDictionaryToDropdown(sessionCategoriesDictionaryData));
    });
}
export default getSessionCategoriesDictionary;