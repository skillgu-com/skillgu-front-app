import React, { useEffect } from "react";
import { UserEditSection } from "@newComponents/_grouped";
import FormInputText from "@newComponents/_form/FormInputText/FormInputText";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { Switcher } from "@newComponents/_base/Switcher";
import FormInputSwitcher from "@newComponents/_form/FormInputSwitcher/FormInputSwitcher";
import { Typography } from "@mui/material";
import FormInputSelect from "@newComponents/_form/FormInputSelect/FormInputSelect";
import FormAutocompleteDynamic from "@newComponents/_form/FormAutocompleteDynamic/FormAutocompleteDynamic";
import getAvailableSkillsService from "src/services/skills/getAvailableSkills.service";
import FormInputCheckbox from "@newComponents/_form/FormInputCheckbox/FormInputCheckbox";
import FormInputFile from "@newComponents/_form/FormUploadFile/FormUploadFile";

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
  const { control, formState, handleSubmit, watch } =
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
    controllerProps: { rules: { required: "Imię jest wymagane" } },
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


        console.log("onSubmit", {
          firstname,
          surname,
          avatarUrl,
          coverUrl,
          avatarValue,
          coverValue,
        });
      }}
    >
      <div className={styles.Inputs}>
        <div className={styles.InputsCols2}>          
          <FormInputText<MentorEditPersonalDataFormInput>
            {...inputProps}
            label="Imię"
            inputProps={{ placeholder: "Wprowadź swoje Imię" }}
            name="firstname"
          />
          <FormInputText<MentorEditPersonalDataFormInput>
            {...inputProps}
            label="Nazwisko"
            inputProps={{ placeholder: "Wprowadź swoje nazwisko" }}
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
