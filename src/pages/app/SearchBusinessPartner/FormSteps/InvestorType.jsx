import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import {
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Select,
    FormControl,
    MenuItem,
    Grid,
    Slider,
    TextareaAutosize, useTheme, InputLabel, OutlinedInput, Chip,
} from '@mui/material';
import Box from "@mui/material/Box";

function valuetext(value) {
    return `${value}°C`;
}

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


const noCapitalInvestorNames = [
    'Inwestor techniczny',
    'Programista',
    'Kucharz',
    'Mistrz w danej branży',
    'Restauracja',
    'Inna nieruchmość',
    'Inne',
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
    };
}


const minDistance = 10;

const InvestorType = (props) => {


    const theme = useTheme();


    const [value1, setValue1] = useState([0, 10000000]);

    const handleChange1 = (_event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
        } else {
            setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
        }
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <FormLabel id='rent-form__field' className='field__label'>
                    Chce byc inwestorem:
                </FormLabel>
                <FormControl fullWidth>
                    <Select
                        labelId='rent-form'
                        id='rent-form__field'
                        required
                        displayEmpty
                        inputProps={{'aria-label': 'Without label'}}
                        value={props.typeOfInvestor}
                        onChange={props.handleTypeOfInvestor}>
                        <MenuItem value={"PASSIVE"}>Pasywnym</MenuItem>
                        <MenuItem value={"ACTIVE"}>Aktywny</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl>
                    <FormLabel id='company-level' className='field__label'>
                       Jak chcesz zainwestować{' '}
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby='company-level'
                        defaultValue='yes'
                        name='company-level'
                        className='field__radio'

                        value={props.investorWithCapital}
                        onChange={(e) => {
                            props.handleInvestorWithCapitals(e)
                        }}>
                        <div className='d-flex'>
                            <FormControlLabel value='true' control={<Radio/>} label='Inwestuje kapitał'
                            />
                            <FormControlLabel value='false' control={<Radio/>} label='Zamiast kapitału oferuję'
                            />
                        </div>
                    </RadioGroup>
                </FormControl>
            </Grid>
            {props.investorWithCapital && (
                <Grid item xs={12}>
                    <FormLabel id='pratner-description' className='field__label'>
                        Przedział kapitału jaki mogę zainwestować
                    </FormLabel>
                    <div className='pitchdeck__budget'>
                        {props.companyAssetMinMax[0]} zł - {props.companyAssetMinMax[1]} zł
                    </div>
                    <div className='d-flex align-items-center'>
                        <p className='slider__description'>500 zł</p>
                        <Slider
                            getAriaLabel={() => 'Minimum distance'}
                            value={props.companyAssetMinMax}
                            onChange={props.handleCompanyAssetMinMax}
                            valueLabelDisplay='auto'
                            getAriaValueText={valuetext}
                            disableSwap
                            min={500}
                            max={100000}
                            step={100}
                        />
                        <p className='slider__description'>100 000 00PLN</p>
                    </div>
                </Grid>
            )}
            {!props.investorWithCapital && (
                <Grid item xs={12} md={12}>
                    <FormLabel id='rent-form__field' className='field__label'>
                      Mogę zaoferować
                    </FormLabel>
                    <FormControl fullWidth>
                        <Select
                            // labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={props.typeOfActivity}
                            onChange={props.handleTypeOfactivity}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
                            renderValue={(selected) => (
                                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value}/>
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}>
                            {noCapitalInvestorNames.map((name) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStyles(name, props.typeOfActivity, theme)}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                {/*    <FormLabel id='pratner-description' className='field__label'>*/}
                {/*        Inwestor zamiast kapitału, potrzebuje...*/}
                {/*    </FormLabel>*/}
                {/*    <TextareaAutosize*/}
                {/*        aria-labelledby='pratner-description'*/}
                {/*        aria-label='Opis wspólnika'*/}
                {/*        placeholder='Inwestor techniczny (np. Programista, Kucharz, “Mistrz w danej branży”)Inwestor z własnym wkładem (np. Restauracja, działka, inna nieruchomość'*/}
                {/*        className='w-100 textarea-vertical'*/}
                {/*        value={props.requireInvestInsteadAmount}*/}
                {/*        onChange={props.handleRequireInvestInsteadAmount}*/}
                {/*    />*/}
                </Grid>
            )}
        </Grid>
    );
};


export default InvestorType;
