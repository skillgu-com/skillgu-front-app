import React, { useEffect } from "react";
import styles from "../CreateMentoringOffer.module.scss";
import { useCreateOfferReducer } from "src/reducers/createOffer";
import { CreateOfferTemplates } from "../CreateOfferTemplates";
import Button, { ButtonTag, ButtonVariant } from "src/components/Button/Button";
import { createMentoringOffer } from "@services/offer/createMentoringOffer";

export const Summary = () => {
  const co = useCreateOfferReducer();
  const { updateStatus, setPending } = co;
  const { errorMessage, success, pending } = co.createOfferState;

  useEffect(() => {
    const run = async () => {
      setPending(true);
      try {
        const resData = await createMentoringOffer({
          numberOfPlans: co.createOfferState.numberOfPlans,
          providesMaterials: co.createOfferState.providesMaterials,
          basic: co.createOfferState.basic && {
            ...co.createOfferState.basic,
            price: Number(co.createOfferState.basic.price),
            sessionsPerMonth: Number(
              co.createOfferState.basic.sessionsPerMonth
            ),
          },
          advanced: co.createOfferState.advanced && {
            ...co.createOfferState.advanced,
            price: Number(co.createOfferState.advanced.price),
            sessionsPerMonth: Number(
              co.createOfferState.advanced.sessionsPerMonth
            ),
          },
          pro: co.createOfferState.pro && {
            ...co.createOfferState.pro,
            price: Number(co.createOfferState.pro.price),
            sessionsPerMonth: Number(co.createOfferState.pro.sessionsPerMonth),
          },
        });

        if (resData.success === false) {
          throw new Error("");
        }
        updateStatus({ success: true, errorMessage: "" });
      } catch (e) {
        updateStatus({
          success: false,
          errorMessage: "Nie udało się dodać oferty",
        });
      }
      setPending(false);
    };
    if (!success) {
      run();
    }
  }, [
    co.createOfferState.advanced,
    co.createOfferState.basic,
    co.createOfferState.numberOfPlans,
    co.createOfferState.pro,
    co.createOfferState.providesMaterials,
    setPending,
    success,
    updateStatus,
  ]);

  return (
    <CreateOfferTemplates
      title="Wszystko gotowe"
      subtitle="Zajrzyj na swój profil, aby zobaczyć swoje nowe plany."
      step={3}
    >
      {success && (
        <div className={styles.summaryImgBox}>
          <img
            width="503.26px"
            height="263.02px"
            src="/images/mentoring-offer-sum.svg"
            alt="woman payment"
          />
        </div>
      )}
      {pending && <p>Pending</p>}
      {errorMessage && <p>Error</p>}
      <div className={styles.btnBox}>
        {/*//TODO usuniete onclick i dodane href. Zeby nie resetowalo juz wczesniej dodanych mentorshipow */}
        <Button
          as={ButtonTag.InternalLink}
          onClick={() => co.reset()}
          //   as={ButtonTag.InternalLink}
          //   href='' // link do profilu
          fullWidth
          variant={ButtonVariant.Primary}
          type="button"
        >
          Przejdź do profilu
        </Button>
      </div>
    </CreateOfferTemplates>
  );
};
