// Libraries
import React, {useState} from 'react';
import {Box, Tabs, Tab} from '@mui/material';
// Components
import CustomButton, {buttonTypes} from '../../../component/CustomButton';
import Input from '../../../component/Input';
import Hours from './Hours';

const INITIAL_STATE = {
	name: {
		value: '',
		errorMessage: '',
		isValid: undefined,
	},
	meetTime: {
		value: 45,
		errorMessage: '',
		isValid: undefined,
	},
	break: {
		value: 0,
		errorMessage: '',
		isValid: undefined,
	},
	planned: {
		value: '',
		errorMessage: '',
		isValid: undefined,
	},
	limit: {
		value: '',
		errorMessage: '',
		isValid: undefined,
	},
	start: {
		value: '',
		errorMessage: '',
		isValid: undefined,
	},
	end: {
		value: '',
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
};

const inputs = [
	{
		id: 'name',
		name: 'name',
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
		required: true,
		step: '5',
		min: 15,
	},
	{
		id: 'break',
		name: 'break',
		type: 'number',
		label: 'Długość przerwy',
		placeholder: '15',
		required: true,
		step: '15',
		min: 0,
	},
	{
		id: 'planned',
		name: 'planned',
		type: 'number',
		label: 'Spotaknie może być zaplanowane nie wcześniej niż',
		placeholder: 'Pozostaw puste jeżeli chcesz zdjąć ograniczenia',
		required: false,
	},
	{
		id: 'limit',
		name: 'limit',
		type: 'number',
		label: 'Limit dziennych spotkań',
		placeholder: 'Pozostaw puste jeżeli chcesz zdjąć ograniczenia',
		required: false,
	},
	{
		id: 'start',
		name: 'start',
		type: 'date',
		label: 'Rozpoczęcie harmonogramu',
		required: true,
	},
	{
		id: 'end',
		name: 'end',
		type: 'date',
		label: 'Zakończenie harmonogramu',
		required: true,
	},
];

const inputsHours = [
	{id: 'timeMonday', name: 'timeMonday', label: 'Poniedziałek'},
	{id: 'timeTuesday', name: 'timeTuesday', label: 'Wtorek'},
	{id: 'timeWednesday', name: 'timeWednesday', label: 'Środa'},
	{id: 'timeThursday', name: 'timeThursday', label: 'Czwartek'},
	{id: 'timeFriday', name: 'timeFriday', label: 'Piątek'},
	{id: 'timeSaturday', name: 'timeSaturday', label: 'Sobota'},
	{id: 'timeSunday', name: 'timeSunday', label: 'Niedziela'},
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

	const handleChange = (_event, newValue) => {
		setValue(newValue);
	};

	const upadateStateHandler = (name, value) => {
		setCurrentState({...currentState, [name]: value});
	};

	const submitHandler = (e) => {
		e.preventDefault();
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
						{inputs.map((input) => (
							<Input
								{...input}
								value={currentState[input.name].value}
								errorMessage={currentState[input.name].errorMessage}
								valueChangeHandler={upadateStateHandler}
							/>
						))}
					</TabPanel>
					<TabPanel value={value} index={1}>
						{inputsHours.map((input) => (
							<Hours
								{...input}
								value={currentState[input.name].value}
								errorMessage={currentState[input.name].errorMessage}
								valueChangeHandler={upadateStateHandler}
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
