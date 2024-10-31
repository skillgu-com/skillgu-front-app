import {AccordionItemModel} from "../components/AccordionItem/AccordionItem";

// @TODO

export const mentorshipSignupFaq: AccordionItemModel[] = [
    {
        id: "01",
        title: "Dlaczego warto przyjmować płatności przez platformę?",
        description:
            "Przyjmowanie płatności przez platformę SkillGu to wygodny sposób na zarządzanie swoimi zarobkami i zapewnienie bezpieczeństwa finansowego. Obsługujemy rozliczenia, dzięki czemu możesz skupić się na mentoringu. Pamiętaj, że rozliczenia poza platformą są niezgodne z regulaminem i mogą prowadzić do wyłączenia konta.",
    },
    {
        id: "02",
        title: "Jak skonfigurować płatności?",
        description:
            "Po kliknięciu w Konfiguruj płatność, zostaniesz przekierowany do formularza konfiguracji Stripe, gdzie będziesz musiał podać dane do weryfikacji tożsamości. Pamiętaj, że te dane są przetwarzane przez Stripe i my nie mamy do nich dostępu.",
    },
    {
        id: "03",
        title: "Jak długo trwa przetwarzanie wypłaty?",
        description:
            "Środki będą gotowe do wypłaty i widoczne w zakładce Moje zarobki po 24 godzinach od oznaczenia transakcji jako zrealizowanej. Po kliknięciu Wypłać, środki zostaną przelane na Twoje konto w ciągu 3-5 dni roboczych.",
    },

    {
        id: "04",
        title: "Dlaczego kwota zarobiona różni się od kwoty do wypłaty?",
        description:
            "Jako mentor, kwota widoczna w zakładce Rozliczenia uwzględnia prowizję pobieraną przez platformę SkillGu oraz opłatę Stripe za przetwarzanie płatności. Dzięki temu masz pełny wgląd w swoje rzeczywiste dochody i koszty związane z prowadzeniem sesji.",
    },
];
