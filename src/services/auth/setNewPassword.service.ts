import {SetNewPasswordDTO, SetNewPasswordInput} from "./setNewPassword.types";
import axios from "axios";

const inputParser = (input: SetNewPasswordInput): SetNewPasswordDTO => {
    return {
        password: input.password,
        token: input.changeToken,
        userId: input.userToken
    }
}

type SetNewPasswordServiceResponse = Promise<
    | { success: true }
    | { success: false, errorMessage: string }
>

const setNewPasswordService = async (inputData: SetNewPasswordInput): SetNewPasswordServiceResponse => {
    // TODO MENTEE
    try {
        const { status } = await axios.post('/auth/set-new-password', inputParser(inputData));

        console.log(status)
        if(!status || status >= 300) throw 'Coś poszło nie tak';
        return { success: true };
    } catch (e) {
        return { success: false, errorMessage: typeof e === 'string' ? e : 'Coś poszło nie tak' };
    }
}

export  default setNewPasswordService