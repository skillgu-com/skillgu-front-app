import React, {useState} from 'react';
import { Grid, TextField, FormLabel } from '@mui/material';
import {
    MenuItem,
    FormControl,
    Select,
    RadioGroup,
    FormControlLabel,
    Radio,
    Slider,
    TextareaAutosize,
    Button,
} from '@mui/material';
import CustomButton, {buttonColors, buttonTypes} from '../../../../component/CustomButton';
import AppLayout from "../../../../component/AppLayout";
import HeroHeader from "../../../../component/HeroHeader";
import headerImg from "../../../../assets/img/sunrise.png";
import Checkbox from "@mui/material/Checkbox";
import CardNavigation from "../../../../component/CardNavigation";

function valuetext(value) {
    return `${value}°C`;
}

const minDistance = 10;

const SessionPlanCreatorView = (props) => {
    const [value1, setValue1] = useState([0, 10000000]);
    const [startTime, setStartTime] = useState('');
    const [isChecked, setIsChecked] = useState(false);

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

    const handleStartTime = (event) => {
        const newStartTime = event.target.value;
        setStartTime(newStartTime);
    };

    const handleCheckboxChange = (event) => {
        const newCheckedValue = event.target.checked;
        setIsChecked(newCheckedValue);
    };


    let handleSubmitProject;
    return (
        <AppLayout>
            <HeroHeader
                title='Harmonogram sesji'
                image={<img src={headerImg} alt='Las'/>}
            />

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <FormLabel id='localization' className='field__label'>
                        Nazwa sesji
                    </FormLabel>
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
                                Wybierz typ spotkania
                            </MenuItem>
                            <MenuItem value={0}>Doradctwo marki osobistej</MenuItem>
                            <MenuItem value={1}>1 sesja mentorska</MenuItem>
                            <MenuItem value={2}>Plan rozwoju kariery</MenuItem>
                            <MenuItem value={3}>Strategia poszukiwania pracy</MenuItem>
                            <MenuItem value={4}>Techniczny próbny wywiad</MenuItem>
                            <MenuItem value={5}>Twoja sugestia nazwy</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormLabel id='localization' className='field__label'>
                        Strefa czasowa
                    </FormLabel>
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
                                Wybierz strefe czasową
                            </MenuItem>
                            <MenuItem value={'Europe/Warsaw'}>Europe/Warsaw</MenuItem>
                            <MenuItem value={'Europe/Rome'}>Europe/Rome</MenuItem>
                            <MenuItem value={'Europe/Riga'}>Europe/Riga</MenuItem>
                            <MenuItem value={'Europe/Berlin'}>Europe/Berlin</MenuItem>
                            <MenuItem value={'Europe/Amsterdam'}>Europe/Amsterdam</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormLabel id='industry' className='field__label'>
                        Wybierz zakres czasowu
                    </FormLabel>
                    <FormControl fullWidth>
                        <Select
                            labelId='industry'
                            id='industry__field'
                            required
                            displayEmpty
                            inputProps={{'aria-label': 'Without label'}}
                            value={props.projectIndustry}
                            onChange={props.handleProjectIndustry}>
                            <MenuItem value={0} disabled>
                                Czas trwania spotkania
                            </MenuItem>
                            <MenuItem value={'30'}>30 minut</MenuItem>
                            <MenuItem value={'45'}>45 minut</MenuItem>
                            <MenuItem value={'60'}>60 minut</MenuItem>
                            <MenuItem value={'90'}>90 minut</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>


                {/*<Grid item xs={12} md={6}>*/}
                {/*    <FormLabel id='start-data' className='field__label'>*/}
                {/*        W jakim przedziale czasowym szukasz inwestycji?*/}
                {/*    </FormLabel>*/}
                {/*    <TextField*/}
                {/*        autoComplete='given-name'*/}
                {/*        name='start-data'*/}
                {/*        required*/}
                {/*        fullWidth*/}
                {/*        id='start-data'*/}
                {/*        placeholder='12.02.2022'*/}
                {/*        type={'date'}*/}
                {/*        autoFocus*/}
                {/*        value={props.startDate}*/}
                {/*        onChange={props.handleStartDate}*/}
                {/*    />*/}
                {/*</Grid>*/}

                <Grid item xs={12} md={6}>
                    <FormLabel id='rent-form__field' className='field__label'>
                        Forma powiadomień o dopasowanych ofertach
                    </FormLabel>
                    <FormControl fullWidth>
                        <Select
                            labelId='rent-form'
                            id='rent-form__field'
                            required
                            displayEmpty
                            inputProps={{'aria-label': 'Without label'}}
                            value={props.typeOfNotification}
                            onChange={props.handleTypeOfNotification}>
                            <MenuItem value={0} disabled>
                                Wybierz formę powiadomień
                            </MenuItem>
                            <MenuItem value={1}>EMAIL</MenuItem>
                            <MenuItem value={2}>APLIKACJA</MenuItem>
                            <MenuItem value={2}>KALENDARZ</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                    <Grid item xs={12} md={6}>
                        <Grid>
                            <FormLabel id='start-data' className='field__label'>
                                Poniedziałek
                                <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
                            </FormLabel>
                            <TextField
                                autoComplete='given-name'
                                name='end-data'
                                required
                                fullWidth
                                id='end-data'
                                placeholder='12.02.2022'
                                type='date'
                                autoFocus
                                value={startTime}
                                onChange={handleStartTime}
                            />
                            <FormLabel id='start-data' className='field__label'>
                                Wtorek
                                <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
                            </FormLabel>
                            <TextField
                                autoComplete='given-name'
                                name='end-data'
                                required
                                fullWidth
                                id='end-data'
                                placeholder='12.02.2022'
                                type='date'
                                autoFocus
                                value={startTime}
                                onChange={handleStartTime}
                            />
                        </Grid>

                    </Grid>

            </Grid>
            <CustomButton as={buttonTypes.submit} color={buttonColors.primary} _onClick={handleSubmitProject}>
                Dodaj
            </CustomButton>

        </AppLayout>
    );
};

export default SessionPlanCreatorView;
