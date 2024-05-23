// Libraries
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
// Components
import Container from "src/new-components/Container/Container";
import Info from "./components/Info/Info";
import {
  SelectedService,
  SelectedDate,
  Calendar,
  Actions,
  UserDetails,
  Team,
} from "./components";
import { Payment } from "./components/Payment/Payment";
import Modal from "src/new-components/Modal/Modal";
import SessionCard from "src/new-components/Cards/SessionCard/SessionCard";
// Types
import { Tag } from "src/types/tags";
// Styles
import styles from "./BookSession.module.scss";
import { useDispatch, useSelector } from "react-redux";
//
import { faqRows } from "./config";
import FAQ from "src/new-components/FAQ/Accordion";
import { useBookingReducer } from "src/reducers/booking";
import { fetchMentorServices } from "@services/mentor/fetchMentorServices.service";
import { fetchMentors } from "@services/mentor/fetchMentorServices.service";
import { getMentoringSessionSlots } from "@services/mentoringSessions/getMentoringSessionSlots.service";
import { fetchCalendarSession } from "@services/CalendarService";
import { CalendarSlot } from "@customTypes/booking";

interface BookSessionProps {
  payment?: boolean;
}

const BookSession = ({ payment }: BookSessionProps) => {
  const [term, setTerm] = useState<Date | undefined>(undefined);
  const selectTermHandler = (term: Date) => {
    setTerm(term);
  };

  const [state] = useBookingReducer();
  const dispatch = useDispatch();

  console.log("state", state);

  const fetchInitialRef = useRef<boolean>(false);

  useEffect(() => {
    const loadSlots = async () => {
      try {
        const slots = await fetchCalendarSession({
          mentorId: 1,
          sessionID: 1,
        });
        if (slots.status === 200 && Array.isArray(slots.data)) {
          dispatch({
            type: "SET_SLOTS",
            payload: { slots: slots.data as CalendarSlot[] },
          });
        }
      } catch (e) {
        console.error("Failed to load calendar slots.");
      }
    };
    if (state.mentor && state.service) {
      loadSlots();
    }
  }, [dispatch, state.mentor, state.service]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const services = await fetchMentorServices({ mentorId: "1" });
        const mentors = await fetch(`/search-mentor-results-mocked.json`).then(
          (d) => d.json()
        );
        if (services.success && services.mentoring.length) {
          dispatch({
            type: "SET_SERVICE",
            payload: { service: services.mentoring[0] },
          });
        }
        if (
          mentors &&
          "mentors" in mentors &&
          mentors.mentors &&
          Array.isArray(mentors.mentors) &&
          mentors.mentors.length
        ) {
          dispatch({
            type: "SET_MENTOR",
            payload: { mentor: mentors.mentors[0] },
          });
        }
      } catch (e) {
        console.error("Failed to load mentor/service data.");
      }
      fetchInitialRef.current = true;
    };

    if (!fetchInitialRef.current) {
      fetchInitialData();
    }
  }, [dispatch]);

  return (
    <>
      <div className={styles.wrapper}>
        {payment ? null : (
          <aside>
            <SelectedService />

            <SelectedDate selectedDate="13.02.2024" selectedTime="9:30" />
          </aside>
        )}

        <main>
          {payment ? (
            <section>
              <Payment />
            </section>
          ) : (
            <section>
              <Calendar selectTermHandler={selectTermHandler} />

              <div>
                <h3 className={styles.title}>Szczegóły sesji</h3>

                <div className={styles.formWrapper}>
                  <UserDetails />

                  <Team />
                </div>
              </div>

              <Actions />
            </section>
          )}

          <section>
            <FAQ title="FAQ" elements={faqRows} />
          </section>
        </main>
      </div>
    </>
  );
};

export default BookSession;
