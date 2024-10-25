import React from "react";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { Typography } from "@mui/material";
import FormInputSwitcher from "../../../../../components/_form/FormInputSwitcher/FormInputSwitcher";
import { UserEditSection } from "src/components/_grouped/user-edit-section/UserEditSection";

export type MentorEditNotificationsFormInput = {
  switch1: boolean;
  switch2: boolean;
  switch3: boolean;
  switch4: boolean;
};

export const MentorEditSectionNotifications = () => {
  const { control, formState, handleSubmit, watch } =
    useForm<MentorEditNotificationsFormInput>({
      defaultValues: {
        switch1: false,
        switch2: false,
        switch3: false,
        switch4: true,
      },
    });



  return (
    <UserEditSection
      title="Powiadomienia i zgody"
      subtitle="Wybierz, kiedy chcesz dostawać powiadomienia oraz kiedy nie chcesz otrzymywać od nas informacji"
      onClose={() => {
        console.log("onClose");
      }}
      onSubmit={() => {
        console.log("onSubmit");
      }}
    >
      <Typography className={styles.Title} sx={{ display: 'block', marginBottom: '24px' }} variant="buttonMd" color="secondary">
        Wyślij mi e-mail, gdy...
      </Typography>
      <div className={styles.Switchers}>
        <FormInputSwitcher
          label={"Otrzymałem nową wiadomość od użytkownika"}
          name={"switch1"}
          control={control}
          formState={formState}
          className={styles.Field}
        />
        <FormInputSwitcher
          label={"Ktoś zarezerwował moją sesję mentoringową"}
          name={"switch2"}
          control={control}
          formState={formState}
          className={styles.Field}
        />
        <FormInputSwitcher
          label={"Moja sesja została anulowana przez użytkownika"}
          name={"switch3"}
          control={control}
          formState={formState}
          className={styles.Field}
        />
      </div>
      <hr className={styles.Divider} />
      <div className={styles.Switchers}>
        <FormInputSwitcher
          label={"Chcę otrzymywać newsletter"}
          name={"switch4"}
          control={control}
          formState={formState}
          className={styles.Field}
        />
      </div>
    </UserEditSection>
  );
};
