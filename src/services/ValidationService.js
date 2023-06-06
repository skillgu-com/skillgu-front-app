import axios from "axios";

export const existValidatePitchDeckURL = async (pitchDeckURL) => {
    return await axios.post('/api/validation/validate-pitchDeckURL', pitchDeckURL);
}