import React, { useEffect, useState } from "react";
import Container from "src/new-components/Container/Container";
import { MentorReviewsConnected } from "@newComponents/_connected";
import { Tag } from "src/types/tags";
import { MentorHeader, MentorHeaderWrapper } from "./sections";
import { useParams } from "react-router-dom";
import { MentorEditFooter, MentorEditSectionAccount, MentorEditSectionLinks, MentorEditSectionNotifications, MentorEditSectionPersonalData, MentorEditSectionProfile } from "./sections/content";
import {
  ServiceMentoring,
  ServiceSession,
  ServiceType,
} from "@customTypes/order";
import { fetchMentorServices } from "src/services/mentor/fetchMentorServices.service";
import styles from "./MentorProfile.module.scss";
import { getMentorProfileByID } from "../../../services/MentorViewService";
import { Typography } from "@mui/material";

/**
 *
 */
export const MentorProfileEditPage = () => {
  const { id: mentorId } = useParams();

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

  // useEffect(() => {
  //     getMentorProfileByID(mentorId).then((res) => {
  //         // setUserData(res.data as UserData)
  //         console.log(res.data)
  //     });
  // }, []);

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
        </Container>
      </MentorHeaderWrapper>

      <Container as={Tag.Section} >
        <MentorEditSectionPersonalData />
        <MentorEditSectionProfile /> 
        <MentorEditSectionLinks />
        <Typography variant='h2' color='secondary' sx={{ display: 'block', margin: '48px 0 24px' }}>
          Ustawienia konta
        </Typography>
        <MentorEditSectionAccount />
        <MentorEditSectionNotifications />
        <MentorEditFooter />
      </Container>
    </>
  );
};
