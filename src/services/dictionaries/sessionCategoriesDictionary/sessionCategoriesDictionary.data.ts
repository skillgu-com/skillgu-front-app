const sessionCategoriesDictionaryData = {
    IT: 'IT',
    BUSINESS: 'BIZNES & STARTUP',
    CAREER: 'KARIERA',
    DESIGN: 'DESIGN',
    MARKETING: 'MARKETING',
    PERSONAL_DEVELOPMENT: 'ROZWÓJ OSOBISTY',
    TRADING: 'TRADING'
};

export type MentorCategoryT = keyof typeof sessionCategoriesDictionaryData;

export default sessionCategoriesDictionaryData;