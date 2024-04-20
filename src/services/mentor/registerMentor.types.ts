export type RegisterFormInput = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    acceptRules: boolean,
};

export type AboutFormInput = {};

export type ProfileFormInput = {};

export type PortfolioFormInput = {};

export type VerificationFormInput = {};

// That's how we use data on FE
export type MergedRegisterFormInput = RegisterFormInput & AboutFormInput & ProfileFormInput & PortfolioFormInput;

// That's Data Transfer Object
export type RegisterMentorDTO = {};
