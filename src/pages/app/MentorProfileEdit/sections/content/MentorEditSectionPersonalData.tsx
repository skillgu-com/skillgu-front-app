import React from "react";
import {useForm} from "react-hook-form";

import {MentorData} from "../../MentorProfileEditPage";
import {UserEditSection} from "../../../../../components/_grouped";
import FormInputText from "../../../../../components/_form/FormInputText/FormInputText";
import FormInputFile from "../../../../../components/_form/FormUploadFile/FormUploadFile";

import styles from "./styles.module.scss";
import updateUserPersonalData from "@services/mentor/mentorSettingProfileService";
import {MentorEditPersonalDataFormInput, MentorPersonalData} from "@customTypes/mentor";


type Props = {
    mentorData: MentorData;
};

export const MentorEditSectionPersonalData = ({ mentorData }: Props) => {
    const {control, formState, handleSubmit} =
        useForm<MentorEditPersonalDataFormInput>({
            defaultValues: {
                firstName: "",
                surname: "",
                avatarUrl: [],
                coverUrl: [],
            },
        });

    const inputProps = {
        formState: formState,
        control: control,
        controllerProps: {}
    };

    const onSubmit = async (data: MentorEditPersonalDataFormInput) => {
        try {
            const mentorPersonalData: MentorPersonalData = {
                firstName: data.firstName,
                surname: data.surname,
                avatarUrl: data.avatarUrl,
                coverUrl: data.coverUrl,
            };
            await updateUserPersonalData(mentorPersonalData);
            window.location.reload();
        } catch (error) {
            console.error('Failed to update personal data', error);
        }
    };


    return (
        <UserEditSection
            title="Dane osobowe"
            subtitle="Zaktualizuj swoje zdjęcie oraz dane osobowe."
            onClose={() => {
                console.log("onClose");
            }}
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className={styles.Inputs}>
                <div className={styles.InputsCols2}>
                    <FormInputText<MentorEditPersonalDataFormInput>
                        {...inputProps}
                        label="Imię"
                        inputProps={{ placeholder: mentorData?.firstName || '' }}
                        name="firstName"
                    />
                    <FormInputText<MentorEditPersonalDataFormInput>
                        {...inputProps}
                        label="Nazwisko"
                        inputProps={{ placeholder: mentorData?.lastName || '' }}
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
