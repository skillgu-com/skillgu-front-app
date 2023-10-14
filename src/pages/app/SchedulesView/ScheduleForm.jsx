// Libraries
import React, {useState} from 'react';
import {FormLabel, TextField, Grid, Box, Tabs, Tab} from '@mui/material';
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
	email: {
		value: '',
		errorMessage: '',
		isValid: undefined,
	},
	phone: {
		value: '',
		errorMessage: '',
		isValid: undefined,
	},
	company: {
		value: '',
		errorMessage: '',
		isValid: undefined,
	},
	message: {
		value: '',
		errorMessage: '',
		isValid: undefined,
	},
	policy: {
		value: false,
		errorMessage: '',
		isValid: undefined,
	},
};

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
				<Box sx={{width: '100%'}} marginTop={4}>
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
						<Input
							id='name'
							name='name'
							type='text'
							placeholder='Mój harmonogram'
							label='Nazwa harmonogramu'
							required={true}
							value={currentState.name.value}
							errorMessage={currentState.name.errorMessage}
							valueChangeHandler={upadateStateHandler}
						/>
						<Input
							id='break'
							name='break'
							type='number'
							placeholder='15'
							label='Długość przerwy'
							// required={true}
							value={currentState.name.value}
							errorMessage={currentState.name.errorMessage}
							valueChangeHandler={upadateStateHandler}
						/>
						<Input
							id='break'
							name='break'
							type='number'
							placeholder='15'
							label='Spotaknie może być zaplanowane nie wcześniej niż'
							// required={true}
							value={currentState.name.value}
							errorMessage={currentState.name.errorMessage}
							valueChangeHandler={upadateStateHandler}
						/>
						<Input
							id='limit'
							name='limit'
							type='number'
							placeholder='Pozostaw puste jeżeli chcesz zdjąć ograniczenia'
							label='Limit dziennych spotkań'
							// required={true}
							value={currentState.name.value}
							errorMessage={currentState.name.errorMessage}
							valueChangeHandler={upadateStateHandler}
						/>
						<h3 className='app__title'>Harmonogram obowiązuje</h3>
						<div className='schedule-form__inline'>
							<Grid item xs={12} md={6}>
								<FormLabel id='start-data' className='field__label'>
									Od
								</FormLabel>
								<TextField
									autoComplete='given-name'
									name='start-data'
									required
									fullWidth
									id='start-data'
									placeholder='12.02.2022'
									type={'date'}
									autoFocus
									// value={}
									// onChange={props.handleStartDate}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FormLabel id='start-data' className='field__label'>
									Do
								</FormLabel>
								<TextField
									autoComplete='given-name'
									name='start-data'
									required
									fullWidth
									id='start-data'
									placeholder='12.02.2022'
									type={'date'}
									autoFocus
									// value={}
									// onChange={props.handleStartDate}
								/>
							</Grid>
						</div>
					</TabPanel>
					<TabPanel value={value} index={1}>
						<Hours
							id='limit'
							name='limit'
							placeholder='Pozostaw puste jeżeli chcesz zdjąć ograniczenia'
							label='Poniedziałek'
							value={currentState.name.value}
							errorMessage={currentState.name.errorMessage}
							valueChangeHandler={upadateStateHandler}
						/>
					</TabPanel>
				</Box>

				<CustomButton as={buttonTypes.submit}>Zatwierdź</CustomButton>
			</form>
		</section>
	);
};

export default ScheduleForm;
