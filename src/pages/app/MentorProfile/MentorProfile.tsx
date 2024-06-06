import React, {useEffect, useMemo, useState} from "react";
import Container from "src/new-components/Container/Container";
import {MentorReviewsConnected} from "@newComponents/_connected";
import {Tag} from "src/types/tags";
import {MentorHeader, MentorHeaderWrapper} from "./components";
import {useNavigate, useParams} from "react-router-dom";
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
import {SpecialVariant} from "@customTypes/mentor";
import {fetchMentorSession} from "../../../services/SessionService";
import {UserProfileHeader} from "@newComponents/_grouped";
import {LangSwitcherConnected} from "@newComponents/_connected/lang-switcher/LangSwitcher";
import clx from "classnames";
import {useSelector} from "react-redux";
import {DropdownOption} from "@customTypes/dropdownOption";
import paths from "../../../paths";
import {MentorLangs} from "@newComponents/_grouped/languages/MentorLangs";
import {MentorData} from "../MentorProfileEdit";

type Props = {
    isLoggedMentor: boolean;
};


export const MentorProfilePage = () => {
    const {id: mentorId} = useParams();

    const [tab, setTab] = useState<ServiceType>("mentoring");
    const [mentorData, setMentorData] = useState<MentorData>({} as MentorData);
    const [pending, setPending] = useState<boolean>(true);

    const useIsMentorLoggedUser = (mentorDat: MentorData) => {
        const userFromRedux = useSelector((state: any) => state.auth.user);

        const mentorIsLoggedUser = useMemo(() => {
            return userFromRedux?.id === mentorData?.userID;
        }, [userFromRedux, mentorData]);

        return mentorIsLoggedUser;
    };
    const mentorIsLoggedUser = useIsMentorLoggedUser(mentorData);

    // @TODO: get user id from sesion/jwt

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
    const navigate = useNavigate();

    const openPopup = (opt: ServiceSession) => setPopupSession(opt);

    const closePopup = () => setPopupSession(null);

    const handleSubmitSession = (opt: ServiceSession) => {
        console.log("ServiceSession in MentorProfile: ", opt);
        navigate(paths.sessionBook, {state: opt});
    };

    // TODO do usuniecia ten hook albo ten ponizej, nalezy to ustawic!
    useEffect(() => {
        const run = async () => {
            const resp = await fetchMentorServices({mentorId: mentorId || ""});
            if (resp.success) {
                setOptionsMentoring(resp.mentoring);
                // setOptionsSession(resp.session);
            }
            setLoading(false);
        };
        if (mentorId) {
            run();
        }
    }, [mentorId]);

    useEffect(() => {
        const fetchInitialData = async () => {
            setPending(true);
            await getMentorProfileByID(mentorId).then((res) => {
                setMentorData(res.data as MentorData);
            });
            setPending(false);
        };
        if (mentorId) {
            fetchInitialData();
        }
    }, [mentorId]);

    useEffect(() => {
        fetchMentorSession(mentorId).then((res) => {
            if (res) {
                const formattedSessions = res.data.map((elementFromAPI: any) => ({
                    id: elementFromAPI?.id,
                    sessionType: elementFromAPI?.sessionType,
                    sessionPrice: elementFromAPI?.sessionPrice,
                    description: elementFromAPI?.description,
                    meetTime: elementFromAPI?.meetTime,
                    mentorID: Number(mentorId),
                }));
                console.log('formattedSessions: ',formattedSessions)
                setOptionsSession(formattedSessions);
                setLoading(false);
            }
        });
    }, [mentorId]);


    return loading ? null : (
        <>
            <UserProfileHeader
                avatarUrl={
                    mentorData?.profileImage ||
                    "https://cdn.pixabay.com/photo/2023/04/21/15/42/portrait-7942151_640.jpg"
                }
                btnText={mentorIsLoggedUser ? "Edytuj profil" : ""}
                btnHref={mentorIsLoggedUser ? `/edit-mentor/${mentorId}` : ""}
                company={mentorData?.company}
                coverUrl={mentorData?.coverImage || "/images/header-banner-bg.jpg"}
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
                <MentorLinks
                    className={clx(styles.onlyMobileFlex, styles.socialLinksMobile)}
                    instagram={mentorData?.instagram ?? "#"}
                    youtube={mentorData?.youtube ?? "#"}
                    linkedin={mentorData?.linkedin ?? "#"}
                    twitter={mentorData?.twitter ?? "#"}
                    facebook={mentorData?.facebook ?? "#"}
                />
                <MentorMainWrapper>
                    <main>
                        <MentorContent
                            title={mentorData?.intro}
                            contentHtml={mentorData?.description}
                            contentExpandable={mentorData?.description?.length > 120}
                            skills={mentorData?.skill}
                            services={mentorData?.services}
                            topics={mentorData?.mentorTopics}
                        />
                        <MentorLinks
                            isDesktop
                            className={styles.onlyDesktopFlex}
                            instagram={mentorData?.instagram ?? "#"}
                            youtube={mentorData?.youtube ?? "#"}
                            linkedin={mentorData?.linkedin ?? "#"}
                            twitter={mentorData?.twitter ?? "#"}
                            facebook={mentorData?.facebook ?? "#"}
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
                                        handleSelect={
                                            !mentorIsLoggedUser ? handleSelectMentoring : undefined
                                        }
                                        handleSubmit={
                                            !mentorIsLoggedUser ? handleSubmitMentoring : undefined
                                        }
                                    />
                                ) : null}
                                {tab === "session" &&
                                    optionsSession &&
                                    optionsSession.length > 0 && (
                                        <MentorServicesSession
                                            services={optionsSession}
                                            selected={selectedSession}
                                            handleSelect={
                                                !mentorIsLoggedUser ? handleSelectSession : undefined
                                            }
                                            handleSubmit={
                                                !mentorIsLoggedUser ? handleSubmitSession : undefined
                                            }
                                        />
                                    )}
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
