import React, { useEffect, useMemo, useState } from "react";
import Container from "src/components/Container/Container";
import { Tag } from "src/types/tags";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  getMentorByUsername,
  getMentorshipPlansForMentorProfile,
  MentorshipPlanDTO,
} from "src/services/mentor/fetchMentorServices.service";
import styles from "./MentorProfile.module.scss";
import clx from "classnames";
import { useSelector } from "react-redux";
import { MentorData } from "src/pages/app/MentorProfileEdit";
import { UserProfileHeader } from "../../../components/_grouped";
import {
  LangOption,
  MentorLangs,
} from "../../../components/_grouped/languages/MentorLangs";
import { MentorReviewsConnected } from "../../../components/_connected";
import { getMentorSessions } from "@services/session/sessionService";
import Button, { ButtonVariant } from "src/components/Button/Button";
import {
  MentoringSkeleton,
  MentorProfilePageSkeleton,
} from "./MentorProfileSkeleton";

export const MentorProfilePage = () => {
  const { username } = useParams<{ username: string | "" }>();

  const location = useLocation();
  const navigate = useNavigate();

  const [tab, setTab] = useState<ServiceType>("session");
  const [mentorData, setMentorData] = useState<MentorData>({} as MentorData);
  const [pending, setPending] = useState<boolean>(true);
  const [mentorId, setMentorId] = useState<string | null>(null);
  const userFromRedux = useSelector((state: any) => state.auth.user);

  // @TODO: get user id from sesion/jwt

  const [optionsMentoring, setOptionsMentoring] = useState<MentorshipPlanDTO[]>(
    []
  );
  const [optionsSession, setOptionsSession] = useState<ServiceSession[]>([]);
  const [selectedMentoring, setSelectedMentoring] =
    useState<null | MentorshipPlanDTO>(null);

  const toggleTab = () =>
    setTab((s) => (s === "mentoring" ? "session" : "mentoring"));
  const [loading, setLoading] = useState<boolean>(true);

  const handleSubmitMentoring = (opt: MentorshipPlan) => {
    navigate(`/mentorship/${opt.id}/application`);
  };

  const handleSubmitSession = (opt: ServiceSession) => {
    navigate(`/session-book/${opt.id}`, {
      state: { opt, from: location?.pathname },
    });
  };
  const handleSelectMentoring = (opt: MentorshipPlan) =>
    setSelectedMentoring(opt);

  const [selectedSession, setSession] = useState<null | ServiceSession>(null);
  //   const [popupSession, setPopupSession] = useState<null | ServiceSession>(null);
  const handleSelectSession = (opt: ServiceSession) => setSession(opt);

  useEffect(() => {
    if (!username) return;
    const fetchInitialData = async (name: string) => {
      setPending(true);
      try {
        if (name) {
          const mentorResponse = await getMentorByUsername(name);
          const mentorData = mentorResponse.data as MentorData;
          setMentorData(mentorData);
          const id = mentorResponse.data?.mentorId;

          if (id) {
            setMentorId(id);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setPending(false);
      }
    };

    fetchInitialData(username);
  }, [username]);

  useEffect(() => {
    if (!mentorId) return;
    const fetchMentoring = async (id: string) => {
      setLoading(true);
      try {
        if (!id) return;
        const mentoringResponse = await getMentorshipPlansForMentorProfile({
          mentorId: mentorId,
        });

        if (mentoringResponse) {
          setOptionsMentoring(mentoringResponse.mentorships);
        }
      } catch (error) {
        console.error("Error fetching mentoring:", error);
      } finally {
        setLoading(false);
      }
    };
    if (mentorId) {
      fetchMentoring(mentorId);
    }
  }, [mentorId]);

  useEffect(() => {
    if (!mentorId) return;
    const fetchSession = async (id: number) => {
      try {
        if (!id) return;
        const sessionResponse = await getMentorSessions(mentorData?.userID);

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
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    if (Number(mentorId)) {
      fetchSession(Number(mentorId));
    }
  }, [mentorId]);

  const useIsMentorLoggedUser = (data: MentorData) => {
    return useMemo(() => {
      return userFromRedux?.id === data?.userID;
    }, [userFromRedux, data?.userID]);
  };
  const mentorIsLoggedUser = useIsMentorLoggedUser(mentorData);

  if (mentorData && Object.keys(mentorData).length === 0 && !pending)
    return (
      <Container as={Tag.Section} classes={styles.container}>
        <p className={styles.paragraf}>Szukany Mentor nie istnieje.</p>
        <p className={styles.paragraf}>
          Na Skillgu znajdziesz mentora, który najbardziej odpowiada Twoim
          potrzebom.
        </p>
        <Button href="/search-mentors" classes={styles.btn}>
          Znajdź mentora
        </Button>
      </Container>
    );

  return pending ? (
    <MentorProfilePageSkeleton />
  ) : (
    <>
      <UserProfileHeader
        avatarUrl={
          mentorData?.profileImage ||
          "https://res.cloudinary.com/dkclg8ppw/image/upload/v1725528576/default/avatar.jpg"
        }
        btnText={mentorIsLoggedUser ? "Edytuj profil" : ""}
        btnHref={mentorIsLoggedUser ? `/edit-mentor/${username}` : ""}
        company={mentorData?.company}
        coverUrl={
          mentorData?.coverImage ||
          "https://res.cloudinary.com/dkclg8ppw/image/upload/v1725528618/default/cover.png"
        }
        fullname={mentorData?.firstName + " " + mentorData?.lastName}
        langSwitcher={
          <MentorLangs langs={mentorData?.language as LangOption[]} />
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
          dribbble={mentorData?.dribbble ?? "#"}
          behance={mentorData?.behance ?? "#"}
          website={mentorData?.website ?? "#"}
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
              dribbble={mentorData?.dribbble ?? "#"}
              behance={mentorData?.behance ?? "#"}
              website={mentorData?.website ?? "#"}
            />
          </main>
          <aside>
            {loading ? (
              <MentoringSkeleton />
            ) : (
              <MentorServices activeTab={tab} handleSwitchTab={toggleTab}>
                {tab === "mentoring" ? (
                  <>
                    {mentorIsLoggedUser ? (
                      <Button
                        variant={ButtonVariant.PrimaryLight}
                        fontVariant="button-md"
                        href={
                          selectedMentoring ? `/create-mentoring` : undefined
                        }
                        disabled={!selectedMentoring}
                        disableButton={!selectedMentoring}
                      >
                        Edytuj plan
                      </Button>
                    ) : null}

                    <MentorServicesMentoring
                      services={optionsMentoring}
                      selected={selectedMentoring}
                      displayRadioInput={!mentorIsLoggedUser}
                      mentorIsLoggedUser={mentorIsLoggedUser}
                      handleSelect={handleSelectMentoring}
                      handleSubmit={
                        !mentorIsLoggedUser ? handleSubmitMentoring : undefined
                      }
                    />
                  </>
                ) : null}
                {tab === "session" && (
                  <>
                    {/*{mentorIsLoggedUser ? (*/}
                    {/*    <Button*/}
                    {/*        variant={ButtonVariant.PrimaryLight}*/}
                    {/*        fontVariant="button-md"*/}
                    {/*        href={*/}
                    {/*            selectedSession*/}
                    {/*                ? `/schedules/edit-session/${selectedSession.id}`*/}
                    {/*                : undefined*/}
                    {/*        }*/}
                    {/*        disabled={!selectedSession}*/}
                    {/*        disableButton={!selectedSession}*/}
                    {/*    >*/}
                    {/*        Edytuj sesje*/}
                    {/*    </Button>*/}
                    {/*) : null}*/}

                    {optionsSession && optionsSession.length > 0 && (
                      <MentorServicesSession
                        services={optionsSession}
                        selected={selectedSession}
                        mentorIsLoggedUser={mentorIsLoggedUser}
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

      {mentorData?.mentorId ? (
        <Container as={Tag.Section}>
          <MentorReviewsConnected username={username ?? null} />
        </Container>
      ) : null}
    </>
  );
};
