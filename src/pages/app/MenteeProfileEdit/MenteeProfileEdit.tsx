import React, {useEffect, useState} from "react";
import Container from "src/components/Container/Container";
import {Tag} from "src/types/tags";
import {useParams} from "react-router-dom";
import {
    MenteeEditFooter,
    MenteeEditSectionAccount,
    MenteeEditSectionNotifications,
    MenteeEditSectionPersonalData, MenteeDTO
} from "./sections/content";
import {Typography} from "@mui/material";

import {getMenteeByUserName} from "@services/mentee/fetchMenteeServices.service";
import {UserProfileHeader} from "../../../components/_grouped";
import {LangSwitcherConnected} from "../../../components/_connected/lang-switcher/LangSwitcher";
import { ProfileEditPageSkeleton } from "src/components/ProfileEditSkeleton";

export const MenteeProfileEditPage = () => {
    const {id: menteeId} = useParams();
    const [mentee, setMentee] = useState<MenteeDTO | null>(null);

    useEffect(() => {
        if (menteeId) {
            getMenteeByUserName(menteeId).then((res) => {
                setMentee(res.data);
            });            
        }
    }, [menteeId]);

    if (!mentee) {
        return <ProfileEditPageSkeleton/>; // Możesz dodać tu bardziej zaawansowany komponent ładowania
    }

    return (
        <>
            <UserProfileHeader
                avatarUrl={mentee?.avatarUrl}
                btnText='Zobacz profil'
                btnHref={`/student/${menteeId}`}
                company="Skillguru"
                coverUrl={mentee?.coverUrl}
                fullname={mentee?.firstName + ' ' + mentee?.lastName}
                langSwitcher={<LangSwitcherConnected/>}
                // location="Warszawa, Polska (UTC+2)"
                profession="Mentee"
            />

            <Container as={Tag.Section}>
                <MenteeEditSectionPersonalData/>
                <Typography variant='h2' color='secondary' sx={{display: 'block', margin: '48px 0 24px'}}>
                    Ustawienia konta
                </Typography>
                <MenteeEditSectionAccount menteeData={mentee} />
                <MenteeEditSectionNotifications/>
                <MenteeEditFooter/>
            </Container>
        </>
    );
};
