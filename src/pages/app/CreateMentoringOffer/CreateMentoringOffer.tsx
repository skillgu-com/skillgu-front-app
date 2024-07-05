import React, { useEffect, useRef, useState } from "react";
import styles from "./CreateMentoringOffer.module.scss";
import { useCreateOfferReducer } from "src/reducers/createOffer";
import { Initial, Build, Determine, Summary, AddScheduleMsg } from "./steps";
import Container from "src/components/Container/Container";
import { Tag } from "@customTypes/tags";
import { Loader } from "src/components/_grouped/loader";
import { fetchAllSchedules } from "@services/scheduleService";

export const CreateMentoringOffer = () => {
  const [initialPending, setInitialPending] = useState<boolean>(true)
  const { createOfferState: state, loadSchedules, setPending, updateStatus } = useCreateOfferReducer();
  const isScheduled = state.availableSchedules.length > 0

  useEffect(() => {
    const fetchInitialData = async () => {
      setPending(true)
      try {
        const { status, data } = await fetchAllSchedules()
        if(String(status).startsWith('20')){
          const parsed = data.map((d) => {
            return ({
              value: d.id,
              label: d.scheduleName
            })
          })
          loadSchedules(parsed)
        }
      } catch (e) {
        updateStatus({ 
          errorMessage: 'Wystąpił błąd podczas komunikacji z serwerem.',
          success: false,
        })
        loadSchedules([])
      }
      setPending(false)
      setInitialPending(false)
    }
    if(!state.fetchedInitial){
      fetchInitialData()
    } else {
      setInitialPending(false)
    }
  }, [state.fetchedInitial, loadSchedules, setPending, setInitialPending, updateStatus])

  return (
    <main className={styles.main}>
      <Container as={Tag.Section} classes={styles.containerOuter}>
        {state.pending ? (
          <Loader overlay shadow spinner />
        ) : null}
        {state.errorMessage ? (
          <div className={styles.errorMessage}>
            <p>state.errorMessage</p>
          </div>
        ) :
        initialPending ? (<Loader spinner />) : isScheduled ? (
          <>
            {state.step === "initial" ? (
              <Initial step={state.step} />
            ) : null}
            {state.step === "determine" ? <Determine /> : null}
            {state.step === "build" ? <Build /> : null}
            {state.step === "summary" ? <Summary /> : null}
          </>
        ) : (
          <AddScheduleMsg />
        )}
      </Container>
    </main>
  );
};
