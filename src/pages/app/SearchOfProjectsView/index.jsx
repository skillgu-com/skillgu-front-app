import React, {useState} from 'react';
import AppLayout from '../../../component/AppLayout';
import CustomButton, {
	buttonColors,
	buttonTypes,
} from '../../../component/CustomButton';
import {createSearchProject} from '../../../services/SearchOfProjectsService';
import {useNavigate} from 'react-router-dom';

import SearchProjectCreator from './FormSteps/SearchProjectCreator';
import SubmitSearchProject from './FormSteps/SubmitSearchProject';
import HeroHeader from '../../../component/HeroHeader';
import headerImg from '../../../assets/img/sunrise.png';
import {useEffect} from 'react';

function PitchDeckCreatorScreen(props) {
	const navigate = useNavigate();

	const [activeStep, setActiveStep] = useState(0);

	const [projectLocalization, setProjectLocalization] = useState(null);
	const [projectIndustry, setpProjectIndustry] = useState(null);
	const [businessExists, setBusinessExists] = useState(true);
	const [startDate, setStartDate] = useState(null);

	const [companyAssetMinMax, setCompanyAssetMinMax] = useState(500);
	const [businessType, setBusinessType] = useState(null);
	const [paybackTime, setPaybackTime] = useState(null);
	const [roi, setRoi] = useState(null);

	const [typeOfInvestor, setTypeOfInvestor] = useState(null);
	const [investorNumbers, setInvestorNumbers] = useState(null);
	const [minimumCompanyAsset, setIMinimumCompanyAsset] = useState(null);
	const [projectStage, setProjectStage] = useState(null);
	const [date, setDate] = useState(null);

	const [businessInsurance, setBusinessInsurance] = useState(null);
	const [typeOfNotification, setTypeOfNotification] = useState(null);
	const [frequencyOfNotification, setTFrequencyOfNotification] = useState(null);

	const handleFrequencyOfNotification = (event) => {
		event.preventDefault();
		setTFrequencyOfNotification(event.target.value);
	};

	const handleTypeOfNotification = (event) => {
		event.preventDefault();
		setTypeOfNotification(event.target.value);
	};

	const handleBusinessInsurance = (event) => {
		event.preventDefault();
		setBusinessInsurance(event.target.value);
	};

	const handleDateSelect = (event) => {
		event.preventDefault();
		setDate(event.target.value);
	};

	const handleDateChange = (event) => {
		event.preventDefault();
		setDate(event.target.value);
	};

	const handleTypeOfInvestor = (event) => {
		event.preventDefault();
		setTypeOfInvestor(event.target.value);
	};

	const handleInvestorNumbers = (event) => {
		event.preventDefault();
		setInvestorNumbers(event.target.value);
	};

	const handleProjectStage = (event) => {
		event.preventDefault();
		setProjectStage(event.target.value);
	};

	const handleProjectLocalization = (event) => {
		event.preventDefault();
		setProjectLocalization(event.target.value);
	};

	const handleProjectIndustry = (event) => {
		event.preventDefault();
		setpProjectIndustry(event.target.value);
	};

	const handleBusinessExists = (event) => {
		event.preventDefault();
		setBusinessExists(event.target.value);
	};

	const handleStartDate = (event) => {
		event.preventDefault();
		setStartDate(event.target.value);
	};

	const handleMinimumCompanyAsset = (event) => {
		event.preventDefault();
		setIMinimumCompanyAsset(event.target.value);
	};

	const handleCompanyAssetMinMax = (event) => {
		event.preventDefault();
		setCompanyAssetMinMax(event.target.value);
	};

	const handleBusinessType = (event) => {
		event.preventDefault();
		setBusinessType(event.target.value);
	};

	const handlePaybackTime = (event) => {
		event.preventDefault();
		setPaybackTime(event.target.value);
	};
	const handleRoi = (event) => {
		event.preventDefault();
		setRoi(event.target.value);
	};

	const handleSubmitProject = (event) => {
		event.preventDefault();
		createSearchProject(
			projectLocalization,
			projectIndustry,
			projectStage,
			startDate,
			typeOfInvestor,
			companyAssetMinMax,
			minimumCompanyAsset,
			roi,
			paybackTime,
			businessType,
			businessInsurance,
			investorNumbers,
			typeOfNotification,
			frequencyOfNotification
		).then((response) => {
			navigate('/invest-maps?search=' + response.data.token);
		});
	};

	// const generateCurrentStep = (activeStep) => {
	// 	switch (activeStep) {
	// 		case 0:
	// 			return (
	// 				<SearchProjectCreator
	// 					projectLocalization={projectLocalization}
	// 					projectIndustry={projectIndustry}
	// 					projectStage={projectStage}
	// 					startDate={startDate}
	// 					typeOfInvestor={typeOfInvestor}
	// 					companyAssetMinMax={companyAssetMinMax}
	// 					minimumCompanyAsset={minimumCompanyAsset}
	// 					roi={roi}
	// 					paybackTime={paybackTime}
	// 					businessType={businessType}
	// 					businessInsurance={businessInsurance}
	// 					investorNumbers={investorNumbers}
	// 					typeOfNotification={typeOfNotification}
	// 					frequencyOfNotification={frequencyOfNotification}
	// 					handleProjectLocalization={handleProjectLocalization}
	// 					handleProjectIndustry={handleProjectIndustry}
	// 					handleBusinessExists={handleBusinessExists}
	// 					handleStartDate={handleStartDate}
	// 					handleCompanyAssetMinMax={handleCompanyAssetMinMax}
	// 					handleBusinessType={handleBusinessType}
	// 					handlePaybackTime={handlePaybackTime}
	// 					handleRoi={handleRoi}
	// 					handleTypeOfInvestor={handleTypeOfInvestor}
	// 					handleMinimumCompanyAsset={handleMinimumCompanyAsset}
	// 					handleProjectStage={handleProjectStage}
	// 					handleInvestorNumbers={handleInvestorNumbers}
	// 					handleDateSelect={handleDateSelect}
	// 					handleDateChange={handleDateChange}
	// 					handleBusinessInsurance={handleBusinessInsurance}
	// 					handleTypeOfNotification={handleTypeOfNotification}
	// 					handleFrequencyOfNotification={handleFrequencyOfNotification}
	// 				/>
	// 			);
	// 		case 1:
	// 			return <SubmitSearchProject handleSubmitProject={handleSubmitProject} />;
	// 		default:
	// 			throw new Error('Unknown active step');
	// 	}
	// };

	// const setStep = (e, step) => {
	// 	e.preventDefault();
	// 	if (activeStep === 0) {
	// 	}
	// 	setActiveStep(step);
	// };

	return (
		<AppLayout>
			<HeroHeader
				title='Szukaj inwestycji'
				image={<img src={headerImg} alt='Las' />}
			/>

			<form className='form__container'>
				<SearchProjectCreator
					projectLocalization={projectLocalization}
					projectIndustry={projectIndustry}
					projectStage={projectStage}
					startDate={startDate}
					typeOfInvestor={typeOfInvestor}
					companyAssetMinMax={companyAssetMinMax}
					minimumCompanyAsset={minimumCompanyAsset}
					roi={roi}
					paybackTime={paybackTime}
					businessType={businessType}
					businessInsurance={businessInsurance}
					investorNumbers={investorNumbers}
					typeOfNotification={typeOfNotification}
					frequencyOfNotification={frequencyOfNotification}
					handleProjectLocalization={handleProjectLocalization}
					handleProjectIndustry={handleProjectIndustry}
					handleBusinessExists={handleBusinessExists}
					handleStartDate={handleStartDate}
					handleCompanyAssetMinMax={handleCompanyAssetMinMax}
					handleBusinessType={handleBusinessType}
					handlePaybackTime={handlePaybackTime}
					handleRoi={handleRoi}
					handleTypeOfInvestor={handleTypeOfInvestor}
					handleMinimumCompanyAsset={handleMinimumCompanyAsset}
					handleProjectStage={handleProjectStage}
					handleInvestorNumbers={handleInvestorNumbers}
					handleDateSelect={handleDateSelect}
					handleDateChange={handleDateChange}
					handleBusinessInsurance={handleBusinessInsurance}
					handleTypeOfNotification={handleTypeOfNotification}
					handleFrequencyOfNotification={handleFrequencyOfNotification}
				/>
				<CustomButton as={buttonTypes.submit} color={buttonColors.primary} _onClick={handleSubmitProject}>
					Wyszukaj
				</CustomButton>
			</form>
		</AppLayout>
	);
}

export default PitchDeckCreatorScreen;
