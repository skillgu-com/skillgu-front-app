import axios from "axios";

export const searchAllProjects = async (token) => {
    return await axios.get('/api/project-search/get-all-projects')
}

export const searchAllMyOwnProjects = async () => {
    return await axios.get('/api/project-search/get-all-my-own-projects')
}

export const searchByToken = async (token) => {
    return await axios.get('/api/project-search/search-token-result/' + token)
}

export const createSearchProject = async (projectLocalization, projectIndustry, projectStage,
                                          startDate, typeOfInvestor, companyAssetMinMax, minimumCompanyAsset,
                                          roi, paybackTime, businessType, businessInsurance,
                                          investorNumbers, typeOfNotification, frequencyOfNotification) => {
    const data = {
        location: projectLocalization,
        industry: projectIndustry,
        startDate: startDate,
        companyAssetMinMax: companyAssetMinMax,
        businessType: businessType,
        paybackTime: paybackTime,
        roi: roi,
        investorNumbers: investorNumbers,
        typeOfInvestor: typeOfInvestor,
        minimumCompanyAsset: minimumCompanyAsset,
        businessInsurance: businessInsurance,
        notificationType: typeOfNotification,
        frequencyOfNotification: frequencyOfNotification

    }
    return await axios.post('api/project-search/create-search-project', data)
}