import AppLayout from "../../../component/AppLayout";
import CustomButton, {buttonColors, buttonTypes} from "../../../component/CustomButton";
import {FormControl, FormLabel, Grid, MenuItem, Select, TextField} from '@mui/material';
import HeroHeader from "../../../component/HeroHeader";
import {createSession} from "../../../services/SessionService";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchAllSchedules} from "../../../services/ScheduleService";


const CreateSingleSession = (props) => {
    const [sessionTypes, setSessionTypes] = useState([]);
    // const [sessionTypeValues, setSessionTypeValues] = useState(1);
    const [scheduleNames, setScheduleNames] = useState([]);
    // const [selectedSchedule, setSelectedSchedule] = useState('');


    const [sessionName, setSessionName] = useState('');
    const [sessionPrice, setSessionPrice] = useState(0);
    const [sessionID, setSessionID] = useState(0);
    const [scheduleID, setScheduleID] = useState(0);
    const [sessionDescription, setSessionDescription] = useState('');
    const navigate = useNavigate();

    const handleSessionName = (event) => {
        const sessionName = event.target.value;
        setSessionName(sessionName);
    };

    const handleSessionDescription = (event) => {
        setSessionDescription(event.target.value);
    };

    const handleSessionType = (event) => {
        const selectedValue = event.target.value;
        setSessionID(selectedValue);
    };

    const handleSessionPrice = (event) => {
        const newSessionPrice = event.target.value;
        setSessionPrice(newSessionPrice);
    };
    const handleScheduleType = (event) => {
        const selectedValue = event.target.value;
        setScheduleID(selectedValue);
    };

    useEffect(() => {
        fetchAllSchedules().then(res => {
            setScheduleNames(res.data);
        })
    }, []);



    const handleSubmit = (event) => {
        event.preventDefault();
        createSession(sessionName, sessionPrice, sessionID, scheduleID,sessionDescription).then(
            navigate('/home')
        );
    };

    return (
        <AppLayout>
            <HeroHeader
                title='Twoje dane osobowe'
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
                            value={sessionName}
                            onChange={handleSessionName}
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
                                value={sessionID}
                                onChange={handleSessionType}>
                                <MenuItem value="" disabled>
                                    Wybierz typ spotkania
                                </MenuItem>
                                {sessionTypes?.map((element) => (
                                    <MenuItem key={element.id} value={element.id}>
                                        {element.name}
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
                                value={scheduleID}
                                onChange={handleScheduleType}>
                                <MenuItem value="" disabled>
                                    Wybierz harmonogram
                                </MenuItem>
                                {scheduleNames?.map((element) => (
                                    <MenuItem key={element.id} value={element.id}>
                                        {element.name}
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


export default CreateSingleSession;
