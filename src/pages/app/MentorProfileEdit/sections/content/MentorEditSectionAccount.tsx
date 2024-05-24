import React, {useState} from "react";
import {UserEditSection} from "@newComponents/_grouped";
import FormInputText from "@newComponents/_form/FormInputText/FormInputText";
import {useForm} from "react-hook-form";
import styles from "./styles.module.scss";
import {Switcher} from "@newComponents/_base/Switcher";
import FormInputSwitcher from "@newComponents/_form/FormInputSwitcher/FormInputSwitcher";
import {Typography} from "@mui/material";
import Pencil from "src/pages/app/Schedules/components/icons/Pencil";
import {updateUserProfile} from "@services/mentor/settingMentor.service";
import {MentorEditProfileFormInput} from "./MentorEditSectionProfile";
import setNewPasswordService from "@services/auth/setNewPassword.service";
import {SetNewPasswordDTO, SetNewPasswordInput} from "@services/auth/setNewPassword.types";
//
// export type MentorEditAccountFormInput = {
//     email: string;
//     password: string;
//     password2: string;
// };

export const MentorEditSectionAccount = () => {
    const {control, formState, handleSubmit, watch} =
        useForm<SetNewPasswordInput>({
            defaultValues: {
                email: "",
                password: "",
                repeatPassword: ""
            },
        });

    const inputProps = {
        formState: formState,
        control: control,
        inputProps: {
            type: 'password',
            placeholder: "Wprowadź hasło"
        },
        controllerProps: {rules: {required: "Imię jest wymagane"}},
    };

    const [editPassword, setEditPassword] = useState<boolean>(false);

    const onSubmit = async (data: SetNewPasswordInput) => {
        try {
            const mentorEditPassword: SetNewPasswordInput = {
                email: data.email,
                password: data.password,
                repeatPassword: data.repeatPassword,
                changeToken: data.changeToken,
                userToken: data.userToken

            };
            const response = await setNewPasswordService(mentorEditPassword);
            window.location.reload();

        } catch (error) {
            console.error('Failed to update personal data', error);
        }
    };


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
            onSubmit={handleSubmit(onSubmit)}
            // onSubmit={
            //   editPassword
            //     ? () => {
            //         console.log("onSubmit");
            //       }
            //     : undefined
            // }
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
                            <Pencil color="currentColor"/>
                        </button>
                    )}
                </div>
                {editPassword ? (
                    <div>
                        <FormInputText<SetNewPasswordDTO>
                            {...inputProps}
                            label="Nowe hasło"
                            name="password"
                        />
                        <FormInputText<SetNewPasswordDTO>
                            {...inputProps}
                            label="Powtórz hasło"
                            name="repeatPassword"
                        />
                    </div>
                ) : null}
            </div>
        </UserEditSection>
    );
};
