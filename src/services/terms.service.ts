import axios from "axios";
import {Terms} from "@customTypes/terms";

export const fetchTerms = async () : Promise<Terms> => {
    const response = await axios.get('/api/terms/fetch-all');
    return response.data;
}
