import React, {useState, useReducer} from 'react';
import AppLayout from '../../../component/AppLayout';
import CustomButton, {buttonColors} from '../../../component/CustomButton';

import SubmitProject from './SubmitProject';
import {useNavigate} from 'react-router-dom';
import PitchDeckCreator from './PitchDeckCreator';
import HeroHeader from '../../../component/HeroHeader';
import headerImg from '../../../assets/img/forest-2.jpg';
import {validation} from '../../../helpers/validation';
import {cloneDeep} from 'lodash';
import {subProject} from "../../../services/PitchDeckCreationService";


const initialState = {
    projectTitle: {error: false, value: ''},
    uniqueProjectName: {error: false, value: ''},
    projectLocalization: {error: false, value: '0'},
    projectIndustry: {error: false, value: []},
    businessExists: {error: false, value: true},
    startDate: {error: false, value: ''},
    offerDescription: {error: false, value: ''},
    solutionDescription: {error: false, value: ''},
    competitionExists: {error: false, value: 'true'},
    competitionDescription: {error: false, value: ''},
    businessModelDescription: {error: false, value: ''},
    suggestionOfferDescription: {error: false, value: ''},
    companyAssetMinMax: {error: false, value: 2000},
    businessType: {error: false, value: '0'},
    paybackTime: {error: false, value: '0'},
    roi: {error: false, value: '0'},
    files: {error: false, value: []},
    presentationFiles: {error: false, value: []},
    fileURL: {error: false, value: ''},
    imagePat: {error: false, value: ''},
    phoneNumber: {error: false, value: ''},
    email: {error: false, value: ''},
    lastName: {error: false, value: ''},
    typeOfInvestor: {error: false, value: '0'},
    investorNumbers: {error: false, value: '0'},
    minimumCompanyAsset: 1000,
    projectStage: {error: false, value: '0'},
    movie: {error: false, value: ''},
    businessInsurance: {error: false, value: '0'},
    employees: {error: false, value: []},
};


const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FIELD':
            const newState = cloneDeep(state);
            newState[action.payload.key] = {
                value: action.payload.value,
                error: !validation(action.payload.key, action.payload.value),
            };
            return newState;
        default:
            return state;
    }
};

function PitchDeckCreatorScreen(props) {
    const navigate = useNavigate();
    // hook w react wszystko co sie zaczyna od use to jest hook
    const [state, dispatch] = useReducer(reducer, initialState);


    const changeValueHandler = (event) => {
        dispatch({
            type: 'UPDATE_FIELD',
            payload: {key: event.target.name, value: event.target.value},
        });
    };

    const setFieldValue = (key, value) => {
        dispatch({
            type: 'UPDATE_FIELD',
            payload: {key, value},
        });
    };

    const [activeStep, setActiveStep] = useState(0);
    const [isNextStepDisabled, setIsNextStepDisabled] = useState(true);

    const handleSubmitProject = (event) => {
        event.preventDefault();
        subProject(state.pitchDeckUniqueToken.value).then(res =>
            navigate('/pitchdeck/' + res.data)
        );
    };

    const generateCurrentStep = (activeStep) => {
        switch (activeStep) {
            case 0:
                return (
                    <PitchDeckCreator
                        state={state}
                        changeValueHandler={changeValueHandler}
                        setFieldValue={setFieldValue}
                        setIsNextStepDisabled={setIsNextStepDisabled}
                    />
                );
            case 1:
                return <SubmitProject handleSubmitProject={handleSubmitProject}/>;
            default:
                throw new Error('Unknown active step');
        }
    };

    const setStep = (e, step) => {
        e.preventDefault();
        if (activeStep === 0) {
        }
        setActiveStep(step);
    };

    return (
        <AppLayout>
            <HeroHeader
                title='Stwórz konto mentora'
                image={<img src={headerImg} alt='froest'/>}
            />
            <div className={'pitchdeck-wrapper'}>
                <div className='container column justify-content-center align-items-center w-100'>
                    <form className='form__container'>
                        {generateCurrentStep(activeStep)}
                        {activeStep !== 1 && (
                            <>
                                <CustomButton
                                    classes='w-100 pitchdeck__form-btn'
                                    _onClick={(e) => setStep(e, activeStep + 1)}
                                    disabled={isNextStepDisabled}>
                                    Stwórz konto mentora
                                </CustomButton>
                                <CustomButton
                                    classes='pitchdeck__form-btn'
                                    color={buttonColors.transparent}
                                    _onClick={(e) => {
                                        setStep(e, activeStep - 1);
                                        setIsNextStepDisabled(true);
                                    }}></CustomButton>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

export default PitchDeckCreatorScreen;
