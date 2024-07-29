// TODO CHANGE ME:
import type { SessionCategoryT } from "@services/dictionaries/sessionCategoriesDictionary/sessionCategoriesDictionary.data";

const sessionTypesDictionaryData: Record<SessionCategoryT, Record<string, string>> = {
    business: {
        uuid_1: 'Szkolenie',
        uuid_2: 'Warsztat',
        uuid_3: 'Biznes plan',
    },
    design: {
        uuid_4: 'Szkolenie',
        uuid_5: 'Analiza trendów',
        uuid_6: 'Przegląd projektów',
    },
    it: {
        uuid_7: 'Szkolenie',
        uuid_8: 'Warsztat',
        uuid_9: 'Code review',
    },
    marketing: {
        uuid_10: 'Szkolenie',
        uuid_11: 'Walidacja strategii',
    },
    carrier: {
        uuid_12: 'Szkolenie',
        uuid_13: 'Przegląd CV',
        uuid_14: 'Plan kariery',
    }
}

export default sessionTypesDictionaryData;