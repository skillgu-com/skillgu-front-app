import {DropdownOption} from "@customTypes/dropdownOption";

const parseDictionaryToDropdown = (object: Record<string, string>): DropdownOption<undefined>[] => {
    return Object.entries(object).map(([key, value]) => ({
        value: key,
        label: value
    }));
};

export default parseDictionaryToDropdown;