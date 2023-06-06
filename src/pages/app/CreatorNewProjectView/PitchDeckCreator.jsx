import React, {useState} from 'react';

import {useEffect} from 'react';
import StepOne from "./FormSteps/StepOne";
import {getKeyValues} from "../../../services/KeyValuesService";
import StepTwo from "./FormSteps/StepTwo";
import StepThree from "./FormSteps/StepThree";
import StepFour from "./FormSteps/StepFour";
import StepFifth from "./FormSteps/StepFifth";
import SteptSix from "./FormSteps/SteptSix";


const PitchDeckCreator = (props) => {

    const [keyValues, setKeyValues] = useState(null);
    const [unlockedStep2, setUnlockedStep2] = useState(false);
    const [unlockedStep3, setUnlockedStep3] = useState(false);
    const [unlockedStep4, setUnlockedStep4] = useState(false);
    const [unlockedStep5, setUnlockedStep5] = useState(false);
    const [unlockedStep6, setUnlockedStep6] = useState(false);
    // const [fieldValue, setFieldValue] = useState('');
    // const [nextStepDisabled, setIsNextStepDisabled] = useState(false);
    // const [pitchDeckUniqueToken, setPitchDeckUniqueToken] = useState('');
    const [pitchDeckURL, setPitchDeckURL] = useState(null);

    const {
        changeValueHandler,
        setFieldValue,
        setPitchDeckUrl,
        setIsNextStepDisabled,
        state: {
            projectTitle,
            uniqueProjectName,
            pitchDeckUniqueToken,
            projectLocalization,
            projectIndustry,
            projectStage,
            startDate,
            investorNumbers,
            typeOfInvestor,
            companyAssetMinMax,
            minimumCompanyAsset,
            roi,
            paybackTime,
            businessType,
            offerDescription,
            solutionDescription,
            competitionExists,
            competitionDescription,
            businessModelDescription,
            suggestionOfferDescription,
            phoneNumber,
            email,
            movie,
            businessInsurance,
            employees,
            files,
            presentationFiles
        },
    } = props;

    useEffect(() => {
        getKeyValues()
            .then(res => {
                setKeyValues(res.data);
            })
            .catch(reason => {
                console.error("use mock example :)")
            })
    }, []);


        useEffect(() => {
            window.scrollTo(0, 0);
        }, []);

    return (
        <>
            <StepOne
                pitchDeckUniqueToken={pitchDeckUniqueToken}
                uniqueProjectName={uniqueProjectName}
                     setUnlockedStep2={setUnlockedStep2}
                     unlockedStep2={unlockedStep2}
                     setFieldValue={setFieldValue}
                     setPitchDeckUrl={setPitchDeckUrl}
                     setIsNextStepDisabled={setIsNextStepDisabled}

            />
            <hr className='line-separator'/>
            <StepTwo pitchDeckUniqueToken={pitchDeckUniqueToken}
                     unlockedStep3={unlockedStep3}
                     unlockedStep2={unlockedStep2}
                     keyValues={keyValues}
                     setUnlockedStep3={setUnlockedStep3}
            />

            <hr className='line-separator'/>

            <StepThree pitchDeckUniqueToken={pitchDeckUniqueToken}
                       unlockedStep3={unlockedStep3}
                       unlockedStep2={unlockedStep2}
                       keyValues={keyValues}
                       setUnlockedStep4={setUnlockedStep4}
            />
            <hr className='line-separator'/>

            <StepFour
                       pitchDeckUniqueToken={pitchDeckUniqueToken}
                       unlockedStep4={unlockedStep4}
                       keyValues={keyValues}
                       setUnlockedStep5={setUnlockedStep5}
            />

            <hr className='line-separator'/>

            <StepFifth
                pitchDeckUniqueToken={pitchDeckUniqueToken}
                unlockedStep5={unlockedStep5}
                keyValues={keyValues}
                setUnlockedStep6={setUnlockedStep6}
            />
            <hr className='line-separator'/>

            <SteptSix
                pitchDeckUniqueToken={pitchDeckUniqueToken}
                unlockedStep6={unlockedStep6}
            />

            <hr className='line-separator'/>
        </>
    );
};

export default PitchDeckCreator;