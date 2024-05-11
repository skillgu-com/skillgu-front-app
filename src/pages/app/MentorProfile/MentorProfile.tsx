import React, { useEffect, useState } from "react";
import Container from "src/new-components/Container/Container";
import { MentorReviewsConnected } from "@newComponents/_connected";
import { Tag } from "src/types/tags";
import { MentorHeader, MentorHeaderWrapper } from "./components";
import { useParams } from "react-router-dom";
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
import { fetchMentorServices } from "src/services/mentor/fetchMentorServices.service";
import styles from "./MentorProfile.module.scss";
import { getMentorProfileByID } from "../../../services/MentorViewService";
import { SpecialVariant } from "@customTypes/mentor";
import { fetchMentorSession } from "../../../services/SessionService";
import { MentorProfileHeader } from "@newComponents/_grouped";
import { LangSwitcherConnected } from "@newComponents/_connected/lang-switcher/LangSwitcher";
import clx from 'classnames'

type Props = {
  isLoggedMentor: boolean;
};

export interface MentorData {
  avatar_url: string;
  description: string;
  id: string;
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
  specialVariant: SpecialVariant;
  services: {
    id: number;
    name: string;
  }[];
  skill: {
    id: number;
    name: string;
  }[];
  mentorTopics: {
    id: number;
    name: string;
  }[];
  jobPosition: {
    id: number;
    name: string;
  }[];
  mentorCategory: {
    id: number;
    name: string;
  }[];
  linkedin: string | null;
  websiteURL: string | null;
  youtubeURL: string | null;
  instagramURL: string | null;
  xurl: string | null;
  facebookURL: string | null;
}

export const MentorProfilePage = () => {
  const { id: mentorId } = useParams();

  const [tab, setTab] = useState<ServiceType>("mentoring");
  const [mentorData, setMentorData] = useState<MentorData>({} as MentorData);

  // @TODO: get user id from sesion/jwt
  const mentorIsLoggedUser = true;

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

  useEffect(() => {
    getMentorProfileByID(mentorId).then((res) => {
      setMentorData(res.data as MentorData);
    });
  }, []);

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
        setOptionsSession(formattedSessions);
        setLoading(false);
      }
    });
  }, [mentorId]);

  return (
    <>
      <MentorProfileHeader
        avatarUrl="/images/img_avatar.png"
        btnText={mentorIsLoggedUser ? "Edytuj profil" : ""}
        btnHref={mentorIsLoggedUser ? "/edit-mentor/13" : ""}
        company="Google"
        coverUrl="/images/header-banner-bg.jpg"
        fullname={mentorData?.firstName + " " + mentorData?.lastName}
        langSwitcher={<LangSwitcherConnected />}
        location={mentorData?.location}
        profession={mentorData?.jobPosition?.map((j) => j.name).join(", ")}
      />

      <Container as={Tag.Section}>
        <MentorLinks
          className={clx(styles.onlyMobileFlex, styles.socialLinksMobile)}
          instagram={mentorData?.instagramURL ?? "#"}
          youtube={mentorData?.youtubeURL ?? "#"}
          linkedin={mentorData?.linkedin ?? "#"}
          twitter={mentorData?.xurl ?? "#"}
          facebook={mentorData?.facebookURL ?? "#"}
        />
        <MentorMainWrapper>
          <main>
            <MentorContent
              title={mentorData?.intro}
              contentHtml={mentorData?.description}
              contentExpandable={mentorData?.description?.length > 120}
              skills={mentorData?.skill}
              services={mentorData?.services}
            />
            <MentorLinks
              isDesktop
              className={styles.onlyDesktopFlex}
              instagram={mentorData?.instagramURL ?? "#"}
              youtube={mentorData?.youtubeURL ?? "#"}
              linkedin={mentorData?.linkedin ?? "#"}
              twitter={mentorData?.xurl ?? "#"}
              facebook={mentorData?.facebookURL ?? "#"}
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
                    handleSelect={!mentorIsLoggedUser ? handleSelectMentoring : undefined}
                    handleSubmit={!mentorIsLoggedUser ? handleSubmitMentoring : undefined}
                  />
                ) : null}
                {tab === "session" &&
                  optionsSession &&
                  optionsSession.length > 0 && (
                    <MentorServicesSession
                      services={optionsSession}
                      selected={selectedSession}
                      handleSelect={!mentorIsLoggedUser ? handleSelectSession : undefined}
                      handleSubmit={!mentorIsLoggedUser ? handleSubmitSession : undefined}
                    />
                  )}
              </MentorServices>
            )}
          </aside>
        </MentorMainWrapper>
      </Container>

      {mentorId ? (
        <Container as={Tag.Section}>
          <MentorReviewsConnected mentorId={mentorId} />
        </Container>
      ) : null}
    </>
  );
};
