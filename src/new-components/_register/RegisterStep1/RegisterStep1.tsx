import React, {FC, useEffect, useMemo} from 'react';
import StepContentWrapper from "@newComponents/_register/StepContentWrapper/StepContentWrapper";
import Typography from "@mui/material/Typography";
import TextLink from "@newComponents/TextLink/TextLink";
import paths from "../../../paths";
import {SubmitHandler, useForm, UseFormSetValue} from "react-hook-form";
import FormInputText from "@newComponents/_form/FormInputText/FormInputText";
import {RegisterFormInput} from "@customTypes/registerFlow";
import emailCheckService from "../../../services/emailCheck/emailCheck.service";
import {BIG_SIGN_REGEX, NUM_REGEX} from "../../../helpers/improovedValidation";
import {Grid} from "@mui/material";
import FormInputCheckbox from "@newComponents/_form/FormInputCheckbox/FormInputCheckbox";
import useRegisterMentorContext from "../../../context/RegisterMentorContext";
import useRegisterMenteeContext from "../../../context/RegisterMenteeContext";
import {InputFeedbackProps} from "@newComponents/_form/InputFeedback/InputFeedback";
import registerMentorService from "../../../services/mentor/registerMentor.service";
import registerMenteeService from "../../../services/mentee/registerMentee.service";

type Props = {
    title: string,
    isMentor: boolean,
}

const GoToLogin = () => (
    <Typography textAlign='center' variant='body2'>Masz już konto?{' '}
        <TextLink typographyProps={{variant: 'body2'}} linkProps={{to: paths.login}}>Zaloguj się</TextLink>
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
        },
    });

    const goToNextStep: SubmitHandler<RegisterFormInput> = async (formData) => {
        if (isMentor) {
            registerMentorDispatch({
                type: 'COMMIT_REGISTER_INFO',
                payload: formData,
            })
        } else {
            const {success, error, data} = await registerMenteeService(formData);
            // TODO handle error
            if(data) {
                registerMenteeDispatch({
                    type: 'COMMIT_REGISTER_INFO',
                    payload: formData,
                })
                registerMenteeDispatch({
                    type: 'SET_USER_ID',
                    payload: data.userId
                })
            }

        }

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
            title={title}
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
                    inputProps={{placeholder: 'adres@email.com', type: 'email'}}
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

export default RegisterStep1;