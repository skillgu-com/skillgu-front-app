import React from "react";
import styles from "./CreateMentoringOffer.module.scss";
import { useCreateOfferReducer } from "src/reducers/createOffer";
import { Initial, Build, Determine, Summary } from "./steps";
import Container from "src/components/Container/Container";
import { Tag } from "@customTypes/tags";

export const CreateMentoringOffer = () => {
  const isScheduled = true;
  const co = useCreateOfferReducer();

  console.log("Build state", co.createOfferState.advanced);

  return (
    <main className={styles.main}>
      <Container as={Tag.Section} classes={styles.containerOuter}>
        {isScheduled ? (
          <>
            {co.createOfferState.step === "initial" ? (
              <Initial step={co.createOfferState.step} />
            ) : null}
            {co.createOfferState.step === "determine" ? <Determine /> : null}
            {co.createOfferState.step === "build" ? <Build /> : null}
            {co.createOfferState.step === "summary" ? <Summary /> : null}
          </>
        ) : null}
      </Container>
    </main>
  );
};
