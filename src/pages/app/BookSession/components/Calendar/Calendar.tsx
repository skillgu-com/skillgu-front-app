// Libraries
import React, { FormEvent, useEffect, useState } from "react";
import { Calendar as ReactCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import classNames from "classnames";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Components
import Input, { defaultInput } from "src/new-components/Input/Input";
import { Title } from "src/new-components/typography";
import Button from "src/new-components/Button/Button";
import FAQ from "src/new-components/FAQ/Accordion";
import Checkbox from "src/new-components/Checkbox/Checkbox";

// Styles
import styles from "./BookForm.module.scss";
// Types
import {
  TitleTag,
  TitleVariant,
} from "src/new-components/typography/Title/Title";
import { fetchCalendarSession } from "src/services/CalendarService";

interface BookFormProps {
  selectTermHandler: (term: Date) => void;
}

const localizer = momentLocalizer(moment);

interface CalendarEvent {
  id: number;
  start: Date;
  end: Date;
  title: string;
  allDay: false;
}

interface ExtendedEvent extends CalendarEvent {
  available: boolean;
}

export const Calendar = (props: BookFormProps) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { selectTermHandler } = props;
  const navigate = useNavigate();

  const [currentEvent, setCurrentEvent] = useState<null | number>(null);
  const [term, setTerm] = useState<null | Date>(null);
  const [combinedData, setCombinedData] = useState<CalendarEvent[]>([]);
  const sessionIDFromRedux = useSelector(
    (state: any) => state.sessionIDStep.sessionState
  );

console.log("combinedData", sessionIDFromRedux)

  useEffect(() => {
    dispatch({
      type: "UPDATE_BOOK_FORM",
      payload: {
        calendarEventId: currentEvent,
        term: term,
      },
    });
  });

  useEffect(() => {
    id &&
      fetchCalendarSession({ mentorId: Number(id), sessionID: sessionIDFromRedux })
        .then((res) => {
          const dataFromApi = res.data;
          const events: any[] = [];

          dataFromApi.forEach((item: any, index: number) => {
            const startDateTime = new Date(item.sessionDate + "T" + item.hour);
            const endDateTime = new Date(
              startDateTime.getTime() + 60 * 60 * 1000
            );
            const event = {
              id: item.calendarEventId,
              title:
                startDateTime.getHours() +
                ":" +
                (startDateTime.getMinutes() < 10 ? "0" : "") +
                startDateTime.getMinutes(),
              allDay: true,
              start: startDateTime,
              end: endDateTime,
              available: item.available,
            };
            events.push(event);
          });
          setCombinedData(events);
        })
        .catch((error) => {
          console.error("Błąd podczas pobierania danych z serwera:", error);
        });
  }, [id]);

  const [form, setForm] = useState({
    term: defaultInput,
    topic: defaultInput,
    email: defaultInput,
    nip: defaultInput,
    phone: defaultInput,
    guests: {
      ...defaultInput,
      value: {
        guest0: {
          name: defaultInput,
          email: defaultInput,
          message: defaultInput,
        },
      },
    },
    policy: { ...defaultInput, value: false },
  });

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/session-book/1/payment`);
  };

  useEffect(() => {
    if (currentEvent !== null) {
      updateFormHandler("term", new Date());
    }
  }, [currentEvent]);

  const updateFormHandler = (name: string, value: any) => {
    setForm({ ...form, [name]: value });
  };

  return (
    <section className={styles.wrapper}>
        <Title
          classes={classNames(styles.title, styles.titleMt0)}
          tag={TitleTag.h3}
          variant={TitleVariant.standard}
        >
          Wybierz termin i godzinę sesji
        </Title>
        <ReactCalendar
          localizer={localizer}
          view="week"
          onView={() => null}
          className={styles.calendar}
          events={combinedData}
          startAccessor="start"
          endAccessor="end"
          components={{
            header: ({ date }) => {
              return (
                <p className={styles.header}>
                  <span>
                    {date.toLocaleDateString("pl-PL", { weekday: "short" })}
                  </span>
                  <small>
                    {date.getDate()}{" "}
                    {date.toLocaleString("default", { month: "long" })}
                  </small>
                </p>
              );
            },
            eventWrapper: ({ event }) => {
              const { available } = event as ExtendedEvent;

              return (
                <button
                  disabled={!available}
                  data-is-current={event.id === currentEvent}
                  className={styles.hour}
                  onClick={() => {
                    setCurrentEvent(event.id);
                    selectTermHandler(event.start);
                    updateFormHandler("term", event.start);
                    setTerm(event.start);
                  }}
                >
                  {event.start.toLocaleTimeString("pl-PL", {
                    hour12: false,
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </button>
              );
            },
            dateCellWrapper: () => <div className={styles.day}></div>,
          }}
        />
    </section>
  );
};
