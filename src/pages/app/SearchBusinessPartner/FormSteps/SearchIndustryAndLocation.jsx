import React, {useState} from 'react';
import {
    FormLabel,
    TextField,
    Grid,
    MenuItem,
    FormControl,
    Select,
} from '@mui/material';

const SearchIndustryAndLocation = (props) => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormLabel id='industry' className='field__label'>Jakiej branży szukasz</FormLabel>
                <FormControl fullWidth>
                    <Select
                        labelId='industry'
                        id='industry__field'
                        required
                        displayEmpty
                        inputProps={{'aria-label': 'Without label'}}
                        value={props.industryTypeSearch}
                        onChange={props.handleIndustryTypeSearch}>
                        <MenuItem value={0} disabled>
                            Branża
                        </MenuItem>
                        <MenuItem value={"GASTRONOMY"}>Gastronomia</MenuItem>
                        <MenuItem value={"IT"}>IT</MenuItem>
                        <MenuItem value={"REAL_ESTATE"}>NIERUCHOMOŚCI</MenuItem>
                        <MenuItem value={"AUTOMOTIVE"}>MOTORYZACJA</MenuItem>
                        <MenuItem value={"INDUSTRY"}>PRZEMYSŁ</MenuItem>
                        <MenuItem value={"FARMING"}>ROLNICTWO</MenuItem>
                        <MenuItem value={"TRANSPORT"}>TRANSPORT</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormLabel id='localization' className='field__label'>Jaką lokalizacją jesteś zainteresowany</FormLabel>
                <FormControl fullWidth>
                    <Select
                        labelId='localization'
                        id='localization__field'
                        required
                        displayEmpty
                        inputProps={{'aria-label': 'Without label'}}
                        value={props.projectLocalization}
                        onChange={props.handleProjectLocalization}>
                        <MenuItem value={0} disabled>
                            Lokalizacja
                        </MenuItem>
                        <MenuItem value={"WARSAW"}>WARSZAWA</MenuItem>
                        <MenuItem value={"CRACOW"}>KRAKÓW</MenuItem>
                        <MenuItem value={"GDYNIA"}>GDYNIA</MenuItem>
                        <MenuItem value={"ZAKOPANE"}>ZAKOPANE</MenuItem>
                        <MenuItem value={"CALA_POLSKA"}>CAŁA POLSKA</MenuItem>
                    </Select>
                </FormControl>

            </Grid>
        </Grid>
    );
};

export default SearchIndustryAndLocation;
