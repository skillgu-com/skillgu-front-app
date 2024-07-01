import React, { useEffect, useState } from "react";

import styles from "../CreateMentoringOffer.module.scss";

import { useCreateOfferReducer } from "src/reducers/createOffer";
import { CreateOfferTemplates } from "../CreateOfferTemplates";
import Button, { ButtonVariant } from "src/components/Button/Button";
import { RadioButton } from "../elements/RadioButton";
import { OfferPlan } from "../elements/OfferPlan";

export const Build = () => {
  const co = useCreateOfferReducer();

  console.log("Build state", co.createOfferState);

  return (
    <div>
      <CreateOfferTemplates
        title="Setup Twoich planów"
        subtitle="Uzupełnij pola."
        step={3}
      >
        <div className={styles.plansWrapper}>
          <OfferPlan
            title="Plan podstawowy"
            subtitle="Harmonogram dla Planu Podstawowego"
            data={co.createOfferState.base}
          />
          {co.createOfferState.numberOfPlans > 2 ? (
            <OfferPlan
              title="Plan zaawansowany"
              subtitle="Harmonogram dla Planu Zaawansowanego"
              data={co.createOfferState.advanced}
            />
          ) : null}
          {co.createOfferState.numberOfPlans > 1 && (
            <OfferPlan
              title="Plan pro"
              subtitle="Harmonogram dla Planu Pro"
              data={co.createOfferState.pro}
              pro
            />
          )}
        </div>

        <div className={styles.flex}>
          <div className={styles.legendBuild}>
            <p>Dostarczasz materiały?</p>
            <p>Tutaj jakiś opis wyjaśniający.</p>
          </div>
          <div className={styles.flex}>
            <RadioButton
              id="yes"
              name="materials-provider"
              label="TAK"
              onChange={() => console.log(2)}
              checked={co.createOfferState.providesMaterials === true}
            />
            <RadioButton
              id="no"
              name="materials-provider"
              label="NIE"
              onChange={() => console.log(2)}
              checked={co.createOfferState.providesMaterials === false}
            />
          </div>
        </div>
        <div className={styles.btnBox}>
          <Button
            onClick={co.prevStep}
            variant={ButtonVariant.PrimaryLight}
            type="button"
            fullWidth
          >
            Wróć
          </Button>
          <Button
            onClick={() => {
              console.log(1);
            }}
            variant={ButtonVariant.Primary}
            type="button"
            fullWidth
            // disableButton={true}
          >
            Dalej
          </Button>
        </div>
      </CreateOfferTemplates>
    </div>
  );
};
