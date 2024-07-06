import React from "react";
import clx from "classnames";
import styles from "../MentorOfferDetails.module.scss";
import { ServiceMentoring } from "@customTypes/order";
import { useMentorOfferDetails } from "../context/MentorOfferDetailsContext";
import { ContentWrapper } from "../elements";
import Button, { ButtonTag, ButtonVariant } from "src/components/Button/Button";

export const Accepted = () => {
  const { offer, pending, handleAccept, handleReject, handleFeedback } =
    useMentorOfferDetails();

  return offer ? (
    <ContentWrapper
      title={`Zaakceptowałeś nowego studenta!`}
      description={
        <>
          Listę wszystkich swoich aktywnych studentów możesz znaleźć{" "}
          <a href="/#">tutaj</a>.
        </>
      }
      sidebar
    >
      <div className={styles.accepted}>
        <img 
        className={styles.ty_img}
        src={"/images/mentoring-accepted.svg"}
        alt="Thank You"
        />
        <div className={styles.actions}>
          <Button
            size="sm"
            noWrap
            classes={styles.btn}
            variant={ButtonVariant.Primary}
            as={ButtonTag.InternalLink}
            href="/students"
            fontVariant='button-md'
          >
            Powrót do widoku studentów
          </Button>
        </div>
      </div>
    </ContentWrapper>
  ) : null;
};
