// Libraries
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Components
import AppHeader from "src/components/AppHeader/AppHeader";
import Container from "src/components/Container/Container";
// Selectors
import { getRole } from "src/redux/selectors/authSelectors";
// Sections
import NavSection from "./sections/NavSection/NavSection";
// Types
import { Tag } from "src/types/tags";
// Styles
import styles from "./HomePage.module.scss";
import { fetchAllUserData } from "../../../services/userProfileService";
import { MentorSessionsHistory, SimilarMentors } from "./sections";

const HomePage = () => {
  const role = useSelector(getRole);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllUserData()
      .then((res) => {
        dispatch({
          type: "FETCH_ALL_USER_DATA",
          payload: {
            firstName: res?.data.firstName,
            lastName: res?.data.lastName,
            linkedInURL: res?.data.linkedInURL,
            youtubeURL: res?.data.youtubeURL,
            instagramURL: res?.data.instagramURL,
            facebookURL: res?.data.facebookURL,
            websiteURL: res?.data.websiteURL,
            description: res?.data.description,
            skill: res?.data.skill,
            jobPosition: res?.data.jobPosition,
          },
        });
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
      });
  }, [dispatch]);

  return (
    <div className={styles.pageWrapper}>
      {role === "S" ? (
        <>
          <AppHeader
            title={role === "M" ? "Witaj, mentorze! 🤓" : "Witaj Studencie!"}
            text={
              role === "M"
                ? ""
                : "Zarządzaj i sprawdzaj swoje spotkania, zadania, informacje."
            }
          />
          <Container as={Tag.Main} classes={styles.wrapper}>
            <NavSection />
          </Container>
        </>
      ) : null}

      {role === "M" ? (
        <>
        <Container as={Tag.Main} classes={styles.header}>
          <h2 className={styles.sectionTitle}>Witaj, mentorze! 🤓</h2>
          <NavSection />
        </Container>
        
        <Container as={Tag.Main}>
          <SimilarMentors />
        </Container>
      
        <Container as={Tag.Main}>
          <MentorSessionsHistory />
        </Container>
        </>
      ) : null}
    </div>
  );
};

export default HomePage;
