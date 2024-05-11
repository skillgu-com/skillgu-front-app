import React from "react";
import { MentorEditSection } from "../../elements";
import FormInputText from "@newComponents/_form/FormInputText/FormInputText";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";

export type MentorEditLinksFormInput = {
  website: string;
  linkedin: string;
  twitter: string;
  github: string;
  dribbble: string;
  behance: string;
  youtube: string;
};

const isValidUrl = (url: string, allowEmpty: boolean = true): boolean => {
  if (allowEmpty && url === "") {
    return true;
  }
  const urlRegex = /^(http|https):\/\/[^ "]+$/;
  return urlRegex.test(url);
};

export const MentorEditSectionLinks = () => {
  const { control, formState, handleSubmit, watch } =
    useForm<MentorEditLinksFormInput>({
      defaultValues: {
        website: "",
        linkedin: "",
        twitter: "",
        github: "",
        dribbble: "",
        behance: "",
        youtube: "",
      },
    });

  const inputProps = {
    formState: formState,
    control: control,
    inputProps: { placeholder: "https://example.com" },
    controllerProps: { rules: { required: "Imię jest wymagane" } },
  };

  return (
    <MentorEditSection
      title="Kontakt"
      subtitle="Gdzie istniejesz w internecie?"
      onClose={() => {
        console.log("onClose");
      }}
      onSubmit={() => {
        console.log("onSubmit");
      }}
    >
      <div className={styles.Inputs}>
        <FormInputText<MentorEditLinksFormInput>
          {...inputProps}
          label="Twoja strona"
          name="website"
        />
        <FormInputText<MentorEditLinksFormInput>
          {...inputProps}
          label="Linkedin URL"
          name="linkedin"
        />
        <FormInputText<MentorEditLinksFormInput>
          {...inputProps}
          label="Twitter URL"
          name="twitter"
        />
        <FormInputText<MentorEditLinksFormInput>
          {...inputProps}
          label="Github URL"
          name="github"
        />
        <FormInputText<MentorEditLinksFormInput>
          {...inputProps}
          label="Dribbble URL"
          name="dribbble"
        />
        <FormInputText<MentorEditLinksFormInput>
          {...inputProps}
          label="Behance URL"
          name="behance"
        />
        <FormInputText<MentorEditLinksFormInput>
          {...inputProps}
          label="Youtube URL"
          name="youtube"
        />
      </div>
    </MentorEditSection>
  );
};
