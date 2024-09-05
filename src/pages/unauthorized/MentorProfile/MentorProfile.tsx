import React, {useEffect, useMemo, useState} from "react";
import Container from "src/components/Container/Container";
import {Tag} from "src/types/tags";
import {useNavigate, useLocation, useParams} from "react-router-dom";
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
    MentorshipPlan,
    ServiceSession,
    ServiceType,
} from "@customTypes/order";
import {
    getMentorshipPlansForMentorProfile,
    getMentorByUsername,
    MentorshipPlanDTO,
} from "src/services/mentor/fetchMentorServices.service";
import styles from "./MentorProfile.module.scss";
import clx from "classnames";
import {useSelector} from "react-redux";
import { MentorData } from "src/pages/app/MentorProfileEdit";
import {UserProfileHeader} from "../../../components/_grouped";
import {MentorLangs} from "../../../components/_grouped/languages/MentorLangs";
import {MentorReviewsConnected} from "../../../components/_connected";
import {getMentorSessions} from "@services/session/sessionService";
import Button, {ButtonVariant} from "src/components/Button/Button";


export const MentorProfilePage = () => {
    const { username } = useParams<{ username: string }>();
    const safeUsername = username || ''; // lub 'unknown' lub inny string, który ma sens w twoim kontekście

    const location = useLocation();
    const navigate = useNavigate();
    
    const [tab, setTab] = useState<ServiceType>("mentoring");
    const [mentorData, setMentorData] = useState<MentorData>({} as MentorData);
    const [pending, setPending] = useState<boolean>(true);
    const userFromRedux = useSelector((state: any) => state.auth.user);


    // @TODO: get user id from sesion/jwt

    const [optionsMentoring, setOptionsMentoring] = useState<MentorshipPlanDTO[]>([]);
    const [optionsSession, setOptionsSession] = useState<ServiceSession[]>([]);
    const [selectedMentoring, setMentoring] = useState<null | MentorshipPlanDTO>(null);

    const toggleTab = () =>
        setTab((s) => (s === "mentoring" ? "session" : "mentoring"));
    const [loading, setLoading] = useState<boolean>(true);

    const handleSubmitMentoring = (opt: MentorshipPlan) => {
        navigate(`/mentorship/${opt.id}/application`);
    };

    const handleSubmitSession = (opt: ServiceSession) => {
        navigate(`/session-book/${opt.id}`, {state: {opt, from: location?.pathname}});
    };
    const handleSelectMentoring = (opt: MentorshipPlan) => setMentoring(opt);

    const [selectedSession, setSession] = useState<null | ServiceSession>(null);
    const [popupSession, setPopupSession] = useState<null | ServiceSession>(null);
    const handleSelectSession = (opt: ServiceSession) => setSession(opt);

    const openPopup = (opt: ServiceSession) => setPopupSession(opt);

    const closePopup = () => setPopupSession(null);


    useEffect(() => {
        const fetchInitialData = async (name:string) => {
            setPending(true);
            setLoading(false);
            try {
                if (name) {
                    const mentorResponse = await getMentorByUsername(name);
                    const mentorData = mentorResponse.data as MentorData;
                    setMentorData(mentorData);
    
                    const mentorId = mentorResponse.data?.mentorId;

                    if (mentorId) {
                        const [sessionResponse, mentoringResponse] = await Promise.all([
                            //TODO it can`t be here userFromRedux ! what if we want get mentorprofile when you are logg via mentee ?
                            getMentorSessions(mentorId),
                            getMentorshipPlansForMentorProfile({mentorId: mentorId}),
                        ]);

                        const formattedSessions = sessionResponse?.data.map(
                            (elementFromAPI: any) => ({
                                id: elementFromAPI?.id,
                                sessionType: elementFromAPI?.sessionType,
                                sessionPrice: elementFromAPI?.sessionPrice,
                                description: elementFromAPI?.description,
                                meetTime: elementFromAPI?.meetTime,
                                mentorID: mentorId,
                            })
                        );
                        setOptionsSession(formattedSessions);
    
                        if (mentoringResponse) {
                            setOptionsMentoring(mentoringResponse.mentorships);
                        }
                    }
                }

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setPending(false);
                setLoading(false);
            }
        };

        if (username) {
            fetchInitialData(username);
        }
    }, [username]);

    const useIsMentorLoggedUser = (data: MentorData) => {
        const userFromRedux = useSelector((state: any) => state.auth.user);

        const mentorIsLoggedUser = useMemo(() => {
            return userFromRedux?.id === data?.userID;
        }, [userFromRedux, data?.userID]);
        return mentorIsLoggedUser;
    };
    const mentorIsLoggedUser = useIsMentorLoggedUser(mentorData);

    return loading ? null : (
        <>
            <UserProfileHeader
                avatarUrl={
                    mentorData?.profileImage ||
                    "https://res.cloudinary.com/dkclg8ppw/image/upload/v1725528576/default/avatar.jpg"
                }
                btnText={mentorIsLoggedUser ? "Edytuj profil" : ""}
                btnHref={
                    mentorIsLoggedUser ? `/edit-mentor/${username}` : ""
                }
                company={mentorData?.company}
                coverUrl={mentorData?.coverImage || "https://res.cloudinary.com/dkclg8ppw/image/upload/v1725528618/default/cover.png"}
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
                                    <>
                                        {mentorIsLoggedUser ? (
                                            <Button
                                                variant={ButtonVariant.PrimaryLight}
                                                fontVariant="button-md"
                                                href={selectedMentoring ? `/create-mentoring` : undefined}
                                                disabled={!selectedMentoring}
                                                disableButton={!selectedMentoring}>Edytuj plan</Button>
                                        ) : null}

                                        <MentorServicesMentoring
                                            services={optionsMentoring}
                                            selected={selectedMentoring}
                                            displayRadioInput={!mentorIsLoggedUser}
                                            handleSelect={handleSelectMentoring}
                                            handleSubmit={
                                                !mentorIsLoggedUser ? handleSubmitMentoring : undefined
                                            }
                                        />
                                    </>
                                ) : null}
                                {tab === "session" && (
                                    <>
                                        {mentorIsLoggedUser ? (
                                            <Button
                                                variant={ButtonVariant.PrimaryLight}
                                                fontVariant="button-md"
                                                href={selectedSession ? `/schedules/edit-session/${selectedSession.id}` : undefined}
                                                disabled={!selectedSession}
                                                disableButton={!selectedSession}
                                            >
                                                Edytuj sesje
                                            </Button>
                                        ) : null}

                                        {optionsSession && optionsSession.length > 0 && (
                                            <MentorServicesSession
                                                services={optionsSession}
                                                selected={selectedSession}
                                                displayRadioInput={!mentorIsLoggedUser}
                                                handleSelect={handleSelectSession}
                                                handleSubmit={
                                                    !mentorIsLoggedUser ? handleSubmitSession : undefined
                                                }
                                            />
                                        )}
                                    </>
                                )}
                            </MentorServices>
                        )}
                    </aside>
                </MentorMainWrapper>
            </Container>

            {mentorData.mentorId ? (
                <Container as={Tag.Section}>
                    <MentorReviewsConnected mentorId={mentorData.mentorId}/>
                </Container>
            ) : null}
        </>
    );
};
