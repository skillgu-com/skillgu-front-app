// TODO CHANGE ME:
const sessionCategoriesDictionaryData = {
    IT: 'IT',
    BUSINESS: 'BIZNES & STARTUP',
    CAREER: 'KARIERA',
    DESIGN: 'DESIGN',
    MARKETING: 'MARKETING',
    PERSONAL_DEVELOPMENT: 'ROZWÓJ OSOBISTY'
};

export type MentorCategoryT = keyof typeof sessionCategoriesDictionaryData;

export default sessionCategoriesDictionaryData;