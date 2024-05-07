import React, {useEffect, useState} from "react";
import Container from "src/new-components/Container/Container";
import {MentorReviewsConnected} from "@newComponents/_connected";
import {Tag} from "src/types/tags";
import {MentorHeader, MentorHeaderWrapper} from "./components";
import {useParams} from "react-router-dom";
import {
    MentorContent,
    MentorLinks,
    MentorMainWrapper,
} from "./components/content";
import {
    MentorServices,
    MentorServicesMentoring,
    MentorServicesSession,
} from "./components/sidebar";
import {
    ServiceMentoring,
    ServiceSession,
    ServiceType,
} from "@customTypes/order";
import {fetchMentorServices} from "src/services/mentor/fetchMentorServices.service";
import styles from "./MentorProfile.module.scss";
import {getMentorProfileByID} from "../../../services/MentorViewService";
import {UserData} from "../Settings/Settings";
import {fetchMentorSession} from "../../../services/SessionService";

type Props = {
    isLoggedMentor: boolean;
};

/**
 *
 */
export const MentorProfilePage = () => {
    const {id: mentorId} = useParams();

    const [tab, setTab] = useState<ServiceType>("mentoring");
    const toggleTab = () =>
        setTab((s) => (s === "mentoring" ? "session" : "mentoring"));
    const [loading, setLoading] = useState<boolean>(true);
    const [optionsMentoring, setOptionsMentoring] = useState<ServiceMentoring[]>(
        []
    );
    const [optionsSession, setOptionsSession] = useState<ServiceSession[]>([]);
    const [selectedMentoring, setMentoring] = useState<null | ServiceMentoring>(
        null
    );
    const [selectedSession, setSession] = useState<null | ServiceSession>(null);
    const [popupSession, setPopupSession] = useState<null | ServiceSession>(null);
    const handleSelectMentoring = (opt: ServiceMentoring) => setMentoring(opt);
    const handleSelectSession = (opt: ServiceSession) => setSession(opt);
    const handleSubmitMentoring = (opt: ServiceMentoring) => {
        console.log("ORDER Mentoring, ", opt);
    };
    const handleSubmitSession = (opt: ServiceSession) => {
        console.log("ORDER Session, ", opt);
    };
    const openPopup = (opt: ServiceSession) => setPopupSession(opt);
    const closePopup = () => setPopupSession(null);

    useEffect(() => {
        const run = async () => {
            const resp = await fetchMentorServices({mentorId: mentorId || ""});
            if (resp.success) {
                setOptionsMentoring(resp.mentoring);
                setOptionsSession(resp.session);
            }
            setLoading(false);
        };
        if (mentorId) {
            run();
        }
    }, [mentorId]);


    useEffect(() => {
        getMentorProfileByID(mentorId).then((res) => {
            // setUserData(res.data as UserData)
            console.log(res.data)
        });
    }, []);



    return (
        <>
            <MentorHeaderWrapper>
                <Container as={Tag.Section}>
                    <MentorHeader
                        avatarUrl="/images/img_avatar.png"
                        fullname="Anna Stokrotka"
                        location="Warszawa, Polska (UTC+2)"
                        profession="UX/UI Designer w Google"
                        company="Google"
                    />
                    <MentorLinks
                        className={styles.onlyMobileFlex}
                        instagram={"#"}
                        youtube={"#"}
                        linkedin={"#"}
                        twitter={"#"}
                        facebook={"#"}
                    />
                </Container>
            </MentorHeaderWrapper>

            <Container as={Tag.Section}>
                <MentorMainWrapper>
                    <main>
                        <MentorContent
                            title="Nauczę Cię dizajnować jak PRO"
                            contentHtml="
                <p>Figma ipsum component variant main layer. Boolean distribute pencil content scrolling blur outline variant. Frame rotate device draft variant italic plugin union stroke.</p>
                <br />
                <p>Figma ipsum component variant main layer. Boolean distribute pencil content scrolling blur outline variant. Frame rotate device draft variant italic plugin union stroke.</p>
                <br />
                <p>Figma ipsum component variant main layer. Boolean distribute pencil content scrolling blur outline variant. Frame rotate device draft variant italic plugin union stroke.</p>
                <p>Figma ipsum component variant main layer. Boolean distribute pencil content scrolling blur outline variant. Frame rotate device draft variant italic plugin union stroke.</p>
              "
                            skills={[
                                "Figma",
                                "UX Design",
                                "UI Design",
                                "Design Thinking",
                                "Photoshop",
                            ]}
                            services={[
                                "Spotkania weekendowe",
                                "Praca z zadaniami",
                                "Mentoring i sesje",
                                "Jeszcze jakiś tag",
                            ]}
                        />
                        <MentorLinks
                            isDesktop
                            className={styles.onlyDesktopFlex}
                            instagram={"#"}
                            youtube={"#"}
                            linkedin={"#"}
                            twitter={"#"}
                            facebook={"#"}
                        />
                    </main>
                    <aside>
                        {loading ? (
                            <div>LOADING</div>
                        ) : (
                            <MentorServices activeTab={tab} handleSwitchTab={toggleTab}>
                                {tab === "mentoring" ? (
                                    <MentorServicesMentoring
                                        services={optionsMentoring}
                                        selected={selectedMentoring}
                                        handleSelect={handleSelectMentoring}
                                        handleSubmit={handleSubmitMentoring}
                                    />
                                ) : null}
                                {tab === "session" ? (
                                    <MentorServicesSession
                                        services={optionsSession}
                                        selected={selectedSession}
                                        handleSelect={handleSelectSession}
                                        handleSubmit={handleSubmitSession}
                                    />
                                ) : null}
                            </MentorServices>
                        )}
                    </aside>
                </MentorMainWrapper>
            </Container>

            {mentorId ? (
                <Container as={Tag.Section}>
                    <MentorReviewsConnected mentorId={mentorId}/>
                </Container>
            ) : null}
        </>
    );
};
