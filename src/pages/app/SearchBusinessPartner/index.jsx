import React, {useState} from 'react';
import AppLayout from '../../../component/AppLayout';
import {
    createProjectSearch,
    createSearchProject
} from "../../../services/SearchOfProjectsService";
import {useNavigate} from "react-router-dom";
import PurposeOfSearch from "./FormSteps/PurposeOfSearch";
import SubmitSearch from "./FormSteps/SubmitSearch";
import FundraisingInformation from "./FormSteps/FundraisingInformation";
import InvestorType from "./FormSteps/InvestorType";
import BusinessTypeAndStartDate from "./FormSteps/BusinessTypeAndStartDate";
import SearchIndustryAndLocation from "./FormSteps/SearchIndustryAndLocation";
import Card from "../../../component/Card";


const minDistance = 10;

function SearchBusinessPartner(props) {
    const navigate = useNavigate();

    const [activeStep, setActiveStep] = useState(0);
    const [investorWithCapital, setInvestorWithCapital] = useState(true);
    const [requireInvestInsteadAmount, setrequiReInvestInsteadAmount] = useState(null);
    const [companyAssetMinMax, setCompanyAssetMinMax] = useState([500, 100000]);
    const [financialProtection, setFinancialProtection] = useState(null);
    const [industryTypeSearch, setindustryTypeSearch] = useState(null);
    const [businessType, setBusinessType] = useState(null);
    const [projectStage, setprojectStage] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [competitionExists, setCompetitionExists] = useState(null);
    const [projectLocalization, setProjectLocalization] = useState(null);
    const [typeOfActivity, setTypeOfActivity] = useState([]);
    const [typeOfInvestor, setTypeOfInvestor] = useState([]);


    const handleCompanyAssetMinMax = (event, newValue, activeThumb) => {
        event.preventDefault();

        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setCompanyAssetMinMax([Math.min(newValue[0], companyAssetMinMax[1] - minDistance), companyAssetMinMax[1]]);
        } else {
            setCompanyAssetMinMax([companyAssetMinMax[0], Math.max(newValue[1], companyAssetMinMax[0] + minDistance)]);
        }

        setCompanyAssetMinMax(event.target.value)
    }


    const handleSubmitProject = (event) => {
        event.preventDefault();
        createSearchProject(industryTypeSearch, projectLocalization, projectStage,
            startDate, competitionExists, investorWithCapital, requireInvestInsteadAmount, companyAssetMinMax,typeOfActivity,
            businessType,typeOfInvestor
        ).then((response) => {
            navigate('/invest-maps?search=' + response.data.token)
        })
    }
    const generateCurrentStep = (activeStep) => {
        switch (activeStep) {
            case 0:
                return <PurposeOfSearch


                />;
            case 1:
                return <SearchIndustryAndLocation

                />;
            case 2:
                return <BusinessTypeAndStartDate

                />;
            case 3:
                return <InvestorType



                />;
            case 4:
                return <FundraisingInformation

                />;
            case 5:
                return <SubmitSearch
                />;
            default:
                throw new Error('Unknown active step');
        }
    };

    const setStep = (e, step) => {
        e.preventDefault();
        console.log(step)
        if (activeStep === 0) {
        }
        if (activeStep === 1) {
        }
        if (activeStep === 2) {
        }
        if (activeStep === 3) {
        }
        if (activeStep === 4) {
        }
        if (activeStep === 5) {
        }
        if (activeStep === 6) {
        }
        setActiveStep(step)

    };

    return (

        <AppLayout>
            <h2 className='app__title--huge'>Szukam partnera biznesowego</h2>
            <section className='d-flex flex-wrap' >
                <Card
                    // uuid={element.uuid}
                    // type='investor'
                    // title={element.firstName}
                    // company=''
                    // city='Łódź'
                    // investsAmount={1}
                    // commonContacts={50}
                    subtitle='Mam kapitał, szukam pomysłu'
                    image='https://cdn.pixabay.com/photo/2018/04/27/03/50/portrait-3353699_960_720.jpg'
                    classes='col-12 col-sm-6 col-lg-4'
                    // _onClick={handleToSearch}
                />
                <Card
                    // uuid={element.uuid}
                    // type='investor'
                    // title={element.firstName}
                    // company=''
                    // city='Łódź'
                    // investsAmount={1}
                    // commonContacts={50}
                    subtitle='Mam pomysł, szukam kapitału'
                    image='https://cdn.pixabay.com/photo/2018/04/27/03/50/portrait-3353699_960_720.jpg'
                    classes='col-12 col-sm-6 col-lg-4'
                    // _onClick={handleToBuisnessPartner}
                />
                <Card
                    // uuid={element.uuid}
                    // type='investor'
                    // title={element.firstName}
                    // company=''
                    // city='Łódź'
                    // investsAmount={1}
                    // commonContacts={50}
                    subtitle='Mam kapitał i pomysł, szukam wspólnika'
                    image='https://cdn.pixabay.com/photo/2018/04/27/03/50/portrait-3353699_960_720.jpg'
                    classes='col-12 col-sm-6 col-lg-4'
                />

            </section>

        </AppLayout>
        // <AppLayout>
        //     <div className={'pitchdeck-wrapper'}>
        //         <div className='container column justify-content-center align-items-center w-100'>
        //             <div className='pitchdeck__progress-bar'>
        //                 <ul className='progress-bar__list d-flex'>
        //                     <li className='progress-bar__item progress-bar__item--choosed'>
        //                         <span className='progress-bar__step'>1</span>
        //                     </li>
        //                     <li className='progress-bar__item '>
        //                         <span className='progress-bar__step'>2</span>
        //                     </li>
        //                     <li className='progress-bar__item progress-bar__item--disabled'>
        //                         <span className='progress-bar__step'>3</span>
        //                     </li>
        //                     <li className='progress-bar__item progress-bar__item--disabled'>
        //                         <span className='progress-bar__step'>4</span>
        //                     </li>
        //                     <li className='progress-bar__item progress-bar__item--disabled'>
        //                         <span className='progress-bar__step'>5</span>
        //                     </li>
        //                 </ul>
        //             </div>
        //             <div className='form pitchdeck__form'>
        //                 {activeStep !== 5 && (
        //                     <h2 className='form__title text-center'>Szukaj partnera biznesowego</h2>
        //                 )}
        //                 <form className='form__container'>
        //                     {generateCurrentStep(activeStep)}
        //                     {activeStep !== 5 && (
        //                         <>
        //                             <CustomButton
        //                                 classes='w-100 pitchdeck__form-btn'
        //                                 _onClick={(e) => setStep(e, activeStep + 1)}>
        //                                 Dalej
        //                             </CustomButton>
        //                             <CustomButton
        //                                 classes='pitchdeck__form-btn'
        //                                 color={buttonColors.transparent}
        //                                 _onClick={(e) => setStep(e, activeStep - 1)}>
        //                                 Cofnij
        //                             </CustomButton>
        //                         </>
        //                     )}
        //                 </form>
        //             </div>
        //         </div>
        //     </div>
        // </AppLayout>
    );

}


export default SearchBusinessPartner;