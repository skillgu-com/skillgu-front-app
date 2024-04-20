import {EmailCheckDTO, EmailCheckInput, EmailCheckOutput} from "./emailCheck.types";
import axios from "axios";

const parseDataForAPI = (data: EmailCheckInput): EmailCheckDTO  => data;

const emailCheckService = (emailToCheck: EmailCheckInput): Promise<EmailCheckOutput> => {
    return axios.post('EP/here', parseDataForAPI(emailToCheck))
}

export default emailCheckService;