import { DropdownOption } from "@customTypes/dropdownOption";
import axios from "axios";

export const getAvailableTimezone = async (): Promise<DropdownOption[]> => {
  try {
    const response = await axios.get('/api/timezones');
    return response.data.map((t: string) => ({
      value: t,
      label: t,
    }));
  } catch (error) {
    console.error('Error fetching timezones:', error);
    throw error;
  }
};
export default getAvailableTimezone;
