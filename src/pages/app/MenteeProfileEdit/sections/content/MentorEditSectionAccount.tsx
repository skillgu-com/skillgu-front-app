import React, { useState } from "react";
import { UserEditSection } from "@newComponents/_grouped";
import FormInputText from "@newComponents/_form/FormInputText/FormInputText";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import Pencil from "src/pages/app/Schedules/components/icons/Pencil";

export type MentorEditAccountFormInput = {
  email: string;
  password: string;
  password2: string;
};

export const MentorEditSectionAccount = () => {
  const { control, formState, handleSubmit, watch } =
    useForm<MentorEditAccountFormInput>({
      defaultValues: {
        email: "",
        password: "",
        password2: "",
      },
    });

  const inputProps = {
    formState: formState,
    control: control,
    inputProps: {
      type: 'password',
      placeholder: "Wprowadź hasło" },
    controllerProps: { rules: { required: "Imię jest wymagane" } },
  };

  const [editPassword, setEditPassword] = useState<boolean>(false);

  return (
    <UserEditSection
      title="Informacje kontaktowe"
      subtitle="Zmień swój e-mail lub hasło."
      onClose={
        editPassword
          ? () => {
              setEditPassword(false);
            }
          : undefined
      }
      onSubmit={
        editPassword
          ? () => {
              console.log("onSubmit");
            }
          : undefined
      }
    >
      <div className={styles.Inputs}>
        <div className={styles.PopupInput}>
          <span>Twój aktualny e-mail to {control._formValues.email}</span>
        </div>
        <div className={styles.PopupInput}>
          <span>Zmień hasło</span>
          {editPassword ? null : (
            <button
              className={styles.EditBtn}
              onClick={() => setEditPassword(true)}
            >
              <Pencil color="currentColor" />
            </button>
          )}
        </div>
        {editPassword ? (
          <div>
            <FormInputText<MentorEditAccountFormInput>
              {...inputProps}
              label="Nowe hasło"
              name="password"
            />
            <FormInputText<MentorEditAccountFormInput>
              {...inputProps}
              label="Powtórz hasło"
              name="password2"
            />
          </div>
        ) : null}
      </div>
    </UserEditSection>
  );
};
