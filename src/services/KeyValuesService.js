import axios from "axios";

//FIXME: remove before production deployment
const mockedKeyValues = {
    accountAccessKeyValues: [
        {key: "FULL_ACCESS", value: "full access"},
        {key: "LIMITED_ACCESS", value: "limited access"}],
    locationKeyValues: [
        {key: "WARSAW", value: "WARSZAWA"},
        {key: "CRACOW", value: "KRAKÓW"},
        {key: "WROCLAW", value: "WROCLAW"},
        {key: "LODZ", value: "LODZ"},
        {key: "GDYNIA", value: "GDYNIA"},
        {key: "POLAND", value: "POLSKA"},
        {key: "ONLINE", value: "ONLINE"},
        {key: "TEST", value: "TEST_PL"}],
    businessTypeKeyValues: [
        {key: "QUIET_COMPANY", value: "SPÓŁKA CICHA"},
        {key: "LIMITED_COMPANY", value: "SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ"},
        {key: "PARTNERSHIP_LIMITED_BY_SHARES", value: "SPÓŁKA KANDYDATKOWO AKCYJNA"},
        {key: "JOINT_STOCK_COMPANY", value: "SPÓŁKA AKCYJNA"},
        {key: "CONSORTIUM", value: "KONSORCJUM"},
        {key: "OTHER_TYPES", value: "INNY TYP SPÓŁKI"},
        {key: "NOT_APPLICABLE_NOW", value: "NIE MA ZASTOSOWANIA TERAZ"}],
    experienceKeyValues: [
        {key: "SOFTWARE", value: "Software"},
        {key: "SCRUM", value: "Scrum"},
        {key: "MANAGEMENT", value: "Zarządzanie"},
        {key: "IT", value: "IT"},
        {key: "NEW_TECHNOLOGIES", value: "Nowe technologie"},
        {key: "BUSINESS", value: "Biznes"},
        {key: "MOTIVATION", value: "Motywacja"},
        {key: "TRADE", value: "Handel"},
        {key: "SELL", value: "Sprzedaż"},
        {key: "PRODUCTION", value: "Produkcja"},
        {key: "REAL_ESTATE", value: "Nieruchomości"},
        {key: "MARKETING", value: "Marketing"},
        {key: "GRAFIKA", value: "Grafika"},
        {key: "FOREIGN_LANGUAGES", value: "Języki obce"},
        {key: "POLITICS", value: "Polityka"}],
    financialProtectionKeyValues: [
        {key: "ARRANGEMENT", value: "UMOWA"},
        {key: "SHARES_IN_ACTIVITIES", value: "UDZIAŁY W DZIAŁALNOŚCI"},
        {key: "REAL_ESTATE", value: "NIERUCHOMOŚĆ"},
        {key: "BILL_OF_EXCHANGE", value: "WEKSEL"},
        {key: "NOTARY_AGREEMENT", value: "AKT NOTARIALNY"},
        {key: "OTHER_SECURED", value: "INNE"}],
    industryKeyValues: [
        {key: "GASTRONOMY", value: "GASTRONOMIA"},
        {key: "IT", value: "IT"},
        {key: "REAL_ESTATE", value: "NIERUCHOMOŚCI"},
        {key: "AUTOMOTIVE", value: "MOTORYZACJA"},
        {key: "INDUSTRY", value: "PRZEMYSŁ"},
        {key: "FARMING", value: "ROLNICTWO"},
        {key: "TRANSPORT", value: "TRANSPORT"}],
    investorNumbersKeyValues: [
        {key: "ONE", value: "TYLKO JEDEN, SZUKAM WSPÓLNIKA"},
        {key: "ONE_TECHNICAL", value: "JEDEN TECHCZNINY WSPÓLNIK"},
        {key: "MAX_FIVE", value: "SZUKAM MAKSYMALNIE DO 5 INWESTORÓW"},
        {key: "MAX_TEN", value: "SZUKAM MAKSYMALNIE DO 10 INWESTORÓW"},
        {key: "TEN_AND_MORE", value: "SZUKAM OD 10 INWESTORÓW"}],
    movieTypeKeyValues: [
        {key: "YOUTUBE", value: "YOUTUBE"},
        {key: "VIMEO", value: "VIMEO"},
        {key: "SELF_UPLOAD", value: "WŁASNY UPLOAD"}],
    notificationFormKeyValues: [
        {key: "EMAIL", value: "E-MAIL"},
        {key: "SMS", value: "SMS"},
        {key: "APPLICATION", value: "APLIKACJA"}],
    projectStageKeyValues: [
        {key: "EXISTING_BUSINESS", value: "MAM BIZNES, CHCĘ GO ROZBUDOWAĆ, DOINWESTOWAĆ"},
        {key: "NEW_BUSINESS", value: "MAM POMYSŁ, ZACZYNAM OD ZERA. SZUKAM KAPITAŁU, WSPÓLNIKA"},
        {key: "NEW_BUSINESS_INVETORS", value: "MAM POMYSŁ, ZACZYNAM OD ZERA. SZUKAM KAPITAŁU, INWESTORÓW"}],
    requireInvestAmountKeyValues: null,
    typeOfInvestorKeyValues: [
        {key: "ACTIVE", value: "AKTYWNY"},
        {key: "PASSIVE", value: "PASYWNE"}]
};

export const getKeyValues = async () => {

    //TODO: example mock
    //FIXME: remove before going to production
    // return new Promise((resolve) => {
    //     resolve({data: mockedKeyValues});
    // });

    return await axios.get('/api/key-values')
}