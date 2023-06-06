import React, {useState} from 'react';
import {
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
    Grid,
    TextareaAutosize, Select, MenuItem, TextField,
} from '@mui/material';

const BusinessTypeAndStartDate = (props) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormLabel id='rent-form__field' className='field__label'>
                    Na jakim etapie szukasz inwestycji?
                </FormLabel>
                <FormControl fullWidth>
                    <Select
                        labelId='rent-form'
                        id='rent-form__field'
                        required
                        displayEmpty
                        inputProps={{'aria-label': 'Without label'}}
                        value={props.projectStage}
                        onChange={props.handleProjectStage}>
                        <MenuItem value={0} disabled>Wybierz etap inwestycji
                        </MenuItem>
                        <MenuItem value={"EXISTING_BUSINESS"}>Chce zainwestowac w już działającego biznesu</MenuItem>
                        <MenuItem value={"BUSINESS_PLAN"}>Chce zainwestowac w ciekawy biznesplan</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormLabel id='start-data' className='field__label'>
                    Jak długo firma powinna działać na rynku, od kiedy biznesplan ma zacząć działać?
                </FormLabel>
                <TextField
                    autoComplete='given-name'
                    name='start-data'
                    required
                    fullWidth
                    id='start-data'
                    placeholder='12.02.2022'
                    autoFocus
                    value={props.startDate}
                    onChange={props.handleStartDate}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControl>
                    <FormLabel id='market-competition' className='field__label'>
                        Czy inwestycja ma konkurencje czy jest innowacyjna?
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby='market-competition'
                        defaultValue='yes'
                        name='market-competition'
                        className='field__radio'
                        value={props.competitionExists}
                        onChange={(e) => {
                            props.handleCompetitionExists(e);
                        }}>
                        <div className='d-flex'>
                            <FormControlLabel value='true' control={<Radio/>} label='Tak'/>
                            <FormControlLabel value='false' control={<Radio/>} label='Nie'/>
                        </div>
                    </RadioGroup>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default BusinessTypeAndStartDate;