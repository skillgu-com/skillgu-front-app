import React, {FC, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom'

import StepContentWrapper from "@newComponents/_register/StepContentWrapper/StepContentWrapper";
import {VerificationFormInput} from "@customTypes/registerFlow";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import useRegisterMentorContext from "../../../context/RegisterMentorContext";
import Typography from "@mui/material/Typography";
import {Button, Collapse, TextField} from "@mui/material";
import verifyEmailAddressService, {
    VerificationResponse
} from "../../../services/verifyEmailAddress/verifyEmailAddress.service";
import {
    StyledInputsWrapper, StyledFallbackWrapper
} from "@newComponents/_register/RegisterStep5/RegisterStep5.styles";
import InputFeedback from "@newComponents/_form/InputFeedback/InputFeedback";
import useRegisterMenteeContext from "../../../context/RegisterMenteeContext";
import {buildAfterRegisterLin} from "src/pages/app/SearchMentors/utils";


type InputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const SendAgain = () => {
    const resend = () => {
    }

    return (
        <Typography textAlign='center' variant='body2'>Nie dostałeś kodu?{' '}
            <Button
                onClick={resend}
                component={Button}
                size='small'
                sx={{padding: '4px'}}
                variant='text'
                color='secondary'
            >
                Wyślij ponownie
            </Button>
        </Typography>
    );
}

const formId = 'VerificationFormInput'


const validateSingleInput = (event: InputEvent, actionOnValidInput: () => void): InputEvent => {
    // regex to allow only digits and empty string
    const isProperInput = /^(\d|)$/.test(event.target.value)
    if (!isProperInput) event.target.value = event.target.value.slice(-1);
    if (event.target.value) actionOnValidInput();
    return event;
}


type Props = {
    isMentor: boolean,
}

const RegisterStep5: FC<Props> = ({isMentor}) => {
    const navigate = useNavigate()
    const {registerMentorDispatch, registerMentorState} = useRegisterMentorContext();
    const {registerMenteeState, registerMenteeDispatch} = useRegisterMenteeContext();

    const {stateSource, stateDispatcher} = useMemo(() => {
        if (isMentor) {
            return {stateSource: registerMentorState, stateDispatcher: registerMentorDispatch}
        } else {
            return {stateSource: registerMenteeState, stateDispatcher: registerMenteeDispatch}
        }
    }, [isMentor, registerMentorState, registerMenteeState, registerMenteeDispatch, registerMentorDispatch])


    const [isLoading, setIsLoading] = useState(false)

    const {control, formState, handleSubmit, setFocus} = useForm<VerificationFormInput>({
        defaultValues: {
            num1: '',
            num2: '',
            num3: '',
            num4: '',
        },
    });


    const verifyCode: SubmitHandler<VerificationFormInput> = async (formData) => {
        if (stateSource.userId) {
            setIsLoading(true);

            const verificationResponse: VerificationResponse = await verifyEmailAddressService(formData, stateSource.userId);

            if (verificationResponse.body.success) {
                stateDispatcher({type: 'FLUSH_STATE'});
                const linkAfterVerification = buildAfterRegisterLin();
                navigate(linkAfterVerification);
            } else {
                if (verificationResponse.body.errorCode === 401) {
                } else if (verificationResponse.body.errorCode === 400) {
                    console.log(verificationResponse.body.message)
                } else {
                    console.log(verificationResponse.body.message)
                }
            }
            setIsLoading(false);
        }
    };

    return (
        <StepContentWrapper
            title="Zweryfikuj swój e-mail"
            subtitle='Wysłaliśmy na Twój e-mail kod weryfikacyjny. Wprowadź go poniżej.'
            ctaProps={{
                type: 'submit',
                form: formId,
                disabled: (!formState.isValid && formState.isSubmitted) || isLoading,
            }}
            ctaLabel='Weryfikuj e-mail'
            additionalActionComponent={<SendAgain/>}
        >
            <form id={formId} onSubmit={handleSubmit(verifyCode)}>
                <StyledInputsWrapper>
                    <Controller
                        name='num1'
                        control={control}
                        rules={{required: true}}
                        render={({field: {ref, ...field}}) => <TextField
                            {...field}
                            inputRef={ref}
                            disabled={isLoading}
                            onChange={(event) => {
                                const onValidInput = () => {
                                    setTimeout(() => setFocus('num2'), 0)
                                }
                                const newEvent = validateSingleInput(event, onValidInput)
                                field.onChange(newEvent);
                            }}
                        />}
                    />
                    <Controller
                        name='num2'
                        control={control}
                        rules={{required: true}}
                        render={({field: {ref, ...field}}) => <TextField
                            {...field}
                            inputRef={ref}
                            disabled={isLoading}
                            onChange={(event) => {
                                const onValidInput = () => setTimeout(() => setFocus('num3'), 0)
                                field.onChange(validateSingleInput(event, onValidInput));
                            }}
                        />}
                    />
                    <Controller
                        name='num3'
                        control={control}
                        rules={{required: true}}
                        render={({field: {ref, ...field}}) => <TextField
                            {...field}
                            inputRef={ref}
                            disabled={isLoading}
                            onChange={(event) => {
                                const onValidInput = () => setTimeout(() => setFocus('num4'), 0)
                                field.onChange(validateSingleInput(event, onValidInput));
                            }}
                        />}
                    />
                    <Controller
                        name='num4'
                        control={control}
                        rules={{required: true}}
                        render={({field: {ref, ...field}}) => <TextField
                            {...field}
                            inputRef={ref}
                            disabled={isLoading}
                            onChange={(event) => {
                                const onValidInput = () => setTimeout(handleSubmit(verifyCode), 0)
                                field.onChange(validateSingleInput(event, onValidInput));
                            }}
                        />}
                    />
                    <StyledFallbackWrapper>
                        <Collapse in={!formState.isValid && formState.isSubmitted}>
                            <InputFeedback message={'Podaj cały wymagany kod'} severity='error'/>
                        </Collapse>
                    </StyledFallbackWrapper>
                </StyledInputsWrapper>

            </form>
        </StepContentWrapper>
    )
}

export default RegisterStep5;