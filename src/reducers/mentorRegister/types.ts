import {
    AboutFormInput,
    MergedRegisterFormInput,
    PortfolioFormInput,
    ProfileFormInput,
    RegisterFormInput
} from "@customTypes/mentorRegister";

export type MentorRegisterReducerState = {
    step: number,
    userId: string | null,
    formData: MergedRegisterFormInput
};

export type MentorRegisterReducerAction =
    | {
    type: 'COMMIT_REGISTER_INFO';
    payload: RegisterFormInput;
}
    | {
    type: 'COMMIT_ABOUT_INFO';
    payload: AboutFormInput;
}
    | {
    type: 'COMMIT_PROFILE_INFO';
    payload: ProfileFormInput;
}
    | {
    type: 'COMMIT_PORTFOLIO_INFO';
    payload: PortfolioFormInput;
}
    | {
    type: 'FLUSH_STATE'
}
    | {
    type: 'SET_USER_ID';
    payload: string;
};