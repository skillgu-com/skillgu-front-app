import React from "react";
import {UserEditSection} from "@newComponents/_grouped";
import FormInputText from "@newComponents/_form/FormInputText/FormInputText";
import {useForm} from "react-hook-form";
import styles from "./styles.module.scss";
import FormInputFile from "@newComponents/_form/FormUploadFile/FormUploadFile";
import updatePersonalData from "../../../../../services/mentor/settingMentor.service";

export type MentorEditPersonalDataFormInput = {
    firstname: string;
    surname: string;
    avatarUrl: File[];
    coverUrl: File[];
};

interface FormData {
    firstname: HTMLInputElement;
    surname: HTMLInputElement;
    avatarUrl: HTMLInputElement;
    coverUrl: HTMLInputElement;
}

export const MentorEditSectionPersonalData = () => {
    const {control, formState, handleSubmit, watch} =
        useForm<MentorEditPersonalDataFormInput>({
            defaultValues: {
                firstname: "",
                surname: "",
                avatarUrl: [],
                coverUrl: [],
            },
        });

    const inputProps = {
        formState: formState,
        control: control,
        controllerProps: {rules: {required: "Imię jest wymagane"}},
    };

    const avatarValue = watch('avatarUrl')
    const coverValue = watch('coverUrl')


    return (
        <UserEditSection
            title="Dane osobowe"
            subtitle="Zaktualizuj swoje zdjęcie oraz dane osobowe."
            onClose={() => {
                console.log("onClose");
            }}
            onSubmit={(e) => {
                e.preventDefault()
                const {
                    firstname,
                    surname,
                    avatarUrl,
                    coverUrl,
                } = (e.target as HTMLFormElement).elements as unknown as FormData;


                const mentorPersonalData = {
                    firstname: firstname.value,
                    surname: surname.value,
                    avatarUrl: avatarValue,
                    coverUrl: coverValue,
                };

                updatePersonalData(mentorPersonalData);

            }}>
            <div className={styles.Inputs}>
                <div className={styles.InputsCols2}>
                    <FormInputText<MentorEditPersonalDataFormInput>
                        {...inputProps}
                        label="Imię"
                        inputProps={{placeholder: "Wprowadź swoje Imię"}}
                        name="firstname"
                    />
                    <FormInputText<MentorEditPersonalDataFormInput>
                        {...inputProps}
                        label="Nazwisko"
                        inputProps={{placeholder: "Wprowadź swoje nazwisko"}}
                        name="surname"
                    />
                </div>
                <FormInputFile<MentorEditPersonalDataFormInput>
                    {...inputProps}
                    label="Zdjęcie profilowe"
                    name="avatarUrl"
                    withPreview
                />
                <FormInputFile<MentorEditPersonalDataFormInput>
                    {...inputProps}
                    label="Zdjęcie w tle"
                    name="coverUrl"
                    withPreview
                />
            </div>
        </UserEditSection>
    );
};
