import React, {useEffect, useMemo, useState} from "react";
import styles from "../CreateMentoringOffer.module.scss";
import {useCreateOfferReducer} from "src/reducers/createOffer";
import {CreateOfferTemplates} from "../CreateOfferTemplates";
import Button, {ButtonTag, ButtonVariant} from "src/components/Button/Button";
import {RadioButton} from "../elements/RadioButton";
import {OfferPlan} from "../elements/OfferPlan";
import {SubscriptionPlan} from "@customTypes/order";
import {Data} from "src/reducers/createOffer/types";
import {getStateErrorMessage, validateState} from "../utils";
import { initialStep} from "src/reducers/createOffer/constants";
import { PlusIcon } from "@icons/PlusIcon";
import { getUserStripeIntegrationStatus } from "src/redux/selectors/authSelectors";
import { useSelector } from "react-redux";

export const Build = () => {
  const co = useCreateOfferReducer();
  const state = co.createOfferState;
  const [selected, setSelected] = useState<SubscriptionPlan | null>(null);

  useEffect(() => {
    const hasAnyPlan = !!(state.basic || state.advanced || state.pro)
    if(!hasAnyPlan){
      // co.prevStep()
      // co.prevStep()
    }
  }, [co, state.advanced, state.basic, state.pro])

  const valid = useMemo(() => {
    return validateState(state);
  }, [state]);

  const validMsg = getStateErrorMessage(valid);

  const addPlan = () => {
    const newData: Data = {
      saved: state.saved,
      numberOfPlans: state.numberOfPlans,
      providesMaterials: state.providesMaterials,
      basic: state.basic,
    };
    const plansCount = [state.basic, state.advanced, state.pro].filter(s => s !== null).length
    if (plansCount === 0) {
      newData.basic = initialStep.basic;
      newData.numberOfPlans = 1;
    }
    if (plansCount === 1) {
      newData.basic = state.basic;
      newData.advanced = initialStep.advanced;
      newData.numberOfPlans = 2;
    }
    if (plansCount === 2) {
      newData.basic = state.basic;
      newData.advanced = state.advanced;
      newData.pro = initialStep.pro;
      newData.numberOfPlans = 3;
    }
    co.loadOffers(newData);
  };

  const removePlan = (plan: "basic" | "advanced" | "pro") => {
    console.log(6, plan)
    const newData: Data = {
      saved: state.saved,
      numberOfPlans: state.numberOfPlans,
      providesMaterials: state.providesMaterials,
      basic: state.basic,
      advanced: state.advanced,
      pro: state.pro,
    };
    if (plan === "basic") {
      newData.basic = null;
    }
    if (plan === "advanced") {
      newData.advanced = null;
    }
    if (plan === "pro") {
      newData.pro = null;
    }
    const numberOfPlans = [newData.basic, newData.advanced, newData.pro].filter(s => s !== null).length
    const parsedNumberOfPlans = Math.min(1, Math.max(3, numberOfPlans)) as (1|2|3)
    newData.numberOfPlans = parsedNumberOfPlans
    console.log(7,newData)
    co.loadOffers(newData);
  };

  const userStripeIntegrationStatus = useSelector(getUserStripeIntegrationStatus);

  return (
      <CreateOfferTemplates
        title="Setup Twoich planów"
        subtitle="Uzupełnij pola."
        step={2}
      >
        <div className={styles.plansWrapper}>
          <OfferPlan
            errors={valid.errors.basic}
            plan="basic"
            selected={selected === "basic"}
            setSelected={setSelected}
            onRemove={state.numberOfPlans === 1 ? removePlan : undefined}
          />

          {co.createOfferState.advanced ? (
            <OfferPlan
              errors={valid.errors.advanced}
              plan="advanced"
              selected={selected === "advanced"}
              setSelected={setSelected}
              onRemove={state.numberOfPlans === 2 ? removePlan : undefined}
            />
          ) : null}

          {co.createOfferState.pro && (
            <OfferPlan
              errors={valid.errors.pro}
              plan="pro"
              selected={selected === "pro"}
              setSelected={setSelected}
              onRemove={state.numberOfPlans === 3 ? removePlan : undefined}
            />
          )}

          {state.numberOfPlans < 3 ? (
            <div>
              <Button
                as={ButtonTag.Button}
                onClick={addPlan}
                disableButton={!userStripeIntegrationStatus}
                variant={ButtonVariant.Outline}
                type="button"
                classes={styles.addPlanBtn}
              >
                <span>Dodaj plan</span>
                <PlusIcon size={"24px"} />
              </Button>
            </div>
          ) : null}
        </div>

        <div className={styles.legendBuild}>
          <div className={styles.left}>
            <h6>Czy dostarczasz materiały?</h6>
            <p>Tutaj jakiś opis wyjaśniający.</p>
          </div>
          <div className={styles.right}>
            <RadioButton
              id="yes"
              name="materials-provider"
              label="Tak"
              onChange={() => {
                co.submitBuild(
                  {
                    ...state,
                    providesMaterials: true,
                  },
                  false
                );
              }}
              checked={co.createOfferState.providesMaterials === true}
            />
            <RadioButton
              id="no"
              name="materials-provider"
              label="Nie"
              onChange={() => {
                co.submitBuild(
                  {
                    ...state,
                    providesMaterials: false,
                  },
                  false
                );
              }}
              checked={co.createOfferState.providesMaterials === false}
            />
          </div>
        </div>

        {validMsg ? <p className={styles.validMsg}>{validMsg}</p> : null}

        <div className={styles.btnBox}>
          {/* <Button
            onClick={co.prevStep}
            variant={ButtonVariant.PrimaryLight}
            type="button"
            fullWidth
          >
            Wróć
          </Button> */}
          <Button
            onClick={() => {
              co.submitBuild(co.createOfferState, true);
            }}
            variant={ButtonVariant.Primary}
            type="button"
            fullWidth
            disableButton={!valid.isValid}
          >
            Dalej
          </Button>
        </div>
      </CreateOfferTemplates>
  );
};