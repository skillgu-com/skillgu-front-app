const PHONE_REGEX = /^([+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s0-9]{4,20})$/;
const EMAIL_REGEX =
    /^(?:[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

export const validation = (name, value) => {
    switch (name) {
        case 'name':
            return value.length >= 2;
        case 'description':
            return value.length >= 10;
        case 'localization':
        case 'industry':
        case 'investorNumbers':
        case 'projectStage':
        case 'typeOfInvestor':
        case 'paybackTime':
        case 'businessType':
        case 'financialProtection':
        case 'roi':
            return value !== '0';
        case 'startDate':
            return value !== '';
        case 'phoneNumber':
            return PHONE_REGEX.test(value);
        case 'email':
            return EMAIL_REGEX.test(value);
        case 'ytMovieUrl':
        case 'offerDescription':
        case 'competitionDescription':
        case 'businessModelDescription':
        case 'suggestionOfferDescription':
        case 'solutionDescription':
            return value.length > 3;
        case 'competitionExists':
        default:
            return true;
    }
};


