import React, { useCallback, useState } from "react";

import Button, { ButtonVariant } from "@newComponents/Button/Button";
import Container from "@newComponents/Container/Container";
import FAQ from "@newComponents/FAQ/Accordion";
import { Text, Title } from "@newComponents/typography";
import { TitleTag, TitleVariant } from "@newComponents/typography/Title/Title";
import { Tag } from "@customTypes/tags";

import styles from "./HelpPage.module.scss";
import { faqList } from "./config";
import { AddQuestionPopup } from "./AddQuestionPopup/AddQuestionPopup";

const HelpPage = () => {
  const [popupOpen, setPopupOpen] = useState<boolean>(false);

  const toogleModalOpened = useCallback(() => setPopupOpen((s) => !s), []);

  return (
    <main>
      <AddQuestionPopup isOpen={popupOpen} handleClose={toogleModalOpened} />
      <Container as={Tag.Section}>
        <Title
          tag={TitleTag.h2}
          variant={TitleVariant.sectionConst}
          classes={styles.title}
        >
          Pomoc
        </Title>
        <div className={styles.gridContainer}>
          <div className={styles.boxWithBtn}>
            <Text classes={styles.subtitle}>Najczęściej zadawane pytania</Text>
            <Text classes={styles.info}>
              Nie znalazłeś odpowiedzi na swoje pytanie? Napisz do nas, a
              odpowiemy najszybciej jak to możliwe
            </Text>
            <Button
              onClick={toogleModalOpened}
              classes={styles.button}
              variant={ButtonVariant.Primary}
              type="button"
            >
              Wyślij zapytanie
            </Button>
          </div>
          <section className={styles.faqSection}>
            <FAQ title="" elements={faqList} />
          </section>
        </div>
      </Container>
    </main>
  );
};

export default HelpPage;
