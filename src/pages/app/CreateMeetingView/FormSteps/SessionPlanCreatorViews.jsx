import React, {useEffect, useState} from 'react';
import {Grid, TextField, FormLabel} from '@mui/material';
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
import {createNewMeeting} from "../../../../services/MeetingCreatorService";
import {useNavigate} from "react-router-dom";
import {getKeyValues} from "../../../../services/KeyValuesService";

function valuetext(value) {
    return `${value}°C`;
}

const minDistance = 10;

const SessionPlanCreatorView = (props) => {
    const [value1, setValue1] = useState([0, 10000000]);
    const [startTime, setStartTime] = useState('');
    const [sessionType, setSessionType] = useState('session');
    const [isChecked, setIsChecked] = useState(false);
    const [sessionDescription, setSessionDescription] = useState("");
    const [keyValues, setKeyValues] = useState("");
    const [sessionTypeValues, setSessionTypeValues] = useState('');
    const navigate = useNavigate();

    const handleStartTime = (event) => {
        const newStartTime = event.target.value;
        setStartTime(newStartTime);
    };


    const handleSessionDescriptionChange = (event) => {
        setSessionDescription(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const handleSessionType = (event) => {
        const selectedValue = event.target.value;
        setSessionTypeValues(selectedValue);
        console.log(selectedValue);
    };

    const handleSubmitProject = (event) => {
        event.preventDefault();

        createNewMeeting(sessionType, sessionDescription,sessionTypeValues).then(
            navigate('/home')
        );
    };
    console.log(sessionTypeValues);



    useEffect(() => {
        getKeyValues()
            .then(res => {
                setKeyValues(res.data);

            })
            .catch(reason => {
                console.error("use mock example :)")
            })
    }, []);
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
                            labelId='sessionType'
                            id='sessionType'
                            required
                            displayEmpty
                            inputProps={{'aria-label': 'Without label'}}
                            value={sessionTypeValues}
                            onChange={handleSessionType}>
                            <MenuItem value={0} disabled>
                                Wybierz typ spotkania
                            </MenuItem>
                            {keyValues?.sessionType && keyValues.sessionType.map((element) => (
                                <MenuItem key={element.key} value={element.key}>
                                    {' '}
                                    {element.value}
                                </MenuItem>
                            ))}
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
                    <FormLabel id='rent-form__field' className='field__label'>
                        Opisz sesje
                    </FormLabel>
                    <TextareaAutosize
                        minRows={3} // Minimalna liczba widocznych wierszy (możesz dostosować)
                        name='session-description'
                        required
                        fullWidth
                        id='session-description'
                        placeholder='Opisz swoją sesję...'
                        value={sessionDescription}
                        onChange={handleSessionDescriptionChange}
                    />
                </Grid>


                <Grid item xs={12} md={6}>
                    <Grid>
                        <FormLabel id='start-data' className='field__label'>
                            Poniedziałek
                            <Checkbox checked={isChecked} onChange={handleCheckboxChange}/>
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
                            <Checkbox checked={isChecked} onChange={handleCheckboxChange}/>
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
                Dodaj test
            </CustomButton>

        </AppLayout>
    );
};

export default SessionPlanCreatorView;
