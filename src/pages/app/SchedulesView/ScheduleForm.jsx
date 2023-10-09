// Libraries
import React, {useState} from 'react';
import {
	FormLabel,
	TextField,
	Grid,
	FormControl,
	Select,
	MenuItem,
} from '@mui/material';
// Components
import CustomButton, {buttonTypes} from '../../../component/CustomButton';
import Input from '../../../component/Input';

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

const ScheduleForm = () => {
	const [currentState, setCurrentState] = useState(INITIAL_STATE);

	const upadateStateHandler = (name, value) => {
		setCurrentState({...currentState, [name]: value});
	};

	const submitHandler = (e) => {
		e.preventDefault();
	};

	return (
		<section>
			<h2 className='app__title'>Dodaj nowy harmonogram</h2>
			<form onSubmit={submitHandler}>
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
					label='Długość przerwy w minutach'
					// required={true}
					value={currentState.name.value}
					errorMessage={currentState.name.errorMessage}
					valueChangeHandler={upadateStateHandler}
				/>
				<FormControl fullWidth>
					<Select
						labelId='localization'
						id='localization__field'
						required
						displayEmpty
						inputProps={{'aria-label': 'Without label'}}
						// value={props.projectLocalization}
						// onChange={props.handleProjectLocalization}
            >
						<MenuItem value={0} disabled>
							Jednostka czasu przerwy
						</MenuItem>
						<MenuItem value={'minutes'}>minut</MenuItem>
						<MenuItem value={'hours'}>godzin</MenuItem>
					</Select>
				</FormControl>
				<Input
					id='planned'
					name='planned'
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
				<CustomButton as={buttonTypes.submit}>Zatwierdź</CustomButton>
			</form>
		</section>
	);
};

export default ScheduleForm;
