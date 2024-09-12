import React, {useEffect, useRef, useState} from "react";
import Container from "src/components/Container/Container";
import {Tag} from "src/types/tags";
import {useParams} from "react-router-dom";
import {
    MentorEditFooter,
    MentorEditSectionAccount,
    MentorEditSectionLinks,
    MentorEditSectionNotifications,
    MentorEditSectionPersonalData,
    MentorEditSectionProfile,
} from "./sections/content";
import {Typography} from "@mui/material";
import {SpecialVariant} from "@customTypes/mentor";
import {DropdownOption} from "@customTypes/dropdownOption";
import {UserProfileHeader} from "../../../components/_grouped";
import {MentorLangs} from "../../../components/_grouped/languages/MentorLangs";
import {getMentorByUsername} from "@services/mentor/fetchMentorServices.service";
import { ProfileEditPageSkeleton } from "src/components/ProfileEditSkeleton";

/**
 *
 */

export interface MentorData {
    timeZone: string;
    email: string;
    avatar_url: string;
    description: string;
    username: string;
    id: string;
    mentorId: string,
    firstName: string;
    lastName: string;
    price: number;
    location: string;
    profession: string;
    reviewsAvgRate: number;
    reviewsCount: number;
    special: string;
    title: string;
    intro: string;
    jobPosition: string;
    company: string;
    profileImage: string;
    coverImage: string;
    userID: number;
    specialVariant: SpecialVariant;
    services: DropdownOption[];
    skill: DropdownOption[];
    mentorTopics: DropdownOption[];

    mentorCategory: DropdownOption[];
    linkedin: string | null;
    website: string | null;
    youtube: string | null;
    instagram: string | null;
    twitter: string | null;
    facebook: string | null;
    github: string | null;
    dribble: string | null;
    behance: string | null;
}

export const MentorProfileEditPage = () => {
    const {id: mentorId} = useParams();
    const {username} = useParams();

    // const [tab, setTab] = useState<ServiceType>("mentoring");
    const [mentorData, setMentorData] = useState<MentorData>({} as MentorData);
    // const updateMentorDataPartial = useCallback((data: Partial<MentorData>) => {
    //     setMentorData((md) => ({...md, ...data}));
    // }, []);

    // const toggleTab = () =>
    //     setTab((s) => (s === "mentoring" ? "session" : "mentoring"));
    const [loading, setLoading] = useState<boolean>(true);
    // const [optionsMentoring, setOptionsMentoring] = useState<ServiceMentoring[]>(
    //     []
    // );
    // const [optionsSession, setOptionsSession] = useState<ServiceSession[]>([]);
    // const [selectedMentoring, setMentoring] = useState<null | ServiceMentoring>(
    //     null
    // );
    // const [selectedSession, setSession] = useState<null | ServiceSession>(null);
    // const [popupSession, setPopupSession] = useState<null | ServiceSession>(null);
    // const handleSelectMentoring = (opt: ServiceMentoring) => setMentoring(opt);
    // const handleSelectSession = (opt: ServiceSession) => setSession(opt);
    // const handleSubmitMentoring = (opt: ServiceMentoring) => {
    //     console.log("ORDER Mentoring, ", opt);
    // };
    // const handleSubmitSession = (opt: ServiceSession) => {
    //     console.log("ORDER Session, ", opt);
    // };
    // const openPopup = (opt: ServiceSession) => setPopupSession(opt);
    // const closePopup = () => setPopupSession(null);
    //
    // useEffect(() => {
    //     const run = async () => {
    //         const resp = await fetchMentorServices({mentorId: mentorId || ""});
    //         if (resp.success) {
    //             setOptionsMentoring(resp.mentoring);
    //             setOptionsSession(resp.session);
    //         }
    //         setLoading(false);
    //     };
    //     if (mentorId) {
    //         run();
    //     }
    // }, [mentorId]);

    const initialDataFetched = useRef<boolean>(false);

    useEffect(() => {
        if (username) {
            const fetchInitialData = async () => {
                setLoading(false);
                try {
                    const resp =  await getMentorByUsername(username);
                    const mentorData = resp.data as MentorData;
                    setMentorData(mentorData);
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchInitialData();
        }
    }, [username]);


    useEffect(() => {
        const fetchInitialData = async (name:string) => {
            setLoading(true);
            await getMentorByUsername(name).then((res) => {
                setMentorData(res.data as MentorData);
            });
            setLoading(false);
        };
        if (!initialDataFetched.current && username) {
            fetchInitialData(username);
            initialDataFetched.current = true;
        }
    }, [mentorId, username]);
console.log(1, mentorData)

    return loading ? (
      <ProfileEditPageSkeleton />
    ) : (
        <>
            {/*//TODO dodane chwilowo defaultowe avatarUrl oraz coverUrl jako linki dlatego nie widzimy zmian w ustawnieach*/}
            <UserProfileHeader
                avatarUrl={
                  mentorData?.profileImage ||
                  "https://res.cloudinary.com/dkclg8ppw/image/upload/v1725528576/default/avatar.jpg"
                }
                btnText="Zobacz profil"
                btnHref={`/mentor/${username}`}
                company={mentorData?.company}
                coverUrl={
                    mentorData?.coverImage ||
                    "https://res.cloudinary.com/dkclg8ppw/image/upload/v1725528618/default/cover.png"}
                fullname={mentorData?.firstName + " " + mentorData?.lastName}
                langSwitcher={
                    <MentorLangs
                        langs={[
                            {value: "pl", label: "Polski"},
                            {value: "en", label: "Angielski"},
                            {value: "de", label: "Niemiecki"},
                            {value: "jp", label: "Japonski"},
                        ]}
                    />
                }
                location={mentorData?.timeZone}
                profession={mentorData?.jobPosition}
            />

            <Container as={Tag.Section}>
                <MentorEditSectionPersonalData mentorData={mentorData}/>
                <MentorEditSectionProfile mentorData={mentorData}/>
                <MentorEditSectionLinks mentorData={mentorData}/>
                <Typography
                    variant="h2"
                    color="secondary"
                    sx={{display: "block", margin: "48px 0 24px"}}
                >
                    Ustawienia konta
                </Typography>
                <MentorEditSectionAccount mentorData={mentorData}/>
                <MentorEditSectionNotifications/>
                <MentorEditFooter/>
            </Container>
        </>
    );
};
