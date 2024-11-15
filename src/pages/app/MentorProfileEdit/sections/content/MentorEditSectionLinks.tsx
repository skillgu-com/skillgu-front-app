import React from "react";

import {useForm} from "react-hook-form";
import styles from "./styles.module.scss";
import {MentorData} from "../../MentorProfileEditPage";
import {UserEditSection} from "../../../../../components/_grouped";
import FormInputText from "../../../../../components/_form/FormInputText/FormInputText";
import {MentorEditLinksFormInput} from "@customTypes/mentor";
import {updateUserSocialLinks} from "@services/mentor/mentorSettingProfileService";


type Props = {
    mentorData: MentorData;
};

export const MentorEditSectionLinks = ({mentorData}: Props) => {
    const {control, formState, handleSubmit, watch} =
        useForm<MentorEditLinksFormInput>({
            defaultValues: {
                website: "",
                linkedin: "",
                twitter: "",
                github: "",
                dribbble: "",
                behance: "",
                youtube: "",
                facebook: "",
                instagram: "",
            },
        });

    const inputProps = {
        formState: formState,
        control: control,
        // controllerProps: {rules: {required: "Imię jest wymagane"}},
    };

    const onSubmit = async (data: MentorEditLinksFormInput) => {
        try {
            const mentorSocialLinks: MentorEditLinksFormInput = {
                website: data.website,
                linkedin: data.linkedin,
                twitter: data.twitter,
                github: data.github,
                dribbble: data.dribbble,
                behance: data.behance,
                youtube: data.youtube,
                facebook: data.facebook,
                instagram: data.instagram,

            };
            await updateUserSocialLinks(mentorSocialLinks);
            window.location.reload();

        } catch (error) {
            console.error('Failed to update personal data', error);
        }
    };

    return (
        <UserEditSection
            title="Kontakt"
            subtitle="Gdzie istniejesz w internecie?"
            onClose={() => {
                console.log("onClose");
            }}
            onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.Inputs}>
                <FormInputText<MentorEditLinksFormInput>
                    {...inputProps}
                    inputProps={{placeholder: mentorData?.website || "Twoja strona "}}
                    label="Twoja strona"
                    name="website"
                />
                <FormInputText<MentorEditLinksFormInput>
                    {...inputProps}
                    inputProps={{placeholder: mentorData?.linkedin || "Twój Linkedin "}}
                    label="Linkedin URL"
                    name="linkedin"
                />
                <FormInputText<MentorEditLinksFormInput>
                    {...inputProps}
                    inputProps={{placeholder: mentorData?.twitter || "Twój X "}}
                    label="Twitter URL"
                    name="twitter"
                />
                <FormInputText<MentorEditLinksFormInput>
                    {...inputProps}
                    inputProps={{placeholder: mentorData?.github || "Twój GitHub "}}
                    label="Github URL"
                    name="github"
                />
                <FormInputText<MentorEditLinksFormInput>
                    {...inputProps}
                    inputProps={{placeholder: mentorData?.dribbble || "Twój Dribble "}}
                    label="Dribbble URL"
                    name="dribbble"
                />
                <FormInputText<MentorEditLinksFormInput>
                    {...inputProps}
                    inputProps={{placeholder: mentorData?.behance || "Twój Behance "}}
                    label="Behance URL"
                    name="behance"
                />
                <FormInputText<MentorEditLinksFormInput>
                    {...inputProps}
                    inputProps={{placeholder: mentorData?.youtube || "Twój Youtube "}}
                    label="Youtube URL"
                    name="youtube"
                />
                <FormInputText<MentorEditLinksFormInput>
                    {...inputProps}
                    inputProps={{placeholder: mentorData?.instagram || "Twój Instagram "}}
                    label="Instagram URL"
                    name="instagram"
                />
                <FormInputText<MentorEditLinksFormInput>
                    {...inputProps}
                    inputProps={{placeholder: mentorData?.facebook || "Twój Facebook "}}
                    label="Facebook URL"
                    name="facebook"
                />
            </div>
        </UserEditSection>
    );
};
