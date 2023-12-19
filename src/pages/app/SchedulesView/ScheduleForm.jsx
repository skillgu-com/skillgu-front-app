// Libraries
import React, {useEffect, useState} from 'react';
import {
    FormLabel,
    TextField,
    Grid,
    Box,
    Tabs,
    Tab,
    FormControlLabel,
    Switch,
} from '@mui/material';
// Components
import CustomButton, {buttonTypes} from '../../../component/CustomButton';
import Input from '../../../component/Input';
import Hours from './Hours';
import {} from '../../../services/MeetingCreatorService';
import {useNavigate} from "react-router-dom";
import {createScheduleMeeting} from "../../../services/ScheduleService";

const INITIAL_STATE = {
    meetTime: {
        value: 45,
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
    Monday: {
        value: {
            isActive: false,
            times: {
                0: {
                    from: {value: '07:00', errorMessage: '', isValid: undefined},
                    to: {value: '16:00', errorMessage: '', isValid: undefined},
                },
            },
        },
        errorMessage: '',
        isValid: undefined,
    },
    Tuesday: {
        value: {
            isActive: false,
            times: {
                0: {
                    from: {value: '07:00', errorMessage: '', isValid: undefined},
                    to: {value: '16:00', errorMessage: '', isValid: undefined},
                },
            },
        },
        errorMessage: '',
        isValid: undefined,
    },
    Wednesday: {
        value: {
            isActive: false,
            times: {
                0: {
                    from: {value: '07:00', errorMessage: '', isValid: undefined},
                    to: {value: '16:00', errorMessage: '', isValid: undefined},
                },
            },
        },
        errorMessage: '',
        isValid: undefined,
    },
    Thursday: {
        value: {
            isActive: false,
            times: {
                0: {
                    from: {value: '07:00', errorMessage: '', isValid: undefined},
                    to: {value: '16:00', errorMessage: '', isValid: undefined},
                },
            },
        },
        errorMessage: '',
        isValid: undefined,
    },
    Friday: {
        value: {
            isActive: false,
            times: {
                0: {
                    from: {value: '07:00', errorMessage: '', isValid: undefined},
                    to: {value: '16:00', errorMessage: '', isValid: undefined},
                },
            },
        },
        errorMessage: '',
        isValid: undefined,
    },
    Saturday: {
        value: {
            isActive: false,
            times: {
                0: {
                    from: {value: '07:00', errorMessage: '', isValid: undefined},
                    to: {value: '16:00', errorMessage: '', isValid: undefined},
                },
            },
        },
        errorMessage: '',
        isValid: undefined,
    },
    Sunday: {
        value: {
            isActive: false,
            times: {
                0: {
                    from: {value: '07:00', errorMessage: '', isValid: undefined},
                    to: {value: '16:00', errorMessage: '', isValid: undefined},
                },
            },
        },
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
        label: 'Długość spotkania ',
        placeholder: 'Podaj długość spotkania, nie krócej niż 15 minut',
        required: true,
        step: '30',
        min: 30,
    },
    // {
    // 	id: 'meetingBreakDuration',
    // 	name: 'meetingBreakDuration',
    // 	type: 'number',
    // 	label: 'Długość przerwy',
    // 	placeholder: '15',
    // 	required: true,
    // 	step: '15',
    // 	min: 0,
    // },
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
    // {
    // 	id: 'meetingLimit',
    // 	name: 'meetingLimit',
    // 	type: 'number',
    // 	label: 'Limit dziennych spotkań',
    // 	placeholder: 'Pozostaw puste jeżeli chcesz zdjąć ograniczenia',
    // 	required: false,
    // },
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
        id: 'Monday',
        name: 'Monday',
        type: 'text',
        label: 'Poniedziałek',
    },
    {
        id: 'Tuesday',
        name: 'Tuesday',
        label: 'Wtorek',
    },
    {
        id: 'Wednesday',
        name: 'Wednesday',
        label: 'Środa',
    },
    {
        id: 'Thursday',
        name: 'Thursday',
        label: 'Czwartek',
    },
    {
        id: 'Friday',
        name: 'Friday',
        label: 'Piątek',
    },
    {
        id: 'Saturday',
        name: 'Saturday',
        label: 'Sobota',
    },
    {
        id: 'Sunday',
        name: 'Sunday',
        label: 'Niedziela',
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
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/home');
    };

    const handleChange = (_event, newValue) => {
        setValue(newValue);
    };

    const updateStateHandler = (name, value) => {
        setCurrentState({...currentState, [name]: value});
    };

    const updateHourStateHandler = (name, value) => {
        setCurrentState({...currentState, [name]: {...currentState[name], value}});
    };

    const getDayHours = (day) => {
        if (!currentState[day].value.isActive) return;

        return Object.keys(currentState[day].value.times).map((index) => ({
            from: currentState[day].value.times[index].from,
            to: currentState[day].value.times[index].to,
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const weekTimes = {
            Monday: getDayHours('Monday'),
            Tuesday: getDayHours('Tuesday'),
            Wednesday: getDayHours('Wednesday'),
            Thursday: getDayHours('Thursday'),
            Friday: getDayHours('Friday'),
            Saturday: getDayHours('Saturday'),
            Sunday: getDayHours('Sunday'),
        };

        createScheduleMeeting(currentState, weekTimes);
    };

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
                                    errorMessage={currentState[input.name].errorMessage}
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
                                            updateStateHandler('cancelingClasses', {
                                                value: event.target.checked,
                                            });
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
                                errorMessage={currentState[input.name].errorMessage}
                                valueChangeHandler={updateHourStateHandler}
                            />
                        ))}
                    </TabPanel>
                </Box>
                <CustomButton as={buttonTypes.submit} onClick={handleButtonClick}>
                    Zatwierdź
                </CustomButton>
            </form>
        </section>
    );
};

export default ScheduleForm;
