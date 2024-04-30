export type SetNewPasswordInput = {
    password: string;
    repeatPassword: string;
    changeToken: string;
    userToken: string;
}

export type SetNewPasswordDTO = {
    password: string;
    token: string;
    userId: string;
}