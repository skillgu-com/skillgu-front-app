import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {UserProfileHeader} from "@newComponents/_grouped";
import {LangSwitcherConnected} from "@newComponents/_connected/lang-switcher/LangSwitcher";
import {getMenteeProfileById, MenteeDTO} from "@services/mentee/fetchMenteeServices.service";



export const MenteeProfilePage = () => {
    const {id: studentId} = useParams();
    const [mentee, setMentee] = useState<null | MenteeDTO>(null);
    const [pending, setPending] = useState<boolean>(true)
    const [error, setError] = useState<string>('')

    const studentIsLoggedUser = true;

    useEffect(() => {
        setError('')
        setPending(true)
        try {
            getMenteeProfileById(studentId).then((res)=>{
                setMentee(res.data)
            })
        } catch (e) {
            setError('Wystąpił błąd podczas pobierania danych')
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
                company={'Skillguru'}
                coverUrl={mentee.coverUrl}
                fullname={mentee.firstName + " " + mentee?.lastName}
                langSwitcher={<LangSwitcherConnected/>}
                location={mentee?.location}
                profession="Mentee"
            />) : null}
        </>
    );
};
