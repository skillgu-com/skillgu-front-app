import React, { useEffect } from "react";
import clx from "classnames";
import styles from "../CreateMentoringOffer.module.scss";
import { useCreateOfferReducer } from "src/reducers/createOffer";
import { createMentoringOffer } from "@services/services/createMentoringOffer";
import { CreateOfferTemplates } from "../CreateOfferTemplates";
import Button, { ButtonVariant } from "src/components/Button/Button";
import { useNavigate } from "react-router-dom";

export const Summary = () => {
  const co = useCreateOfferReducer();
  const { createOfferState, reset, updateStatus, setPending } = co;
  const { errorMessage, success, pending } = co.createOfferState;
  const navigate = useNavigate();
  console.log("Summary state", co.createOfferState);

  useEffect(() => {
    const run = async () => {
      setPending(true);
      try {
        const resData = await createMentoringOffer({
          numberOfPlans: co.createOfferState.numberOfPlans,
          providesMaterials: co.createOfferState.providesMaterials,
          base: co.createOfferState.base,
          advanced: co.createOfferState.advanced,
          pro: co.createOfferState.pro,
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
    co.createOfferState.base,
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
      step={4}
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
        <Button
          onClick={() => co.reset()}
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
