// Libraries
import React, {FormEvent, useEffect, useState} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import classNames from 'classnames';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

// Components
import Input, {defaultInput} from 'src/new-components/Input/Input';
import {Title} from 'src/new-components/typography';
import Button from 'src/new-components/Button/Button';
import FAQ from 'src/new-components/FAQ/Accordion';
import Checkbox from 'src/new-components/Checkbox/Checkbox';
import Team from '../Team/Team';
// Styles
import styles from './BookForm.module.scss';
// Types
import {
    TitleTag,
    TitleVariant,
} from 'src/new-components/typography/Title/Title';
import {fetchCalendarSession} from 'src/services/CalendarService';

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

const BookForm = (props: BookFormProps) => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const {selectTermHandler} = props;
    const navigate = useNavigate();

    const [currentEvent, setCurrentEvent] = useState<null | number>(null);
    const [term, setTerm] = useState<null | Date>(null);
    const [combinedData, setCombinedData] = useState<CalendarEvent[]>([]);
    const sessionIDFromRedux = useSelector((state: any) => state.sessionIDStep.sessionState);

    useEffect(() => {
        dispatch({
            type: 'UPDATE_BOOK_FORM',
            payload: {
                calendarEventId: currentEvent,
                term: term,
            },
        });
    },);



    useEffect(() => {
        id &&
        fetchCalendarSession({mentorID: id, sessionID: sessionIDFromRedux})
            .then((res) => {
                const dataFromApi = res.data;
                const events: any[] = [];


                dataFromApi.forEach((item: any, index: number) => {
                    const startDateTime = new Date(item.sessionDate + 'T' + item.hour);
                    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);
                    const event = {
                        id: item.calendarEventId,
                        title:
                            startDateTime.getHours() +
                            ':' +
                            (startDateTime.getMinutes() < 10 ? '0' : '') +
                            startDateTime.getMinutes(),
                        allDay: true,
                        start: startDateTime,
                        end: endDateTime,
                        available: item.available,
                    };
                    events.push(event);
                    console.log(events)

                });
                setCombinedData(events);
            })
            .catch((error) => {
                console.error('Błąd podczas pobierania danych z serwera:', error);
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
                guest0: {name: defaultInput, email: defaultInput, message: defaultInput},
            },
        },
        policy: {...defaultInput, value: false},
    });

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        navigate(`/session-book/1/payment`);
    };

    useEffect(() => {
        if (currentEvent !== null) {
            updateFormHandler('term', new Date());
        }
    }, [currentEvent]);

    const updateFormHandler = (name: string, value: any) => {
        setForm({...form, [name]: value});
    };

    return (
        <section className={styles.wrapper}>
            <form onSubmit={submitHandler}>
                <Title
                    classes={classNames(styles.title, styles.titleMt0)}
                    tag={TitleTag.h3}
                    variant={TitleVariant.standard}>
                    Termin
                </Title>
                <Calendar
                    localizer={localizer}
                    view='week'
                    onView={() => null}
                    className={styles.calendar}
                    events={combinedData}
                    startAccessor='start'
                    endAccessor='end'
                    components={{
                        header: ({date}) => {
                            return (
                                <p className={styles.header}>
                                    <span>{date.toLocaleDateString('pl-PL', {weekday: 'short'})}</span>
                                    <small>
                                        {date.getDate()} {date.toLocaleString('default', {month: 'long'})}
                                    </small>
                                </p>
                            );
                        },
                        eventWrapper: ({event}) => {
                            const {available} = event as ExtendedEvent;

                            return (
                                <button
                                    disabled={!available}
                                    data-is-current={event.id === currentEvent}
                                    className={styles.hour}
                                    onClick={() => {
                                        setCurrentEvent(event.id);
                                        selectTermHandler(event.start);
                                        updateFormHandler('term', event.start);
                                        setTerm(event.start)
                                    }}>
                                    {event.start.toLocaleTimeString('pl-PL', {
                                        hour12: false,
                                        hour: 'numeric',
                                        minute: 'numeric',
                                    })}
                                </button>
                            );
                        },
                        dateCellWrapper: () => <div className={styles.day}></div>,
                    }}
                />
                <Title
                    classes={styles.title}
                    tag={TitleTag.h3}
                    variant={TitleVariant.standard}>
                    Temat spotkania
                </Title>
                <Input
                    id='topic'
                    name='topic'
                    as='textarea'
                    classes={styles.textarea}
                    placeholder={'Napisz do mnie...'}
                    value={form.topic.value}
                    errorMessage={form.topic.errorMessage}
                    isValid={form.topic.isValid}
                    valueChangeHandler={updateFormHandler}
                />

                <Title
                    classes={styles.title}
                    tag={TitleTag.h3}
                    variant={TitleVariant.standard}>
                    Twoje dane
                </Title>
                <div className={styles.formSection}>
                    <Input
                        id='email'
                        name='email'
                        type='email'
                        placeholder={'E-mail'}
                        value={form.email.value}
                        errorMessage={form.email.errorMessage}
                        isValid={form.email.isValid}
                        valueChangeHandler={updateFormHandler}
                    />
                    <Input
                        id='nip'
                        name='nip'
                        type='nip'
                        placeholder={'NIP'}
                        value={form.nip.value}
                        errorMessage={form.nip.errorMessage}
                        isValid={form.nip.isValid}
                        valueChangeHandler={updateFormHandler}
                    />
                    <Input
                        id='phone'
                        name='phone'
                        type='phone'
                        placeholder={'Telefon'}
                        value={form.phone.value}
                        errorMessage={form.phone.errorMessage}
                        isValid={form.phone.isValid}
                        valueChangeHandler={updateFormHandler}
                    />
                </div>

                <Title
                    classes={styles.title}
                    tag={TitleTag.h3}
                    variant={TitleVariant.standard}>
                    Zaproś zespół
                </Title>
                <Team
                    limit={3}
                    updateFormHandler={updateFormHandler}
                    guestsData={form.guests}
                />

                <Checkbox
                    id='policy'
                    name='policy'
                    classes={styles.checkbox}
                    value={form.policy.value}
                    errorMessage={form.policy.errorMessage}
                    isValid={form.policy.isValid}
                    valueChangeHandler={updateFormHandler}
                    label='Wyrażam zgodę na przetwarzanie moich danych osobowych w zakresie [tutaj zakres przetwarzania
						danych] przez [dane administratora danych osobowych: nazwa, imię, nazwisko, adres] w celu [cel przetwarzania danych osobowych].'
                />
                <Button type='submit' classes={styles.button}>
                    Przejdź do płatności
                </Button>
            </form>

            <FAQ
                elements={[
                    {
                        id: '01',
                        title: 'Jak mogę się zarejestrować na stronie?',
                        description:
                            'Aby się zarejestrować, kliknij przycisk „Zarejestruj się” znajdujący się w prawym górnym rogu strony głównej. Następnie wypełnij formularz rejestracyjny swoimi danymi, takimi jak adres e-mail i hasło, i postępuj zgodnie z instrukcjami weryfikacji. Po zakończeniu procesu rejestracji otrzymasz e-mail z linkiem aktywacyjnym. Kliknij w link, aby aktywować swoje konto.',
                    },
                    {
                        id: '02',
                        title: 'Czy mogę zmienić swoje hasło?',
                        description:
                            'Tak, zmiana hasła jest możliwa w każdej chwili. Aby to zrobić, zaloguj się na swoje konto, a następnie przejdź do sekcji „Ustawienia konta” lub „Moje konto”. Znajdziesz tam opcję „Zmień hasło”. Kliknij w nią i postępuj zgodnie z instrukcjami, aby ustawić nowe hasło. Zalecamy wybór silnego hasła, które zawiera kombinację liter, cyfr i symboli, aby zwiększyć bezpieczeństwo Twojego konta.',
                    },
                    {
                        id: '03',
                        title: 'Ile mogę dodać osób do spotkania?',
                        description:
                            'Tak, zmiana hasła jest możliwa w każdej chwili. Aby to zrobić, zaloguj się na swoje konto, a następnie przejdź do sekcji „Ustawienia konta” lub „Moje konto”. Znajdziesz tam opcję „Zmień hasło”. Kliknij w nią i postępuj zgodnie z instrukcjami, aby ustawić nowe hasło. Zalecamy wybór silnego hasła, które zawiera kombinację liter, cyfr i symboli, aby zwiększyć bezpieczeństwo Twojego konta.',
                    },
                ]}
            />
        </section>
    );
};

export default BookForm;
