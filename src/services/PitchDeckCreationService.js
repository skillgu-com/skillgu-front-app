import axios from "axios";

export const preparePitchDeckData = async (pitchDeckURL) => {
    return await axios.get('/api/project-search/pitch-deck-data/' + pitchDeckURL)
}

export const startObservePitchDeck = async (pitchDeckURL) => {
    return await axios.get('/project-search/pitch-deck-data' + pitchDeckURL);
}

// export const createPitchDeck = async (state) => {
//     const data = {
//         pitchDeckTitle: state.projectTitle,
//         pitchDeckURL: state.uniqeProjectName,
//         location: state.projectLocalization,
//         industry: state.projectIndustry,
//         // durationOfTheOffer:state.startDate,
//         offerDescription: state.offerDescription,
//         solutionDescription: state.solutionDescription,
//         competitionExists: state.competitionExists,
//         competitionDescription: state.competitionDescription,
//         businessModelDescription: state.businessModelDescription,
//         suggestionOfferDescription: state.suggestionOfferDescription,
//         companyAssetMinMax: state.companyAssetMinMax,
//         businessType: state.businessType,
//         paybackTime: state.paybackTime,
//         roi: state.roi,
//         // files: state.files,
//         // fileName: fileName,
//         // fileURL: fileURL,
//         // imagePat: imagePat,
//         firstName: state.firstName,
//         investorNumbers: state.investorNumbers,
//         typeOfInvestor: state.typeOfInvestor,
//         minimumCompanyAsset: state.minimumCompanyAsset,
//         businessInsurance: state.businessInsurance,
//         projectStage: state.projectStage
//
//     }
//     return await axios.post('/api/pitch-deck/create-new-project/', data)
// }

export const createFirstStep = async (projectTitle, uniqeProjectName) => {
    return await axios.post("/api/pitch-deck/steps/first-step", {
        projectTitle: projectTitle,
        projectUniqueUrl: uniqeProjectName
    });
}

export const updateFirstStep = async (pitchDeckUniqueToken, projectTitle, uniqeProjectName) => {
    return await axios.put("/api/pitch-deck/steps/first-step", {
        pitchDeckUniqueToken: pitchDeckUniqueToken,
        projectTitle: projectTitle,
        projectUniqueUrl: uniqeProjectName
    })
}

export const updateSecondStep = async (pitchDeckUniqueToken, projectLocalization,projectIndustry, projectStage, startDate, investorNumbers, typeOfInvestor) => {
   console.log('tutaj podaje date: ! '+startDate)
    return await axios.put("/api/pitch-deck/steps/second-step", {

        pitchDeckUniqueToken: pitchDeckUniqueToken,
        location: projectLocalization,
        industry: projectIndustry,
        projectStage: projectStage,
        startDate: startDate,
        investorNumbers: investorNumbers,
        typeOfInvestor: typeOfInvestor,
    })
}

export const updateThirdStep = async (pitchDeckUniqueToken, companyAssetMinMax, minimumCompanyAsset, roi, paybackTime, businessType, financialProtection) => {
    return await axios.put("/api/pitch-deck/steps/third-step", {
        pitchDeckUniqueToken: pitchDeckUniqueToken,
        companyAssetMinMax: companyAssetMinMax,
        minimumCompanyAsset: minimumCompanyAsset,
        roi: roi,
        paybackTime: paybackTime,
        businessType: businessType,
        financialProtection: financialProtection
    })
}

export const updateFourStep = async (pitchDeckUniqueToken, offerDescription, solutionDescription, competitionExists, competitionDescription, businessModelDescription, suggestionOfferDescription) => {
    return await axios.put("/api/pitch-deck/steps/fourth-step", {
        pitchDeckUniqueToken: pitchDeckUniqueToken,
        offerDescription: offerDescription,
        solutionDescription: solutionDescription,
        competitionExists: competitionExists,
        competitionDescription: competitionDescription,
        businessModelDescription: businessModelDescription,
        suggestionOfferDescription: suggestionOfferDescription
    })
}

export const updateFifthStep = async (pitchDeckUniqueToken, email, phoneNumber, ytMovieUrl) => {
    return await axios.put("/api/pitch-deck/steps/fifth-step", {
        pitchDeckUniqueToken: pitchDeckUniqueToken,
        email: email,
        phoneNumber: phoneNumber,
        ytMovieUrl: ytMovieUrl
    })
}

export const updateSixStep = async (pitchDeckUniqueToken, employeeName, employeePosition, employeePicture) => {

    return await axios.put("/api/pitch-deck/steps/sixth-step", {
        pitchDeckUniqueToken: pitchDeckUniqueToken,
        firstName: employeeName,
        role: employeePosition,
        image: employeePicture
    })
}

export const subProject = async (token) => {
    return await axios.post('/api/pitch-deck/submit/' + token)
}

// export const searchByToken = async (token) => {
//     return await axios.get('/api/project-search/search-token-result/' + token)
// }
