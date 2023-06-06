import BlockedScreen from "../../../../component/BlockedScreen";
import {
    FormControl, FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    TextareaAutosize,
} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {validation} from "../../../../helpers/validation";
import {
    createFirstStep, updateFirstStep,
    updateFourStep,
} from "../../../../services/PitchDeckCreationService";

const StepFour = ({pitchDeckUniqueToken, unlockedStep4, setUnlockedStep5,unlockedStep5}) => {

    const [offerDescription, setOfferDescription] = useState("");
    const [solutionDescription, setSolutionDescription] = useState("");
    const [competitionExists, setCompetitionExists] = useState(false);
    const [competitionDescription, setCompetitionDescription] = useState("");
    const [businessModelDescription, setBusinessModelDescription] = useState("");
    const [suggestionOfferDescription, setSuggestionOfferDescription] = useState("");

    // funkcjonalnosc ktora przechowuje nam wartosci miedzy cyklami renderowania
    const fourStepLastData = useRef({
        offerDescription,
        solutionDescription,
        competitionExists,
        competitionDescription,
        businessModelDescription,
        suggestionOfferDescription
    });

    const fourStepChanged = () => {
        return fourStepLastData.current.offerDescription !== offerDescription
            || fourStepLastData.current.solutionDescription !== solutionDescription
            || fourStepLastData.current.competitionExists !== competitionExists
            || fourStepLastData.current.competitionDescription !== competitionDescription
            || fourStepLastData.current.businessModelDescription !== businessModelDescription
            || fourStepLastData.current.suggestionOfferDescription !== suggestionOfferDescription
    }

    const offerDescriptionChange = (event) => {
        setOfferDescription(event.target.value);
    }

    const solutionDescriptionChange = (event) => {
        setSolutionDescription(event.target.value);
    }

    const competitionExistsChange = (event) => {
        setCompetitionExists(event.target.value);
    }

    const competitionDescriptionChange = (event) => {
        setCompetitionDescription(event.target.value);
    }

    const businessModelDescriptionChange = (event) => {
        setBusinessModelDescription(event.target.value);
    }


    const suggestionOfferDescriptionChange = (event) => {
        setSuggestionOfferDescription(event.target.value);
    }

    const _validateStep4 = () => {
        return validation('offerDescription', offerDescription) &&
            validation('solutionDescription', solutionDescription) &&
            validation('competitionExists', competitionExists) &&
            validation('competitionDescription', competitionDescription) &&
            validation('businessModelDescription', businessModelDescription) &&
            validation('suggestionOfferDescription', suggestionOfferDescription);
    }

    const _validateAndUpdateStep4 = () => {
        if (_validateStep4() && fourStepChanged()) {
            fourStepLastData.current = {
                pitchDeckUniqueToken: pitchDeckUniqueToken,
                offerDescription: offerDescription,
                solutionDescription: solutionDescription,
                competitionExists: competitionExists,
                competitionDescription: competitionDescription,
                businessModelDescription: businessModelDescription,
                suggestionOfferDescription: suggestionOfferDescription
            }
            setUnlockedStep5(true);

            updateFourStep(pitchDeckUniqueToken.value, offerDescription, solutionDescription, competitionExists, competitionDescription, businessModelDescription, suggestionOfferDescription)
                .then(response => {
                })
                .catch()
        }
    }

    const onBlur = () => {
        _validateAndUpdateStep4()
    }


    useEffect(() => {
        if (_validateStep4()) {
            _validateAndUpdateStep4()
        } else {
            setUnlockedStep5(false);
        }
    }, []);


    return <Grid position={'relative'} container spacing={2}>
        {!unlockedStep4 && <BlockedScreen/>}
        <Grid item xs={12} sm={6}>
            <FormLabel id='offer-description' className='field__label'>
                Opisz swoją ofertę
            </FormLabel>
            <TextareaAutosize
                aria-labelledby='offer-description'
                aria-label='Opisz swój biznes'
                placeholder='Opisz swój biznes'
                className='w-100 textarea-vertical'
                name='offerDescription'
                value={offerDescription}
                // on
                onChange={offerDescriptionChange}
                onBlur={onBlur}

            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormLabel id='solution' className='field__label'>
                Opisz swoje rozwiązanie
            </FormLabel>
            <TextareaAutosize
                aria-labelledby='solution'
                aria-label='Rozwiązanie'
                placeholder='Co rozwiązuje Twój biznes'
                className='w-100 textarea-vertical'
                name='solutionDescription'
                value={solutionDescription}
                onChange={solutionDescriptionChange}
                onBlur={onBlur}

            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormControl>
                <FormLabel id='market-competition' className='field__label'>
                    Czy jest konkurencja na rynku?
                </FormLabel>
                <RadioGroup
                    aria-labelledby='market-competition'
                    name='competitionExists'
                    className='field__radio'
                    value={competitionExists}
                    onChange={competitionExistsChange}>
                    <div className='d-flex'>
                        <FormControlLabel value='true' control={<Radio/>} label='Tak'/>
                        <FormControlLabel value='false' control={<Radio/>} label='Nie'/>
                    </div>
                </RadioGroup>
            </FormControl>
        </Grid>
        {competitionExists === 'true' && (
            <Grid item xs={12} sm={6}>
                <FormLabel id='offer-description' className='field__label'>
                    Opisz swoją konkurencję
                </FormLabel>
                <TextareaAutosize
                    aria-labelledby='market-competition-description'
                    aria-label='Opis konkurencji'
                    placeholder='Opisz swoją konkurencję rynkową'
                    className='w-100 textarea-vertical'
                    name='competitionDescription'
                    value={competitionDescription}
                    onChange={competitionDescriptionChange}
                    onBlur={onBlur}

                />
            </Grid>
        )}
        <Grid item xs={12} sm={6}>
            <FormLabel id='model' className='field__label'>
                Opisz model biznesowy
            </FormLabel>
            <TextareaAutosize
                aria-labelledby='model'
                aria-label='Model biznesu'
                placeholder='Opisz model biznesowy, jak chcesz zarabiać, kiedy i jakie zyski chcesz osiągnąć.'
                className='w-100 textarea-vertical'
                name='businessModelDescription'
                value={businessModelDescription}
                onChange={businessModelDescriptionChange}
                onBlur={onBlur}

            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormLabel id='model' className='field__label'>
                Opisz co oferujesz w zamian inwestorowi
            </FormLabel>
            <TextareaAutosize
                aria-labelledby='model'
                aria-label='Korzyści'
                placeholder='Dobrze, wiemy czego/kogo Ty szukasz, teraz Ty Twój wkład'
                className='w-100 textarea-vertical'
                name='suggestionOfferDescription'
                value={suggestionOfferDescription}
                onChange={suggestionOfferDescriptionChange}
                onBlur={onBlur}
            />
        </Grid>
    </Grid>
}

export default StepFour;