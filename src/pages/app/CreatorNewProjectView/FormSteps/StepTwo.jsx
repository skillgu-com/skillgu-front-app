import BlockedScreen from '../../../../component/BlockedScreen';
import {
	FormControl,
	FormLabel,
	Grid,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import React, {useEffect, useRef, useState} from 'react';
import {validation} from '../../../../helpers/validation';
import {updateSecondStep} from '../../../../services/PitchDeckCreationService';

const StepTwo = ({
	pitchDeckUniqueToken,
	unlockedStep2,
	unlockedStep3,
	keyValues,
	setUnlockedStep3,
}) => {
	const [projectLocalization, setProjectLocalization] = useState('0');
	const [projectIndustry, setProjectIndustry] = useState([]);
	const [position, setPosotion] = useState('');
	const [company, setCompany] = useState('');

	const secondStepLastData = useRef({
		projectLocalization,
		projectIndustry,
		position,
		company,
	});

	const secondStepChanged = () => {
		return (
			secondStepLastData.current.projectLocalization !== projectLocalization ||
			secondStepLastData.current.projectIndustry !== projectIndustry ||
			secondStepLastData.current.position !== position ||
			secondStepLastData.current.company !== company
		);
	};

	const projectLocalizationChange = (event) => {
		setProjectLocalization(event.target.value);
	};

	const projectIndustryChange = (event) => {
		const {
			target: {value},
		} = event;
		setProjectIndustry(typeof value === 'string' ? value.split(',') : value);
	};

	const positionChange = (event) => {
		setPosotion(event.target.value);
	};

	const companyChange = (event) => {
		setCompany(event.target.value);
	};

	const _validateStep2 = () => {
		return (
			validation('localization', projectLocalization) &&
			validation('industry', projectIndustry) &&
			validation('name', position) &&
			validation('name', company)
		);
	};

	const _validateAndUpdateStep2 = () => {
		if (_validateStep2() && secondStepChanged()) {
			secondStepLastData.current = {
				projectLocalization,
				projectIndustry,
				position,
				company,
			};
			updateSecondStep(
				pitchDeckUniqueToken.value,
				projectLocalization,
				projectIndustry,
				position,
				company
			)
				.then((response) => {
				})
				.catch();
		}
	};

	useEffect(() => {
		if (unlockedStep2 && _validateStep2()) {
			setUnlockedStep3(true);
			_validateAndUpdateStep2();
		} else {
			setUnlockedStep3(false);
		}
	}, [projectLocalization, projectIndustry, position, company]);

	return (
		<Grid position={'relative'} container spacing={2}>
			{!unlockedStep2 && <BlockedScreen />}
			<Grid position={'relative'} item xs={12} sm={6}>
				<FormLabel id='localization' className='field__label'>
					Wybierz lokalizację
				</FormLabel>
				<FormControl fullWidth>
					<Select
						labelId='localization'
						id='localization__field'
						name='projectLocalization'
						required
						displayEmpty
						inputProps={{'aria-label': 'Without label'}}
						value={projectLocalization}
						onChange={projectLocalizationChange}>
						<MenuItem value={0} disabled>
							Lokalizacja
						</MenuItem>
						{keyValues?.locationKeyValues.map((location) => (
							<MenuItem key={location.key} value={location.key}>
								{' '}
								{location.value}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>

			<Grid item xs={12} md={6}>
				<FormLabel id='industry' className='field__label'>
					Wybierz Branżę
				</FormLabel>
				<FormControl fullWidth>
					<Select
						labelId='industry'
						id='industry__field'
						required
						displayEmpty
						inputProps={{'aria-label': 'Without label'}}
						value={projectIndustry}
						onChange={projectIndustryChange}>
						<MenuItem value={0} disabled>
							Branża
						</MenuItem>
						{keyValues?.industryKeyValues.map((industry) => (
							<MenuItem key={industry.key} value={industry.key}>
								{industry.value}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>

			<Grid item xs={12} sm={6}>
				<FormLabel id='position' className='field__label'>
					Profesja
				</FormLabel>
				<TextField
					autoComplete='given-name'
					name='position'
					required
					fullWidth
					id='position'
					placeholder='np. Fullstack developer'
					value={position}
					onChange={positionChange}
				/>
			</Grid>

			<Grid item xs={12} sm={6}>
				<FormLabel id='company' className='field__label'>
					Firma
				</FormLabel>
				<TextField
					autoComplete='given-name'
					name='company'
					required
					fullWidth
					id='company'
					placeholder='Podaj nazwę firmy'
					value={company}
					onChange={companyChange}
				/>
			</Grid>
		</Grid>
	);
};

export default StepTwo;
