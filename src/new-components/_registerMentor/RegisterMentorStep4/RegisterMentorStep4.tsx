import React from 'react';
import StepContentWrapper from "@newComponents/_registerMentor/StepContentWrapper/StepContentWrapper";
import {PortfolioFormInput} from "@customTypes/mentorRegister";
import {SubmitHandler, useForm} from "react-hook-form";
import useRegisterMentorContext from "../../../context/RegisterMentorContext";
import FormInputText from "@newComponents/_form/FormInputText/FormInputText";
import registerMentorService from "../../../services/mentor/registerMentor.service";

const formId = 'PortfolioFormInput'

const RegisterMentorStep4 = () => {
    const {registerMentorDispatch, registerMentorState} = useRegisterMentorContext();

    const {control, formState, handleSubmit} = useForm<PortfolioFormInput>({
        defaultValues: {
            personalWebsite: registerMentorState.formData.personalWebsite || '',
            linkedin: registerMentorState.formData.linkedin || '',
            twitter: registerMentorState.formData.twitter || '',
            github: registerMentorState.formData.github || '',
            dribble: registerMentorState.formData.dribble || '',
            behance: registerMentorState.formData.behance || '',
        },
    });

    const createUserAndGoToNextStep: SubmitHandler<PortfolioFormInput> = async (formData) => {
        const {success, error, data} = await registerMentorService({...registerMentorState.formData, ...formData})

        registerMentorDispatch({
            type: 'COMMIT_PORTFOLIO_INFO',
            payload: formData,
        })
    };

        // TODO handle error for user
        // if (!success) console.error(error)
        //
        // if (data) {
        //     registerMentorDispatch({
        //         type: 'SET_USER_ID',
        //         payload: data.userId
        //     })
    //         registerMentorDispatch({
    //             type: 'COMMIT_PORTFOLIO_INFO',
    //             payload: formData,
    //         })
    //     }
    //
    // };

    return (
        <StepContentWrapper
            title="Już prawie gotowe!"
            subtitle='A teraz podaj nam o sobie trochę informacji, abyśmy mogli lepiej Ciebie poznać.'
            step={{current: 3, count: 4}}
            ctaProps={{
                type: 'submit',
                form: formId,
                disabled: !formState.isValid && formState.isSubmitted,
            }}
        >
            <form id={formId} onSubmit={handleSubmit(createUserAndGoToNextStep)}>
                <FormInputText<PortfolioFormInput>
                    label='Twoja strona'
                    name='personalWebsite'
                    control={control}
                    formState={formState}
                    inputProps={{placeholder: 'https://www.twojastrona.com'}}
                />
                <FormInputText<PortfolioFormInput>
                    label='Linkedin URL'
                    name='linkedin'
                    control={control}
                    formState={formState}
                    inputProps={{placeholder: 'https://www.linkedin.com/in/twojprofil'}}
                />
                <FormInputText<PortfolioFormInput>
                    label='Twitter URL'
                    name='twitter'
                    control={control}
                    formState={formState}
                    inputProps={{placeholder: 'https://www.twitter.com/twojprofil'}}
                />
                <FormInputText<PortfolioFormInput>
                    label='Github URL'
                    name='github'
                    control={control}
                    formState={formState}
                    inputProps={{placeholder: 'https://www.github.com/twojprofil'}}
                />
                <FormInputText<PortfolioFormInput>
                    label='Dribble URl'
                    name='dribble'
                    control={control}
                    formState={formState}
                    inputProps={{placeholder: 'https://www.dribble.com/twojprofil'}}

                />
                <FormInputText<PortfolioFormInput>
                    label='Behance URL'
                    name='behance'
                    control={control}
                    formState={formState}
                    inputProps={{placeholder: 'https://www.behance.com/twojprofil'}}
                />
            </form>
        </StepContentWrapper>
    )
}

export default RegisterMentorStep4;