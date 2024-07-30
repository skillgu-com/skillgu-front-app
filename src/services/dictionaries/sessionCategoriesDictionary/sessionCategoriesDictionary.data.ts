// TODO CHANGE ME:
const sessionCategoriesDictionaryData = {
    BUSINESS: 'BUSINESS',
    DESIGN: 'DESIGN',
    IT: 'IT',
    MARKETING: 'MARKETING',
    CAREER: 'CAREER'
};

export type MentorCategoryT = keyof typeof sessionCategoriesDictionaryData;

export default sessionCategoriesDictionaryData;