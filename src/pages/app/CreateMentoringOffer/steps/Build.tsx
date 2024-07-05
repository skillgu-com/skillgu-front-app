import React, { useEffect, useState } from "react";

import styles from "../CreateMentoringOffer.module.scss";

import { useCreateOfferReducer } from "src/reducers/createOffer";
import { CreateOfferTemplates } from "../CreateOfferTemplates";
import Button, { ButtonVariant } from "src/components/Button/Button";
import { RadioButton } from "../elements/RadioButton";
import { OfferPlan } from "../elements/OfferPlan";
import DropdownIcon from "@icons/DropdownIcon";

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
          <div>
            <div className={styles.containerSchedule}>
              <p className={styles.scheduleSubtitle}>
                Harmonogram dla Planu Podstawowego
              </p>
              <p className={styles.box}>
                <span>{co.createOfferState.base?.schedule}</span>
                <DropdownIcon />
              </p>
            </div>
            <OfferPlan
              title="Plan podstawowy"
              data={co.createOfferState.base}
            />
          </div>

          {co.createOfferState.numberOfPlans > 2 ? (
            <div>
              <div className={styles.containerSchedule}>
                <p className={styles.scheduleSubtitle}>
                  Harmonogram dla Planu Zaawansowanego
                </p>
                <p className={styles.box}>
                  <span>{co.createOfferState.advanced?.schedule}</span>
                  <DropdownIcon />
                </p>
              </div>
              <OfferPlan
                title="Plan zaawansowany"
                data={co.createOfferState.advanced}
              />
            </div>
          ) : null}
          {co.createOfferState.numberOfPlans > 1 && (
            <div>
              <div className={styles.containerSchedule}>
                <p className={styles.scheduleSubtitle}>Harmonogram dla Planu Pro</p>
                <p className={styles.box}>
                  <span>{co.createOfferState.pro?.schedule}</span>
                  <DropdownIcon />
                </p>
              </div>
              <OfferPlan title="Plan pro" data={co.createOfferState.pro} pro />
            </div>
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
              co.submitBuild(co.createOfferState)
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
