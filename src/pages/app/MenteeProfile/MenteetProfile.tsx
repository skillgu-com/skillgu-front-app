import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {getMenteeByUserName} from "@services/mentee/fetchMenteeServices.service";
import {MenteeDTO} from "../MenteeProfileEdit/sections";
import {UserProfileHeader} from "../../../components/_grouped";
import {LangSwitcherConnected} from "../../../components/_connected/lang-switcher/LangSwitcher";

export const MenteeProfilePage = () => {
    const {id: studentId} = useParams();
    const [mentee, setMentee] = useState<null | MenteeDTO>(null);
    const [pending, setPending] = useState<boolean>(true)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        setError('')
        setPending(true)
        try {
            if (studentId) {
                getMenteeByUserName(studentId).then((res) => {
                    setMentee(res.data)
                })
            }
        } catch (e) {
            setError('An error occurred while downloading data')
        }
        setPending(false)
    }, [studentId]);

    return (
        <>
            {error ? (
                <p>ERROR: {error}</p>
            ) : null}
            {pending ? (
                <p>Pending...</p>
            ) : null}
            {mentee ? (<UserProfileHeader
                avatarUrl={mentee.avatarUrl}
                company={'Skillgu.'}
                coverUrl={mentee.coverUrl}
                fullname={mentee.firstName + " " + mentee?.lastName}
                langSwitcher={<LangSwitcherConnected/>}
                location={mentee?.location}
                profession="Mentee"
            />) : null}
        </>
    );
};
