import React, {useMemo} from 'react';
import StepContentWrapper from "@newComponents/_registerMentor/StepContentWrapper/StepContentWrapper";
import Typography from "@mui/material/Typography";
import TextLink from "@newComponents/TextLink/TextLink";
import paths from "../../../paths";
import {SubmitHandler, useForm} from "react-hook-form";
import FormInputText from "@newComponents/_form/FormInputText/FormInputText";
import {RegisterFormInput} from "@customTypes/mentorRegister";
import emailCheckService from "../../../services/emailCheck/emailCheck.service";
import {BIG_SIGN_REGEX, NUM_REGEX} from "../../../helpers/improovedValidation";
import {Grid} from "@mui/material";
import FormInputCheckbox from "@newComponents/_form/FormInputCheckbox/FormInputCheckbox";
import useRegisterMentorContext from "../../../context/RegisterMentorContext";
import {InputFeedbackProps} from "@newComponents/_form/InputFeedback/InputFeedback";


const GoToLogin = () => (
    <Typography textAlign='center' variant='body2'>Masz już konto?{' '}
        <TextLink typographyProps={{variant: 'body2'}} linkProps={{to: paths.login}}>Zaloguj się</TextLink>
    </Typography>
);

const formId = 'RegisterFormInput'

const RegisterMentorStep1 = () => {
    const { registerMentorDispatch } = useRegisterMentorContext();

    const {control, formState, handleSubmit, watch} = useForm<RegisterFormInput>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            acceptRules: false,
        },
    });

    const goToNextStep: SubmitHandler<RegisterFormInput> = (formData) => {
        registerMentorDispatch({
            type: 'COMMIT_REGISTER_INFO',
            payload: formData,
        })
    };

    // TODO consider to create a custom hook for feedback logic
    const passwordValue = watch("password");
    const passwordFeedback: InputFeedbackProps[] | undefined = useMemo(() => {
        if (!passwordValue) return undefined;
        return [
            {
                message: 'Hasło musi mieć co najmniej 8 znaków',
                severity: passwordValue.length >= 8 ? 'success' : 'error'
            },
            {
                message: 'Hasło musi zawierać co najmniej 1 liczbę',
                severity: NUM_REGEX.test(passwordValue) ? 'success' : 'error'
            },
            {
                message: 'Hasło musi zawierać co najmniej 1 dużą literę',
                severity: BIG_SIGN_REGEX.test(passwordValue) ? 'success' : 'error'
            },
        ]
    }, [passwordValue]);
    const isPasswordValid = useMemo(() => passwordFeedback?.every(feedback => feedback.severity === 'success'), [passwordFeedback]);

    return (
        <StepContentWrapper
            ctaProps={{
                type: 'submit',
                disabled: (!formState.isValid || !isPasswordValid) && formState.isSubmitted,
                form: formId
            }}
            title={'Zarejestruj sie jako mentor'}
            additionalActionComponent={<GoToLogin/>}
        >
            <form id={formId} onSubmit={handleSubmit(goToNextStep)}>
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
                    inputProps={{placeholder: 'adres@email.com'}}
                    controllerProps={{
                        rules: {
                            required: 'Email jest wymagany',
                            pattern: {value: /\S+@\S+\.\S+/, message: 'Niepoprawny email'},
                            validate: async (value) => {
                                const isEmailAvailable = await emailCheckService(value.toString());
                                console.log('Z backendu leci: ', isEmailAvailable)
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
                <FormInputCheckbox<RegisterFormInput>
                    control={control}
                    formState={formState}
                    label='Akceptuję regulamin'
                    name='acceptRules'
                    controllerProps={{rules: {required: 'Zgoda wymagana'}}}
                />
            </form>
        </StepContentWrapper>
    )
}

export default RegisterMentorStep1;