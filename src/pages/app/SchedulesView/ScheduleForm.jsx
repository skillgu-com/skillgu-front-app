// Libraries
import React, {useEffect, useState} from 'react';
import {FormLabel, TextField, Grid, Box, Tabs, Tab, FormControlLabel, Switch} from '@mui/material';
// Components
import CustomButton, {buttonTypes} from '../../../component/CustomButton';
import Input from '../../../component/Input';
import Hours from './Hours';
import {createScheduleMeeting, getAllSchedulesMeeting} from "../../../services/MeetingCreatorService";
import {getUserProfile} from "../../../services/UserProfileService";

const INITIAL_STATE = {

    meetTime: {
        value: 45,
        errorMessage: '',
        isValid: undefined,
    },
    timeMonday: {
        value: '',
        errorMessage: '',
        isValid: undefined,
    },
    timeTuesday: {
        value: '',
        errorMessage: '',
        isValid: undefined,
    },
    timeWednesday: {
        value: '',
        errorMessage: '',
        isValid: undefined,
    },
    timeThursday: {
        value: '',
        errorMessage: '',
        isValid: undefined,
    },
    timeFriday: {
        value: '',
        errorMessage: '',
        isValid: undefined,
    },
    timeSaturday: {
        value: '',
        errorMessage: '',
        isValid: undefined,
    },
    timeSunday: {
        value: '',
        errorMessage: '',
        isValid: undefined,
    },
    scheduleName: {
        value: '',
        errorMessage: '',
        isValid: undefined,
    },
    meetingBreakDuration: {
        value: '',
        errorMessage: '',
        isValid: undefined,
    },
    participant: {
        value: '',
        errorMessage: '',
        isValid: undefined,
    },
    meetingLimit: {
        value: '',
        errorMessage: '',
        isValid: undefined,
    },
    cancelingClasses: {
        value: false,
        errorMessage: '',
        isValid: undefined,
    },
    scheduleStartDay: {
        value: '',
        errorMessage: '',
        isValid: undefined,
    },
    scheduleEndDay: {
        value: '',
        errorMessage: '',
        isValid: undefined,
    },
};

const inputs = [
    {
        id: 'scheduleName',
        name: 'scheduleName',
        type: 'text',
        placeholder: 'Mój harmonogram',
        label: 'Nazwa harmonogramu',
        required: true,
    },
    {
        id: 'meetTime',
        name: 'meetTime',
        type: 'number',
        label: 'Długość spotkania',
        placeholder: 'Podaj długość spotkania, nie krócej niż 15 minut',
        required: true,
        step: '5',
        min: 15,
    },
    {
        id: 'meetingBreakDuration',
        name: 'meetingBreakDuration',
        type: 'number',
        label: 'Długość przerwy',
        placeholder: '15',
        required: true,
        step: '15',
        min: 0,
    },
    {
        id: 'participant',
        name: 'participant',
        type: 'number',
        label: 'Ilość uczestników',
        placeholder: 'Podaj maksymalną ilość osób na spotkaniu',
        required: false,
        step: '1',
        min: 1,
        max: 3,
    },
    {
        id: 'meetingLimit',
        name: 'meetingLimit',
        type: 'number',
        label: 'Limit dziennych spotkań',
        placeholder: 'Pozostaw puste jeżeli chcesz zdjąć ograniczenia',
        required: false,
    },
    {
        id: 'scheduleStartDay',
        name: 'scheduleStartDay',
        type: 'date',
        label: 'Rozpoczęcie harmonogramu',
        required: true,
    },
    {
        id: 'scheduleEndDay',
        name: 'scheduleEndDay',
        type: 'date',
        label: 'Zakończenie harmonogramu',
        required: true,
    },
];

const inputsHours = [
    {
        id: 'timeMonday',
        name: 'timeMonday',
        type: 'text',
        label: 'Poniedziałek'
    },
    {
        id: 'timeTuesday',
        name: 'timeTuesday',
        label: 'Wtorek'
    },
    {
        id: 'timeWednesday',
        name: 'timeWednesday',
        label: 'Środa'
    },
    {
        id: 'timeThursday',
        name: 'timeThursday',
        label: 'Czwartek'
    },
    {
        id: 'timeFriday',
        name: 'timeFriday',
        label: 'Piątek'
    },
    {
        id: 'timeSaturday',
        name: 'timeSaturday',
        label: 'Sobota'
    },
    {
        id: 'timeSunday',
        name: 'timeSunday',
        label: 'Niedziela'
    },
];

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && <Box sx={{p: 3}}>{children}</Box>}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ScheduleForm = () => {
    const [currentState, setCurrentState] = useState(INITIAL_STATE);
    const [value, setValue] = useState(0);
    const [isChecked, setIsChecked] = useState(false);
    const [schedules, setSchedules] = useState({});


    const handleChange = (_event, newValue) => {
        setValue(newValue);
    };

    const updateStateHandler = (name, value) => {
        // console.log(value.value)
        setCurrentState({...currentState, [name]: value});
    };

    const updateStateHandler2 = (name, value) => {
        console.log('test')
        setCurrentState({...currentState, [name]: value});
    };




    const submitHandler = (e) => {
        e.preventDefault();
        createScheduleMeeting(currentState);
    };

    //
    return (
        <section>
            <h2 className='app__title'>Dodaj nowy harmonogram</h2>

            <form className='schedule-form' onSubmit={submitHandler}>
                <Box sx={{width: '100%'}}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label='basic tabs example'>
                            <Tab label='Harmonogram' {...a11yProps(2)} />
                            <Tab label='Dostępność' {...a11yProps(3)} />
                        </Tabs>
                    </Box>

                    <TabPanel value={value} index={0}>
                        <div className='schedule-form__schedule'>
                            {inputs.map((input) => (
                                <Input
                                    key={input.id}
                                    {...input}
                                    value={currentState[input.name].value}
                                    // errorMessage={currentState[input.name].errorMessage}
                                    valueChangeHandler={updateStateHandler}
                                />
                            ))}
                        </div>
                        <div>
                            <FormLabel id='start-data' className='field__label'>
                                Odwoływanie zajęć
                            </FormLabel>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={currentState.cancelingClasses.value}
                                        onChange={(event) => {
                                            updateStateHandler('cancelingClasses', {value: event.target.checked});
                                        }}
                                        name='cancelingClasses'
                                    />
                                }
                                label='wył/wł'
                            />
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {inputsHours.map((input) => (
                            <Hours
                                key={input.id}
                                {...input}
                                value={currentState[input.name].value}
                                // errorMessage={currentState[input.name].errorMessage}
                                valueChangeHandler={updateStateHandler2}
                            />
                        ))}
                    </TabPanel>
                </Box>
                <CustomButton as={buttonTypes.submit}>Zatwierdź</CustomButton>
            </form>
        </section>
    );
};

export default ScheduleForm;
