import sessionDescriptionTemplatesDictionaryData
    from "@services/dictionaries/sessionDescriptionTemplatesDictionary/sessionDescriptionTemplatesDictionary.data";

const getSessionDescriptionTemplatesDictionary = (typeId: string): string => {

    // TODO CHANGE ME:
    return sessionDescriptionTemplatesDictionaryData[typeId] || 'CHANGE ME: Opis sesji jeśli w API nie ma takiego klucza...';
}

export default getSessionDescriptionTemplatesDictionary;