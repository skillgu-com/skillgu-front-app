import React, {FC} from "react";
import styles from "../../pages/app/BookSession/components/Calendar/BookForm.module.scss";
import {Calendar as ReactCalendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import {get} from "react-hook-form";

moment.updateLocale("pl", {
    week: {
        dow: 1,
    },
});

const localizer = momentLocalizer(moment);

export type CalendarEvent = {
    id: number;
    start: Date;
    end: Date;
    title: string;
    allDay: boolean;
}

export type ExtendedEvent = CalendarEvent & {
    available: boolean;
}

type Props = {
    selectedEventsId: number[] | null;
    events: (CalendarEvent | ExtendedEvent)[];
    onEventClick: (event: CalendarEvent) => void;
    onNavigate?: (date: Date) => void;
}

const WeeklyCalendarPicker: FC<Props> = ({ events, selectedEventsId = [], onEventClick, onNavigate }) => {
    return (
        <section className={styles.wrapper}>
            <ReactCalendar
                localizer={localizer}
                view="week"
                onView={() => null}
                className={styles.calendar}
                events={events}
                startAccessor="start"
                endAccessor="end"
                onNavigate={onNavigate}
                components={{
                    header: ({ date }) => {
                        return (
                            <p className={styles.header}>
                                <span>
                                    {date.toLocaleDateString("pl-PL", { weekday: "short" })}
                                </span>
                                <small>
                                    {date.getDate()}{" "}
                                    {date.toLocaleString("pl-PL", { month: "long" })}
                                </small>
                            </p>
                        );
                    },
                    eventWrapper: ({ event }) => {
                        const available = get(event, "available", false);

                        return (
                            <button
                                disabled={!available}
                                data-is-current={selectedEventsId && selectedEventsId.includes(event.id)}
                                className={styles.hour}
                                onClick={() => onEventClick(event)}
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
}

export default WeeklyCalendarPicker;