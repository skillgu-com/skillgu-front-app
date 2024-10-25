import React, { useCallback, useState } from "react";

import Button, { ButtonVariant } from "src/components/Button/Button";
import Accordion from "src/components/FAQ/Accordion/Accordion";
import { Text } from "src/components/typography";
import { AddQuestionPopup } from "src/components/AddQuestionPopup/AddQuestionPopup";

import styles from "./HelpPage.module.scss";
import { faqList } from "./config";
import { SectionTemplate } from "src/components/SectionTemplate";

const HelpPage = () => {
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [isMsgSent, setIsMsgSent] = useState<boolean>(false);
  const toogleModalOpened = useCallback(() => setPopupOpen((s) => !s), []);

  return (
    <main>
      <AddQuestionPopup
        isOpen={popupOpen}
        handleClose={toogleModalOpened}
        setIsMsgSent={setIsMsgSent}
      />
      <SectionTemplate title="Pomoc">
        <div className={styles.gridContainer}>
          <div className={styles.boxWithBtn}>
            <Text classes={styles.subtitle}>
              {isMsgSent
                ? "Dziękujemy! Wiadomość została wysłana"
                : "Najczęściej zadawane pytania"}
            </Text>
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
            <Accordion title="" elements={faqList} />
          </section>
        </div>
      </SectionTemplate>
    </main>
  );
};

export default HelpPage;
