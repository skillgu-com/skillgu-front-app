import React, { useEffect, useState } from "react";
import styles from "./CreateMentoringOffer.module.scss";
import { useCreateOfferReducer } from "src/reducers/createOffer";
import { Build, Summary, AddScheduleMsg } from "./steps";
import { Loader } from "src/components/_grouped/loader";
import Button from "src/components/Button/Button";
import { useSelector } from "react-redux";
import { fetchMentoringOffer } from "@services/offer/fetchMentoringOffer";
import { useSchedulesReducer } from "src/reducers/schedules";
import { SectionTemplate } from "src/components/SectionTemplate";
import { Tooltip } from "@mui/material";
import { getUserStripeIntegrationStatus } from "../../../redux/selectors/authSelectors";

type MentorData = {
  email: string;
  id: number;
  role: "M" | "S";
  username: string;
};

export const CreateMentoringOffer = () => {
  const [initialPending, setInitialPending] = useState<boolean>(true);
  // const [schedulesData, setSchedulesData] = useState([]); // State to hold the schedule data
  const {
    createOfferState: state,
    reset,
    loadOffers,
    setPending,
    updateStatus,
    submitDetermine,
  } = useCreateOfferReducer();
  const sr = useSchedulesReducer();
  const isScheduled = sr.schedulesState.schedules.length > 0;
  const mentor: MentorData = useSelector((state: any) => state.auth.user);
  const userStripeIntegrationStatus = useSelector(
    getUserStripeIntegrationStatus
  );

  useEffect(() => {
    const hasAnyPlan = !!(state.basic || state.advanced || state.pro);
    const isPreparatorySteps =
      state.step === "initial" || state.step === "determine";
    if (isScheduled && hasAnyPlan && isPreparatorySteps) {
      const numberOfPlans = [state.basic, state.advanced, state.pro].filter(
        (s) => s !== null
      ).length;
      const parsedNumberOfPlans = Math.min(1, Math.max(3, numberOfPlans)) as
        | 1
        | 2
        | 3;
      submitDetermine(parsedNumberOfPlans, true);
    }
  }, [setInitialPending, isScheduled, reset, state, submitDetermine]);

  useEffect(() => {
    const fetchInitialData = async () => {
      setPending(true);
      try {
        const [resOffers] = await Promise.all([fetchMentoringOffer(mentor.id)]);
        if (resOffers.success) {
          loadOffers(resOffers.data);
        }
      } catch (e) {
        updateStatus({
          errorMessage: "Wystąpił błąd podczas komunikacji z serwerem.",
          success: false,
        });
      }
      setPending(false);
      setInitialPending(false);
    };
    if (initialPending) {
      fetchInitialData();
    }
  }, [
    setPending,
    setInitialPending,
    updateStatus,
    loadOffers,
    mentor.id,
    initialPending,
  ]);

  return (
    <main>
      <SectionTemplate
        title="Twój mentoring"
        description="Ustal, jak będzie wyglądał Twój mentoring. Plany, które zaraz utworzysz będą się pojawiały po prawej stronie Twojego profilu"
      >
        <div style={{ opacity: userStripeIntegrationStatus ? 1 : 0.5 }}>
          {!userStripeIntegrationStatus ? (
            <Tooltip
              title="Najpierw przejdź do rozliczeń aby zintegrować się ze Stripe"
              placement="bottom-start"
            >
              <div className={styles.containerOuter}>
                {state.pending ? <Loader overlay shadow spinner /> : null}
                {state.errorMessage ? (
                  <div className={styles.errorMessage}>
                    <p>{state.errorMessage}</p>
                    <div>
                      <Button className={styles.btn} onClick={reset}>
                        Spróbuj od początku
                      </Button>
                    </div>
                  </div>
                ) : isScheduled ? (
                  <>
                    {state.step === "build" ? <Build /> : null}
                    {state.step === "summary" ? <Summary /> : null}
                  </>
                ) : (
                  <AddScheduleMsg />
                )}
              </div>
            </Tooltip>
          ) : (
            <div className={styles.containerOuter}>
              {state.pending ? <Loader overlay shadow spinner /> : null}
              {state.errorMessage ? (
                <div className={styles.errorMessage}>
                  <p>{state.errorMessage}</p>
                  <div>
                    <Button className={styles.btn} onClick={reset}>
                      Spróbuj od początku
                    </Button>
                  </div>
                </div>
              ) : isScheduled ? (
                <>
                  {state.step === "build" ? <Build /> : null}
                  {state.step === "summary" ? <Summary /> : null}
                </>
              ) : (
                <AddScheduleMsg />
              )}
            </div>
          )}
        </div>
        {/* Domknięcie div, które obsługuje opacity */}
      </SectionTemplate>
    </main>
  );
};
