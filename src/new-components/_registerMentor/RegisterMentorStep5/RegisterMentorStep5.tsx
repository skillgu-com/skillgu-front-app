import React, {useState} from 'react';
import StepContentWrapper from "@newComponents/_registerMentor/StepContentWrapper/StepContentWrapper";
import {VerificationFormInput} from "@customTypes/mentorRegister";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import useRegisterMentorContext from "../../../context/RegisterMentorContext";
import Typography from "@mui/material/Typography";
import {Button, Collapse, TextField} from "@mui/material";
import verifyEmailAddressService from "../../../services/verifyEmailAddress/verifyEmailAddress.service";
import {
    StyledInputsWrapper, StyledFallbackWrapper
} from "@newComponents/_registerMentor/RegisterMentorStep5/RegisterMentorStep5.styles";
import InputFeedback from "@newComponents/_form/InputFeedback/InputFeedback";

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

const RegisterMentorStep5 = () => {
    const {registerMentorDispatch, registerMentorState} = useRegisterMentorContext();


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
        if (registerMentorState.userId) {
            setIsLoading(true);
            await verifyEmailAddressService(formData, registerMentorState?.userId)
            // after successful verification
            // registerMentorDispatch({type: 'FLUSH_STATE'});
            setIsLoading(false);
        }
        //     TODO handle error
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

export default RegisterMentorStep5;