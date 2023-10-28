import React, {useEffect, useState} from 'react';
import {FormControl, FormLabel, Grid, MenuItem, Select, TextField} from '@mui/material';
import CustomButton, {buttonColors, buttonTypes} from '../../../../component/CustomButton';
import AppLayout from "../../../../component/AppLayout";
import HeroHeader from "../../../../component/HeroHeader";
import {createNewSessionMeeting, getScheduleNames} from "../../../../services/MeetingCreatorService";
import {useNavigate} from "react-router-dom";
import forest from "../../../../assets/img/forest.png";
import {getKeyValues} from "../../../../services/KeyValuesService";


const SessionPlanCreatorView = (props) => {
    const [sessionDescription, setSessionDescription] = useState("");
    const [keyValues, setKeyValues] = useState("");
    const [sessionTypeValues, setSessionTypeValues] = useState('');
    const [sessionPrice, setSessionPrice] = useState('');
    const [scheduleNames, setScheduleNames] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState('');
    const navigate = useNavigate();


    const handleSessionDescription = (event) => {
        setSessionDescription(event.target.value);
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
        setSelectedSchedule(selectedValue);
    };

    useEffect(() => {
        getScheduleNames().then(res => {
            setScheduleNames(res.data);
        })
    }, []);

    useEffect(() => {
        getKeyValues()
            .then(res => {
                setKeyValues(res.data);

            })
            .catch(reason => {
                console.error("use mock example :)")
            })
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        createNewSessionMeeting(sessionDescription,sessionTypeValues,sessionPrice,selectedSchedule).then(
            navigate('/home')
        );
    };


    return (
        <AppLayout>
            <HeroHeader
                title='Twoje dane osobowe'
                image={<img src={forest} alt='las'/>}
            />
            <form className='schedule-form' onSubmit={handleSubmit}>
                <hr className='line-separator'/>
                <h3 className='app__title'>Stwórz sesję</h3>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id='name' className='field__label'>
                            Podaj nazwę sesji
                        </FormLabel>
                        <TextField
                            autoComplete='sessionName'
                            name='sessionName'
                            required
                            fullWidth
                            id='name'
                            placeholder='Nazwa sesji'
                            autoFocus
                            // value={userSettingState.firstName.value}
                            // onChange={changeFirstName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id='lastName' className='field__label'>
                            Podaj cenę za sesję
                        </FormLabel>
                        <TextField
                            autoComplete='sessionPrice'
                            name='sessionPrice'
                            required
                            fullWidth
                            id='sessionPrice'
                            placeholder='Cena za sesję'
                            autoFocus
                            value={sessionPrice}
                            onChange={handleSessionPrice}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id='newEmail' className='field__label'>
                            Wybierz typ spotkania
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
                    <Grid item xs={12} sm={6}>
                        <FormLabel id='newEmail' className='field__label'>
                            Wybierz harmonogram spotkań
                        </FormLabel>
                        <FormControl fullWidth>
                            <Select
                                labelId='sessionType'
                                id='sessionType'
                                required
                                displayEmpty
                                inputProps={{'aria-label': 'Without label'}}
                                value={selectedSchedule}
                                onChange={handleScheduleNames}>
                                <MenuItem value={0} disabled>
                                    Wybierz harmonogram
                                </MenuItem>
                                {scheduleNames.map((element, index) => (
                                    <MenuItem key={index} value={element}>
                                        {element}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormLabel id="about" className="field__label">
                            Opisz sesję
                        </FormLabel>
                        <TextField
                            autoComplete="about"
                            name="about"
                            required
                            fullWidth
                            id="about"
                            placeholder="Podaj dokladny opis sesji"
                            multiline
                            rows={2}
                            autoFocus
                            value={sessionDescription}
                            onChange={handleSessionDescription}
                        />
                    </Grid>
                </Grid>

                <Grid container justifyContent='flex-end' className='app-settings__btns'>
                    <CustomButton as={buttonTypes.button} color={buttonColors.transparent}>
                        Anuluj
                    </CustomButton>
                    <CustomButton as={buttonTypes.submit} color={buttonColors.primary}>
                        Zapisz sesję
                    </CustomButton>
                </Grid>
            </form>
        </AppLayout>
    );
};


export default SessionPlanCreatorView;
