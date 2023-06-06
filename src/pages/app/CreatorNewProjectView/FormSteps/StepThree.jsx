import BlockedScreen from "../../../../component/BlockedScreen";
import {FormControl, FormLabel, Grid, MenuItem, Select, Slider, TextField} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {validation} from "../../../../helpers/validation";
import { updateThirdStep} from "../../../../services/PitchDeckCreationService";


function valuetext(value) {
    return `${value}°C`;
}

const StepThree = ({pitchDeckUniqueToken, unlockedStep3, keyValues, setUnlockedStep4}) => {

    const [companyAssetMinMax, setCompanyAssetMinMax] = useState('0');
    const [minimumCompanyAsset, setMinimumCompanyAsset] = useState('0');
    const [roi, setRoi] = useState('0');
    const [paybackTime, setPaybackTime] = useState('');
    const [businessType, setBusinessType] = useState('0');
    const [financialProtection, setFinancialProtection] = useState('0');


    const thirdStepLastData = useRef({
        companyAssetMinMax,
        minimumCompanyAsset,
        roi,
        paybackTime,
        businessType,
        financialProtection,
    });

    const thirdStepChanged = () => {
        return thirdStepLastData.current.companyAssetMinMax !== companyAssetMinMax
            || thirdStepLastData.current.minimumCompanyAsset !== minimumCompanyAsset
            || thirdStepLastData.current.roi !== roi
            || thirdStepLastData.current.paybackTime !== paybackTime
            || thirdStepLastData.current.businessType !== businessType
            || thirdStepLastData.current.financialProtection !== financialProtection
    }

    const companyAssetMinMaxChange = (event) => {
        setCompanyAssetMinMax(event.target.value);
    }

    const minimumCompanyAssetChange = (event) => {
        setMinimumCompanyAsset(event.target.value);
    }

    const roiChange = (event) => {
        setRoi(event.target.value);
    }

    const paybackTimeChange = (event) => {
        setPaybackTime(event.target.value);
    }

    const businessTypeChange = (event) => {
        setBusinessType(event.target.value);
    }


    const financialProtectionChange = (event) => {
        setFinancialProtection(event.target.value);
    }

    const _validateStep3 = () => {
        return validation('companyAssetMinMax', companyAssetMinMax) &&
            validation('minimumCompanyAsset', minimumCompanyAsset) &&
            validation('roi', roi) &&
            validation('paybackTime', paybackTime) &&
            validation('businessType', businessType) &&
            validation('financialProtection', financialProtection);
    }

    const _validateAndUpdateStep3 = () => {
        if (_validateStep3() && thirdStepChanged()) {
            thirdStepLastData.current = {
                pitchDeckUniqueToken: pitchDeckUniqueToken,
                companyAssetMinMax: companyAssetMinMax,
                minimumCompanyAsset: minimumCompanyAsset,
                roi: roi,
                paybackTime: paybackTime,
                businessType: businessType,
                financialProtection: financialProtection,
            }
            updateThirdStep(pitchDeckUniqueToken.value, companyAssetMinMax, minimumCompanyAsset, roi, paybackTime, businessType, financialProtection)
                .then(response => {
                })
                .catch()
        }
    }

    useEffect(() => {
        if (unlockedStep3 && _validateStep3()) {
            setUnlockedStep4(true);
            _validateAndUpdateStep3();
        } else {
            setUnlockedStep4(false);
        }
    }, [companyAssetMinMax, minimumCompanyAsset, paybackTime,roi, businessType, financialProtection]);


    return <Grid position={'relative'} container spacing={2}>
        {!unlockedStep3 && <BlockedScreen />}
        <Grid item xs={12} sm={6}>
            <FormLabel id='pratner-description' className='field__label'>
                Kapitału jaki potrzebuję
            </FormLabel>
            <div className='pitchdeck__budget'>{companyAssetMinMax} zł</div>
            <div className='d-flex align-items-center'>
                <p className='slider__description'>1000 zł</p>
                <Slider
                    getAriaLabel={() => 'Minimum distance'}
                    name='companyAssetMinMax'
                    value={companyAssetMinMax}
                    onChange={companyAssetMinMaxChange}
                    valueLabelDisplay='auto'
                    getAriaValueText={valuetext}
                    disableSwap
                    min={1000}
                    max={100000}
                    step={1000}
                />
                <p className='slider__description'>100 000PLN</p>
            </div>
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormLabel id='pratner-description' className='field__label'>
                Minimalny próg wejścia
            </FormLabel>
            <div className='pitchdeck__budget'>{minimumCompanyAsset} zł</div>
            <div className='d-flex align-items-center'>
                <p className='slider__description'>1000 zł</p>
                <Slider
                    getAriaLabel={() => 'Minimum distance'}
                    name='minimumCompanyAsset'
                    value={minimumCompanyAsset}
                    onChange={minimumCompanyAssetChange}
                    valueLabelDisplay='auto'
                    getAriaValueText={valuetext}
                    disableSwap
                    min={1000}
                    max={companyAssetMinMax}
                    step={1000}
                />
                <p className='slider__description'>{companyAssetMinMax}PLN</p>
            </div>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
            <FormLabel id='time__field' className='field__label'>
                Prognozowane ROI
            </FormLabel>
            <FormControl fullWidth>
                <Select
                    labelId='time'
                    id='time__field'
                    required
                    displayEmpty
                    name='roi'
                    inputProps={{'aria-label': 'Without label'}}
                    value={roi}
                    onChange={roiChange}>
                    <MenuItem value={0} disabled>
                        Szacowany czas zwrotu
                    </MenuItem>
                    <MenuItem value={1}>1% - 2%</MenuItem>
                    <MenuItem value={2}>2% - 3%</MenuItem>
                    <MenuItem value={3}>3% - 5%</MenuItem>
                    <MenuItem value={4}>5% - 8%</MenuItem>
                    <MenuItem value={5}>8% - 13%</MenuItem>
                    <MenuItem value={6}>13% - 21%</MenuItem>
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
            <FormLabel id='time__field' className='field__label'>
                Prognozowany czas zwrotu
            </FormLabel>
            <FormControl fullWidth>
                <Select
                    labelId='time'
                    id='time__field'
                    required
                    displayEmpty
                    name='paybackTime'
                    inputProps={{'aria-label': 'Without label'}}
                    value={paybackTime}
                    onChange={paybackTimeChange}>
                    <MenuItem value={0} disabled>
                        Szacowany czas zwrotu
                    </MenuItem>
                    <MenuItem value={1}>do 1 roku</MenuItem>
                    <MenuItem value={2}>do 2 lat</MenuItem>
                    <MenuItem value={3}>do 3 lat</MenuItem>
                    <MenuItem value={4}>do 4 lat</MenuItem>
                    <MenuItem value={5}>do 5 lat</MenuItem>
                    <MenuItem value={6}>do 6 lat</MenuItem>
                    <MenuItem value={7}>do 7 lat</MenuItem>
                    <MenuItem value={8}>do 8 lat</MenuItem>
                    <MenuItem value={9}>do 9 lat</MenuItem>
                    <MenuItem value={10}>do 10 lat</MenuItem>
                </Select>
            </FormControl>
        </Grid>
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
                    {keyValues?.businessTypeKeyValues.map(businessType =>
                        <MenuItem value={businessType.key}> {businessType.value}</MenuItem>)}
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormLabel id='rent-form__field' className='field__label'>
                Forma zabezpieczenia
            </FormLabel>
            <FormControl fullWidth>
                <Select
                    labelId='rent-form'
                    id='rent-form__field'
                    required
                    displayEmpty
                    name='businessInsurance'
                    inputProps={{'aria-label': 'Without label'}}
                    value={financialProtection}
                    onChange={financialProtectionChange}>
                    <MenuItem value={0} disabled>
                        Wybierz typ działalności
                    </MenuItem>
                    {keyValues?.financialProtectionKeyValues.map(financialProtection =>
                        <MenuItem key={financialProtection.key} value={financialProtection.key}>
                            {financialProtection.value}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
        </Grid>
    </Grid>
}

export default StepThree;