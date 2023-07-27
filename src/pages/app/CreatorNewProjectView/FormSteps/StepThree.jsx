import BlockedScreen from '../../../../component/BlockedScreen';
import {
	FormControl,
	FormLabel,
	Grid,
	MenuItem,
	Select,
	TextareaAutosize,
	TextField,
} from '@mui/material';
import React, {useEffect, useRef, useState} from 'react';
import {validation} from '../../../../helpers/validation';
import {updateThirdStep} from '../../../../services/PitchDeckCreationService';

function valuetext(value) {
	return `${value}°C`;
}

const StepThree = ({
	pitchDeckUniqueToken,
	unlockedStep3,
	keyValues,
	setUnlockedStep4,
}) => {
	const [businessType, setBusinessType] = useState('0');
	const [bio, setBio] = useState('');
	const [twitter, setTwitter] = useState('');
	const [linkedIn, setLinkedIn] = useState('');
	const [website, setWebsite] = useState('');

	const thirdStepLastData = useRef({
		businessType,
		bio,
		twitter,
		linkedIn,
		website,
	});

	const thirdStepChanged = () => {
		return thirdStepLastData.current.businessType !== businessType;
	};

	const businessTypeChange = (event) => {
		setBusinessType(event.target.value);
	};

	const _validateStep3 = () => {
		return validation('businessType', businessType);
	};

	const _validateAndUpdateStep3 = () => {
		if (_validateStep3() && thirdStepChanged()) {
			thirdStepLastData.current = {
				pitchDeckUniqueToken: pitchDeckUniqueToken,
				businessType: businessType,
			};
			updateThirdStep(pitchDeckUniqueToken.value, businessType)
				.then((response) => {})
				.catch();
		}
	};

	useEffect(() => {
		if (unlockedStep3 && _validateStep3()) {
			setUnlockedStep4(true);
			_validateAndUpdateStep3();
		} else {
			setUnlockedStep4(false);
		}
	}, [businessType, bio, twitter, linkedIn, website]);

	return (
		<Grid position={'relative'} container spacing={2}>
			{!unlockedStep3 && <BlockedScreen />}
			<Grid item xs={12} sm={6}>
				<FormLabel id='rent-form__field' className='field__label'>
					Typ działalności
				</FormLabel>
				<FormControl fullWidth>
					<Select
						labelId='rent-form'
						id='rent-form__field'
						required
						displayEmpty
						name='businessType'
						inputProps={{'aria-label': 'Without label'}}
						value={businessType}
						onChange={businessTypeChange}>
						<MenuItem value={0} disabled>
							Wybierz typ działalności
						</MenuItem>
						{keyValues?.businessTypeKeyValues.map((businessType) => (
							<MenuItem value={businessType.key}> {businessType.value}</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={12}>
				<FormLabel id='bio' className='field__label'>
					Bio
				</FormLabel>
				<TextareaAutosize
					aria-labelledby='bio'
					aria-label='Rozwiązanie'
					placeholder='Co rozwiązuje Twój biznes'
					className='w-100 textarea-vertical'
					name='bio'
					value={bio}
					onChange={(event) => {
						setBio(event.target.value);
					}}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<FormLabel id='twitter' className='field__label'>
					Twitter
				</FormLabel>
				<TextField
					autoComplete='given-name'
					name='twitter'
					required
					fullWidth
					id='twitter'
					placeholder='Podaj profil Twittera'
					value={twitter}
					onChange={(event) => {
						setTwitter(event.target.value);
					}}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<FormLabel id='linkedin' className='field__label'>
					LinkedIn
				</FormLabel>
				<TextField
					autoComplete='given-name'
					name='linkedin'
					required
					fullWidth
					id='linkedin'
					placeholder='Podaj profil LinkedIn'
					value={linkedIn}
					onChange={(event) => {
						setLinkedIn(event.target.value);
					}}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<FormLabel id='website' className='field__label'>
					Strona internetowa
				</FormLabel>
				<TextField
					autoComplete='given-name'
					name='website'
					required
					fullWidth
					id='website'
					placeholder='www.mentor.com'
					value={website}
					onChange={(event) => {
						setWebsite(event.target.value);
					}}
				/>
			</Grid>
		</Grid>
	);
};

export default StepThree;
