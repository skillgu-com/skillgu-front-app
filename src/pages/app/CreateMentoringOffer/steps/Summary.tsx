import React, { useEffect } from "react";
import clx from "classnames";
import styles from "../CreateMentoringOffer.module.scss";
import { useCreateOfferReducer } from "src/reducers/createOffer";
import { createMentoringOffer } from "@services/services/createMentoringOffer";

export const Summary = () => {
  const co = useCreateOfferReducer();
  const { createOfferState, reset, updateStatus, setPending } = co;
  const { errorMessage, success, pending } = co.createOfferState;

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
    <div>
      <h1>Summary Step</h1>
      <p>Success</p>
      <p>or</p>
      <p>Pending</p>
      <p>or</p>
      <p>Error</p>
    </div>
  );
};
