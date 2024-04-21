import React, {useMemo} from 'react';
import StepContentWrapper from "@newComponents/_registerMentor/StepContentWrapper/StepContentWrapper";
import {ProfileFormInput} from "@customTypes/mentorRegister";
import {SubmitHandler, useForm} from "react-hook-form";
import useRegisterMentorContext from "../../../context/RegisterMentorContext";
import FormInputText from "@newComponents/_form/FormInputText/FormInputText";
import Typography from "@mui/material/Typography";
import FormAutocomplete from "@newComponents/_form/FormAutocomplete/FormAutocomplete";
import {Grid} from "@mui/material";
import Box from "@mui/material/Box";
import FormUploadPicture from "@newComponents/_form/FormUploadPicture/FormUploadPicture";

const formId = 'ProfileFormInput'

const maxBioCharacters = 500;

const RegisterMentorStep3 = () => {
    const {registerMentorDispatch} = useRegisterMentorContext();

    const {control, formState, handleSubmit, watch} = useForm<ProfileFormInput>({
        defaultValues: {
            profilePhoto: null,
            bio: '',
            skills: [],
        },
    });

    const bioValue = watch('bio');
    const remainingCharacters = useMemo(() => {
        const count = maxBioCharacters - bioValue.length;

        return count > 0 ? `Pozostało ${count} znaków` : `Przekroczyłeś limit znaków o ${-count}`;
    }, [bioValue])

    const goToNextStep: SubmitHandler<ProfileFormInput> = (formData) => {
        registerMentorDispatch({
            type: 'COMMIT_PROFILE_INFO',
            payload: formData,
        })
    };

    return (
        <StepContentWrapper
            title="Już prawie gotowe!"
            subtitle='A teraz podaj nam o sobie trochę informacji, abyśmy mogli lepiej Ciebie poznać.'
            step={{current: 2, count: 4}}
            ctaProps={{
                type: 'submit',
                form: formId,
                disabled: !formState.isValid && formState.isSubmitted,
            }}
        >
            <form id={formId} onSubmit={handleSubmit(goToNextStep)}>
                <FormUploadPicture<ProfileFormInput>
                    control={control}
                    formState={formState}
                    name='profilePhoto'
                    label='Zdjęcie profilowe'
                />
                <FormInputText<ProfileFormInput>
                    inputProps={{multiline: true, rows: 4}}
                    name='bio'
                    control={control}
                    formState={formState}
                    label='Bio'
                    controllerProps={{
                        rules: {
                            required: 'To pole jest wymagane',
                            maxLength: {
                                value: maxBioCharacters,
                                message: `Maksymalna liczba znaków to ${maxBioCharacters}`
                            }
                        }
                    }}
                />
                <Typography variant='caption' color='base.60'>{remainingCharacters}</Typography>
                <Box sx={{mt: 2}}>
                    <FormAutocomplete<ProfileFormInput>
                        control={control}
                        formState={formState}
                        name='skills'
                        label='Umiejętności'
                    />
                </Box>
            </form>
        </StepContentWrapper>
    )
}

export default RegisterMentorStep3;