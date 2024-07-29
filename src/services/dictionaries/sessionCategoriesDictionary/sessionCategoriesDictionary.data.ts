// TODO CHANGE ME:
const sessionCategoriesDictionaryData = {
    business: 'Biznes',
    design: 'Design',
    it: 'IT',
    marketing: 'Marketing',
    carrier: 'Kariera'
};

export type SessionCategoryT = keyof typeof sessionCategoriesDictionaryData;

export default sessionCategoriesDictionaryData;