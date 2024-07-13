import React, { useState } from "react";
import clx from "classnames";
import styles from "../MentorOfferDetails.module.scss";
import { ServiceMentoring } from "@customTypes/order";
import { OfferStatus } from "@services/offer/offer.service";
import { useMentorOfferDetails } from "../context/MentorOfferDetailsContext";
import { ContentWrapper } from "../elements";
import Button, { ButtonTag, ButtonVariant } from "src/components/Button/Button";

export const Rejected = () => {
  const { offer, pending, handleAccept, handleReject, handleFeedback } =
    useMentorOfferDetails();
  const [desc, setDesc] = useState<string>("");

  return offer ? (
    <ContentWrapper
      title={`Odmówiłeś współpracy studentowi`}
      description={
        <>
          Listę wszystkich swoich aktywnych studentów możesz znaleźć{" "}
          <a href="/#">tutaj</a>.
        </>
      }
      sidebar
    >
      <div className={styles.rejected}>
        {offer.rejectionFeedback ? (
          <div>
            <div className={styles.fieldText}>
              <label className={styles.label}>
                Twoja odpowiedź wysłana do studenta
              </label>
              <p className={styles.readTextarea}>{offer.rejectionFeedback}</p>
            </div>
            <div className={styles.actions}>
              <Button
                size="sm"
                noWrap
                classes={styles.btn}
                variant={ButtonVariant.Primary}
                as={ButtonTag.InternalLink}
                href="/students"
                fontVariant="button-md"
              >
                Powrót do widoku studentów
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.fieldText}>
              <label className={styles.label}>Odpowiedz studentowi</label>
              <textarea
                className={styles.readTextarea}
                placeholder="Nie sądze, abyśmy byli dobrym matchem, ponieważ..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className={styles.actions}>
              <Button
                size="sm"
                noWrap
                classes={styles.btn}
                variant={ButtonVariant.Primary}
                onClick={() => handleFeedback(desc)}
                fontVariant="button-md"
                disableButton={!desc}
              >
                Wyślij
              </Button>
            </div>
          </div>
        )}
      </div>
    </ContentWrapper>
  ) : null;
};
