import React, {FC, useMemo} from 'react';
import Typography from "@mui/material/Typography";
import paths, {pathAnchors} from "../../../paths";
import {SubmitHandler, useForm} from "react-hook-form";
import {RegisterFormInput, UserConsentDTO} from "@customTypes/registerFlow";
import emailCheckService from "../../../services/emailCheck/emailCheck.service";
import {Grid} from "@mui/material";
import useRegisterMentorContext from "../../../context/RegisterMentorContext";
import useRegisterMenteeContext from "../../../context/RegisterMenteeContext";
import registerMenteeService from "../../../services/mentee/registerMentee.service";
import usePasswordValidation from "../../../hooks/usePasswordValidation";
import StepContentWrapper from "../StepContentWrapper/StepContentWrapper";
import FormInputText from "../../_form/FormInputText/FormInputText";
import TextLink from "../../TextLink/TextLink";
import CheckboxWithLinkOption from "../../_form/_FormCheckboxesWithLinksDynamic/CheckboxWithLinkOption";

type Props = {
    title: string,
    isMentor: boolean,
}

const GoToLogin = ({isMentor}: {isMentor: boolean}) => (
    <Typography textAlign='center' variant='body2'>Masz już konto?{' '}
        <TextLink
            typographyProps={{variant: 'body2'}}
            linkProps={{to: { path: paths.login, hash: isMentor ? pathAnchors.loginView.mentor : pathAnchors.loginView.mentee }}}
        >
            Zaloguj się
        </TextLink>
    </Typography>
);

const formId = 'RegisterFormInput';

const RegisterStep1: FC<Props> = ({title, isMentor}) => {
    const {registerMentorState, registerMentorDispatch} = useRegisterMentorContext();
    const {registerMenteeState, registerMenteeDispatch} = useRegisterMenteeContext();

    const dataSource = useMemo(() => {
        return isMentor ? registerMentorState.formData : registerMenteeState.formData
    }, [isMentor, registerMentorState, registerMenteeState])

    const {control, formState, handleSubmit, watch} = useForm<RegisterFormInput>({
        defaultValues: {
            firstName: dataSource.firstName || '',
            lastName: dataSource.lastName || '',
            email: dataSource.email || '',
            password: dataSource.password || '',
            acceptRules: dataSource.acceptRules || false,
            userConsents: dataSource.userConsents || [],
        },
    });

    const getCheckboxOptions = async (query: string, abortController: AbortController) => {
        return [
            {
                consentType: "privacyPolicy",
                label: (
                    <>
                        Akceptuję <a href="https://www.skillgu.com/policy" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>Politykę prywatności</a>.
                    </>
                )
            },
            {
                consentType: "termsOfService",
                label: (
                    <>
                        Oświadczam, że znam i akceptuję postanowienia <a href="https://www.skillgu.com/terms" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>Regulaminu</a> świadczenia usług dla użytkowników Skillgu.com
                    </>
                )
            },
            {
                consentType: "newsletter",
                label: (
                    <>
                        Chcę otrzymywać newsletter Skillgu.com
                    </>
                )
            },
        ];
    };

    const mapToUserConsents = (selectedOptions: any[]): UserConsentDTO[] => {
        return [
            {
                consentType: "privacyPolicy",
                accepted: selectedOptions.some(option => option.consentType === "privacyPolicy")
            },
            {
                consentType: "newsletter",
                accepted: selectedOptions.some(option => option.consentType === "newsletter")
            },
            {
                consentType: "termsOfService",
                accepted: selectedOptions.some(option => option.consentType === "termsOfService")
            }
        ];
    };
    const goToNextStep: SubmitHandler<RegisterFormInput> = async (formData) => {
        formData.userConsents = mapToUserConsents(formData.userConsents);

        if (isMentor) {
            registerMentorDispatch({
                type: 'COMMIT_REGISTER_INFO',
                payload: formData,
            })
        } else {
            const {success, error, data} = await registerMenteeService(formData);
            if(data) {
                registerMenteeDispatch({
                    type: 'COMMIT_REGISTER_INFO',
                    payload: formData,
                })
                registerMenteeDispatch({
                    type: 'SET_USER_ID',
                    payload: data
                })
            }
        }
    };

    const passwordValue = watch("password");
    const { passwordFeedback, isPasswordValid } = usePasswordValidation(passwordValue);

    return (
        <StepContentWrapper
            ctaProps={{
                type: 'submit',
                disabled: (!formState.isValid || !isPasswordValid) && formState.isSubmitted,
                form: formId
            }}
            title={title}
            additionalActionComponent={<GoToLogin isMentor={isMentor} />}
        >
            <form noValidate id={formId} onSubmit={handleSubmit(goToNextStep)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <FormInputText<RegisterFormInput>
                            formState={formState}
                            label='Imię'
                            name='firstName'
                            control={control}
                            inputProps={{placeholder: 'Imię'}}
                            controllerProps={{rules: {required: 'Imię jest wymagane'}}}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormInputText<RegisterFormInput>
                            formState={formState}
                            label='Nazwisko'
                            name='lastName'
                            control={control}
                            inputProps={{placeholder: 'Nazwisko'}}
                            controllerProps={{rules: {required: 'Nazwisko jest wymagane'}}}
                        />
                    </Grid>
                </Grid>
                <FormInputText<RegisterFormInput>
                    formState={formState}
                    label='Email'
                    name='email'
                    control={control}
                    inputProps={{placeholder: 'adres@email.com', type: 'email'}}
                    controllerProps={{
                        rules: {
                            required: 'Email jest wymagany',
                            pattern: {value: /\S+@\S+\.\S+/, message: 'Niepoprawny email'},
                            validate: async (value) => {
                                const isEmailAvailable = await emailCheckService(value.toString());
                                return isEmailAvailable || 'Email jest już zajęty'
                            }
                        }
                    }}
                />
                <FormInputText<RegisterFormInput>
                    formState={formState}
                    label='Hasło'
                    name='password'
                    control={control}
                    inputProps={{placeholder: 'Hasło', type: 'password'}}
                    controllerProps={{rules: {required: 'Hasło jest wymagane'}}}
                    customFeedback={passwordFeedback}
                />
                <CheckboxWithLinkOption<RegisterFormInput>
                    name="userConsents"
                    control={control}
                    formState={formState}
                    getOptions={getCheckboxOptions}
                    controllerProps={{
                        rules: {
                            validate: (selectedTerms: any) => {
                                if (!Array.isArray(selectedTerms)) {
                                    return 'Musisz wybrać odpowiednie opcje.';
                                }

                                const requiredTerms = ["termsOfService", "privacyPolicy"];
                                const hasAllRequired = requiredTerms.every(term =>
                                    selectedTerms.some(selected => selected.consentType === term)
                                );

                                if (!hasAllRequired) {
                                    return 'Musisz zaakceptować Regulamin serwisu oraz Politykę prywatności.';
                                }
                                return true;
                            }
                        }
                    }}
                />

            </form>
        </StepContentWrapper>
    )
}
export default RegisterStep1;
