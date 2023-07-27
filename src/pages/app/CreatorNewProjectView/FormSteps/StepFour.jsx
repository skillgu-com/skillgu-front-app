import BlockedScreen from '../../../../component/BlockedScreen';
import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	Radio,
	RadioGroup,
	TextareaAutosize,
	TextField,
} from '@mui/material';
import React, {useEffect, useRef, useState} from 'react';
import {validation} from '../../../../helpers/validation';
import {
	createFirstStep,
	updateFirstStep,
	updateFourStep,
} from '../../../../services/PitchDeckCreationService';

const StepFour = ({
	pitchDeckUniqueToken,
	unlockedStep4,
	setUnlockedStep5,
	unlockedStep5,
}) => {
	const [video, setVideo] = useState('');
	const [article, setArticle] = useState('');
	const [why, setWhy] = useState('');
	const [opinion, setOpinion] = useState('');

	// funkcjonalnosc ktora przechowuje nam wartosci miedzy cyklami renderowania
	const fourStepLastData = useRef({
		video,
		article,
		why,
		opinion,
	});

	const fourStepChanged = () => {
		return (
			fourStepLastData.current.video !== video ||
			fourStepLastData.current.article !== article ||
			fourStepLastData.current.why !== why ||
			fourStepLastData.current.opinion !== opinion
		);
	};

	const _validateStep4 = () => {
		return (
			validation('name', video) &&
			validation('name', article) &&
			validation('name', why) &&
			validation('name', opinion) 
		);
	};

	const _validateAndUpdateStep4 = () => {
		if (_validateStep4() && fourStepChanged()) {
			fourStepLastData.current = {
				pitchDeckUniqueToken: pitchDeckUniqueToken,
                video,
                article,
                why,
                opinion,
			};
			setUnlockedStep5(true);

			updateFourStep(
				pitchDeckUniqueToken.value,
                video,
                article,
                why,
                opinion,
			)
				.then((response) => {})
				.catch();
		}
	};

	const onBlur = () => {
		_validateAndUpdateStep4();
	};

	useEffect(() => {
		if (_validateStep4()) {
			_validateAndUpdateStep4();
		} else {
			setUnlockedStep5(false);
		}
	}, []);

	return (
		<Grid position={'relative'} container spacing={2}>
			{!unlockedStep4 && <BlockedScreen />}
			<Grid item xs={12} sm={6}>
				<FormLabel id='video' className='field__label'>
					Wideo
				</FormLabel>
				<TextField
					autoComplete='given-name'
					name='video'
					required
					fullWidth
					id='video'
					placeholder='Podaj profil LinkedIn'
					value={video}
					onChange={(event) => {
						setVideo(event.target.value);
					}}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<FormLabel id='article' className='field__label'>
					Artykuł
				</FormLabel>
				<TextField
					autoComplete='given-name'
					name='article'
					required
					fullWidth
					id='article'
					placeholder='www.mentor.com'
                    value={article}
					onChange={(event) => {
						setArticle(event.target.value);
					}}
				/>
			</Grid>
			<Grid item xs={12}>
				<FormLabel id='why' className='field__label'>
					Dlaczego zostałeś mentorem?
				</FormLabel>
				<TextareaAutosize
					aria-labelledby='why'
					aria-label='Korzyści'
					placeholder='Dobrze, wiemy czego/kogo Ty szukasz, teraz Ty Twój wkład'
					className='w-100 textarea-vertical'
                    value={why}
					onChange={(event) => {
						setWhy(event.target.value);
					}}
				/>
			</Grid>
			<Grid item xs={12}>
				<FormLabel id='opinion' className='field__label'>
					Twoja opinia
				</FormLabel>
				<TextareaAutosize
					aria-labelledby='opinion'
					aria-label='Korzyści'
					placeholder='Dobrze, wiemy czego/kogo Ty szukasz, teraz Ty Twój wkład'
					className='w-100 textarea-vertical'
					name='suggestionOfferDescription'
					value={opinion}
                    onChange={(event) => {
						setOpinion(event.target.value);
					}}
				/>
			</Grid>
		</Grid>
	);
};

export default StepFour;
