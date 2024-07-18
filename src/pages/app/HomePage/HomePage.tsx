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
import { SimilarMentors, RecommendedMentors } from "./sections";
import {
  StudentSessionsHistory,
  MentorSessionsHistory,
} from "src/components/_connected/sessions-history";

const HomePage = () => {
  const role = useSelector(getRole);

  return (
    <div className={styles.pageWrapper}>
      {role === "S" ? (
        <>
          <Container as={Tag.Main} classes={styles.header}>
            <h2 className={styles.sectionTitle}>Witaj, studencie! 🤓</h2>
            <NavSection />
          </Container>

          <Container as={Tag.Main}>
            <RecommendedMentors />
          </Container>

          <Container as={Tag.Main}>
            <StudentSessionsHistory />
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
