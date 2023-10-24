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
import {createNewMeeting, getScheduleNames} from "../../../../services/MeetingCreatorService";
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
    const [timeZone, setTimeZone] = useState('');
    const [sessionDescription, setSessionDescription] = useState("");
    const [keyValues, setKeyValues] = useState("");
    const [sessionTypeValues, setSessionTypeValues] = useState('');
    const [sessionPrice, setSessionPrice] = useState('');
    const [typeOfNotification, setTypeOfNotification] = useState('');
    const [scheduleNames, setScheduleNames] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState('');
    const navigate = useNavigate();

    const handleSubmitProject = (event) => {
        event.preventDefault();
        createNewMeeting(timeZone,sessionDescription,sessionTypeValues,sessionPrice,typeOfNotification,selectedSchedule).then(
            navigate('/home')
        );
    };

    const handleTimeZone = (event) => {
        const timeZone = event.target.value;
        setTimeZone(timeZone);
    };


    const handleSessionDescriptionChange = (event) => {
        setSessionDescription(event.target.value);
    };

    const handleTypeOfNotification = (event) => {
        setTypeOfNotification(event.target.value);
    };


    const handleSessionType = (event) => {
        const selectedValue = event.target.value;
        setSessionTypeValues(selectedValue);
    };

    const handleSessionPrice = (event) => {
        const newSessionPrice = event.target.value;
        setSessionPrice(newSessionPrice);
    };
    const handleScheduleNames = (event) => {
        const selectedValue = event.target.value;
        setSelectedSchedule(selectedValue); // Aktualizuj stan wybranego harmonogramu
    };

    useEffect(()=> {
        getScheduleNames().then(res=> {
            setScheduleNames(res.data);
        })
    },[]);




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
                title='Tworzenie sesji'
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
                            value={timeZone}
                            onChange={handleTimeZone}>
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
                        Cena za sesje
                    </FormLabel>
                    <FormControl fullWidth>
                        <input
                            type="text" // Zmień na "text" lub inny odpowiedni typ inputu
                            id='industry__field'
                            value={sessionPrice}
                            onChange={handleSessionPrice}
                            placeholder="Cena za sesje" // Dodaj opcjonalny atrybut "placeholder"
                            required
                        />
                    </FormControl>
                </Grid>
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
                            value={typeOfNotification}
                            onChange={handleTypeOfNotification}>
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
                    <FormLabel id='localization' className='field__label'>
                        Dodaj harmonogram
                    </FormLabel>
                    <FormControl fullWidth>
                        <Select
                            labelId='sessionType'
                            id='sessionType'
                            required
                            displayEmpty
                            inputProps={{'aria-label': 'Without label'}}
                            value={sessionTypeValues}
                            onChange={handleScheduleNames}>
                            <MenuItem value={0} disabled>
                                Wybierz harmonogram sesji
                            </MenuItem>
                            {scheduleNames.map((element, index) => (
                                <MenuItem key={index} value={element}>
                                    {element}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormLabel id='rent-form__field' className='field__label'>
                        Dodaj opis sesji
                    </FormLabel>
                    <TextareaAutosize
                        minRows={4} // Minimalna liczba widocznych wierszy (możesz dostosować)
                        name='session-description'
                        required
                        fullWidth
                        id='session-description'
                        placeholder='Opisz swoją sesję...'
                        value={sessionDescription}
                        onChange={handleSessionDescriptionChange}
                    />
                </Grid>

            </Grid>
            <CustomButton as={buttonTypes.submit} color={buttonColors.primary} _onClick={handleSubmitProject}>
                Dodaj test
            </CustomButton>

        </AppLayout>
    );
};

export default SessionPlanCreatorView;
