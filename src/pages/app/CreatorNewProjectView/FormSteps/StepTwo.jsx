import BlockedScreen from '../../../../component/BlockedScreen';
import {
    Chip,
    FormControl,
    FormLabel,
    Grid, InputLabel,
    MenuItem, OutlinedInput,
    Select,
    TextField,
} from '@mui/material';
import React, {useEffect, useRef, useState} from 'react';
import {validation} from '../../../../helpers/validation';
import {updateSecondStep} from '../../../../services/PitchDeckCreationService';
import {MuiChipsInput} from 'mui-chips-input';
import Box from "@mui/material/Box";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const StepTwo = ({
                     pitchDeckUniqueToken,
                     unlockedStep2,
                     unlockedStep3,
                     keyValues,
                     setUnlockedStep3,
                 }) => {
    const [projectLocalization, setProjectLocalization] = useState('0');
    const [projectIndustry, setProjectIndustry] = useState([]);
    const [projectStage, setProjectStage] = useState('0');
    const [startDate, setStartDate] = useState('');
    const [investorNumbers, setInvestorNumbers] = useState('0');
    const [typeOfInvestor, setTypeOfInvestor] = useState('0');

    const secondStepLastData = useRef({
        projectLocalization,
        projectIndustry,
        projectStage,
        startDate,
        investorNumbers,
        typeOfInvestor,
    });

    const secondStepChanged = () => {
        return (
            secondStepLastData.current.projectLocalization !== projectLocalization ||
            secondStepLastData.current.projectIndustry !== projectIndustry ||
            secondStepLastData.current.projectStage !== projectStage ||
            secondStepLastData.current.startDate !== startDate ||
            secondStepLastData.current.investorNumbers !== investorNumbers ||
            secondStepLastData.current.typeOfInvestor !== typeOfInvestor
        );
    };

    const projectLocalizationChange = (event) => {
        setProjectLocalization(event.target.value);
    };

    // const projectIndustryChange = (newChips) => {
    //     setProjectIndustry(newChips);
    // };

    const projectIndustryChange = (event) => {
        const {
            target: {value},
        } = event;
        setProjectIndustry(
            typeof value === 'string' ? value.split(',') : value,
        );
    };


    const projectStageChange = (event) => {
        setProjectStage(event.target.value);
    };

    const startDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const investorNumbersChange = (event) => {
        setInvestorNumbers(event.target.value);
    };

    const typeOfInvestorChange = (event) => {
        setTypeOfInvestor(event.target.value);
    };

    const _validateStep2 = () => {
        return (
            validation('localization', projectLocalization) &&
            validation('industry', projectIndustry) &&
            validation('projectStage', projectStage) &&
            validation('startDate', startDate) &&
            validation('investorNumbers', investorNumbers) &&
            validation('typeOfInvestor', typeOfInvestor)
        );
    };

    const _validateAndUpdateStep2 = () => {
        if (_validateStep2() && secondStepChanged()) {
            secondStepLastData.current = {
                projectLocalization: projectLocalization,
                projectIndustry: projectIndustry,
                projectStage: projectStage,
                startDate: startDate,
                investorNumbers: investorNumbers,
                typeOfInvestor: typeOfInvestor,
            };
            ;

            updateSecondStep(pitchDeckUniqueToken.value,projectLocalization, projectIndustry,projectStage,startDate,investorNumbers,typeOfInvestor)
                .then((response) => {
                    console.log('Odpowiedz z update scond step: ', response);
                })
                .catch();
        }
    };

    const onBlur = () => {
        _validateAndUpdateStep2();
    };

    /*
     * efect for dropdowns
     */
    useEffect(() => {
        if (unlockedStep2 && _validateStep2()) {
            setUnlockedStep3(true);
            _validateAndUpdateStep2();
        } else {
            setUnlockedStep3(false);
        }
    }, [
        projectLocalization,
        projectIndustry,
        projectStage,
        investorNumbers,
        typeOfInvestor,
    ]);

    /*
     * efect for text inputs
     */
    useEffect(() => {
        if (unlockedStep2 && _validateStep2()) {
            setUnlockedStep3(true);
        } else {
            setUnlockedStep3(false);
        }
    }, [startDate]);


    return (
        <Grid position={'relative'} container spacing={2}>
            {!unlockedStep2 && <BlockedScreen/>}
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
                            <MenuItem
                                key={industry.key}
                                value={industry.key}>
                                {industry.value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            {/*<Grid item xs={12} sm={6}>*/}
            {/*    <FormLabel id='industry' className='field__label'>*/}
            {/*        Wybierz Branżę*/}
            {/*    </FormLabel>*/}
            {/*    <FormControl fullWidth>*/}
            {/*        /!*<InputLabel id="demo-multiple-chip-label">Chip</InputLabel>*!/*/}
            {/*        <Select*/}
            {/*            labelId="demo-multiple-chip-label"*/}
            {/*            id="demo-multiple-chip"*/}
            {/*            multiple*/}
            {/*            value={projectIndustry}*/}
            {/*            onChange={projectIndustryChange}*/}
            {/*            // input={<OutlinedInput id="select-multiple-chip" label="Chip" />}*/}
            {/*            renderValue={(selected) => (*/}
            {/*                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>*/}
            {/*                    {selected.map((value) => (*/}
            {/*                        <Chip key={value} label={keyValues?.industryKeyValues.find((industry) => {*/}
            {/*                            return industry.key === value;*/}
            {/*                        }).value*/}
            {/*                        }/>*/}

            {/*                    ))}*/}
            {/*                </Box>*/}
            {/*            )}*/}
            {/*            MenuProps={MenuProps}*/}
            {/*        >*/}
            {/*            {keyValues?.industryKeyValues.map((industry) => (*/}
            {/*                <MenuItem*/}
            {/*                    key={industry.key}*/}
            {/*                    value={industry.key}>*/}
            {/*                    {industry.value}*/}
            {/*                </MenuItem>*/}
            {/*            ))}*/}
            {/*        </Select>*/}
            {/*    </FormControl>*/}
            {/*</Grid>*/}

            <Grid item xs={12} sm={6}>
                <FormLabel id='rent-form__field' className='field__label'>
                    Na jakim etapie inwestycji jesteś?
                </FormLabel>
                <FormControl fullWidth>
                    <Select
                        labelId='rent-form'
                        id='rent-form__field'
                        required
                        displayEmpty
                        name='projectStage'
                        inputProps={{'aria-label': 'Without label'}}
                        value={projectStage}
                        onChange={projectStageChange}>
                        <MenuItem value={0} disabled>
                            Wybierz na jakim etapie inwestycji jesteś
                        </MenuItem>
                        {keyValues?.projectStageKeyValues.map((projectStage) => (
                            <MenuItem key={projectStage.key} value={projectStage.key}>
                                {' '}
                                {projectStage.value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormLabel id='start-data' className='field__label'>
                    Idealny czas zakończenia zbiórki?
                </FormLabel>
                <TextField
                    autoComplete='given-name'
                    name='startDate'
                    required
                    fullWidth
                    id='start-data'
                    placeholder='12.02.2022'
                    type={'date'}
                    value={startDate}
                    onChange={startDateChange}
                    onBlur={onBlur}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormLabel id='rent-form__field' className='field__label'>
                    Ilu inwestorów szukasz?
                </FormLabel>
                <FormControl fullWidth>
                    <Select
                        labelId='rent-form'
                        id='rent-form__field'
                        required
                        displayEmpty
                        inputProps={{'aria-label': 'Without label'}}
                        name='investorNumbers'
                        value={investorNumbers}
                        onChange={investorNumbersChange}>
                        <MenuItem value={0} disabled>
                            Ilu inwestorów potrzebujesz
                        </MenuItem>
                        {keyValues?.investorNumbersKeyValues.map((investorNumbers) => (
                            <MenuItem key={investorNumbers.key} value={investorNumbers.key}>
                                {' '}
                                {investorNumbers.value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormLabel id='rent-form__field' className='field__label'>
                    Inwestorów
                </FormLabel>
                <FormControl fullWidth>
                    <Select
                        labelId='rent-form'
                        id='rent-form__field'
                        required
                        displayEmpty
                        name='typeOfInvestor'
                        inputProps={{'aria-label': 'Without label'}}
                        value={typeOfInvestor}
                        onChange={typeOfInvestorChange}>
                        <MenuItem value={'0'} disabled>
                            Wybierz
                        </MenuItem>
                        {keyValues?.typeOfInvestorKeyValues.map((typeOfInvestor) => (
                            <MenuItem key={typeOfInvestor.key} value={typeOfInvestor.key}>
                                {' '}
                                {typeOfInvestor.value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )
        ;
};

export default StepTwo;
