import React, {useReducer} from 'react';
import {
	FormLabel,
	TextField,
	Grid,
	FormControlLabel,
	Checkbox,
	TextareaAutosize,
	FormControl,
} from '@mui/material';
import {MuiChipsInput} from 'mui-chips-input';
// Components
import AppLayout from '../../../component/AppLayout';
import HeroHeader from '../../../component/HeroHeader';
import ProfileImage from './ProfileImage';
import CustomButton, {
	buttonTypes,
	buttonColors,
} from '../../../component/CustomButton';

// Images
import forest from '../../../assets/img/forest.png';

const SETTING_ACTIONS = {
	CHANGE_PROFILE: 'CHANGE_PROFILE',
	CHANGE_INDUSTRY: 'CHANGE_INDUSTRY',
	CHANGE_HOBBY: 'CHANGE_HOBBY',
};

const initialState = {
	profileImage:
		'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
};

const reducer = (state, action) => {
	switch (action.type) {
		case SETTING_ACTIONS.CHANGE_PROFILE:
			return {...state, profileImage: action.payload};
		case SETTING_ACTIONS.CHANGE_INDUSTRY:
			return {...state, industry: action.payload};
		case SETTING_ACTIONS.CHANGE_HOBBY:
			return {...state, hobby: action.payload};
		default:
			return state;
	}
};

const Settings = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const setImage = (value) =>
		dispatch({type: SETTING_ACTIONS.CHANGE_PROFILE, payload: value});

	const changeIndustry = (value) =>
		dispatch({type: SETTING_ACTIONS.CHANGE_INDUSTRY, payload: value});

	const changeHobby = (value) =>
		dispatch({type: SETTING_ACTIONS.CHANGE_HOBBY, payload: value});

	// TODO: Add loading default image from API

	return (
		<AppLayout>
			<HeroHeader
				title='Twoje dane osobowe'
				image={<img src={forest} alt='las' />}
			/>
			<form className='app-settings'>
				<h3 className='app__title'>Twoje zdjęcie</h3>
				<ProfileImage src={state.profileImage} changeHandler={setImage} />
				<hr className='line-separator' />
				<h3 className='app__title'>Twoje dane</h3>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<FormLabel id='name' className='field__label'>
							Imię
						</FormLabel>
						<TextField
							autoComplete='name'
							name='name'
							required
							fullWidth
							id='name'
							placeholder='Podaj imię'
							autoFocus
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormLabel id='surname' className='field__label'>
							Nazwisko
						</FormLabel>
						<TextField
							autoComplete='surname'
							name='surname'
							required
							fullWidth
							id='surname'
							placeholder='Podaj nazwisko'
							autoFocus
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormLabel id='email' className='field__label'>
							E-mail
						</FormLabel>
						<TextField
							autoComplete='email'
							name='email'
							required
							fullWidth
							id='email'
							type='email'
							placeholder='Podaj adres e-mail'
							autoFocus
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormLabel id='phone' className='field__label'>
							Numer telefonu
						</FormLabel>
						<TextField
							autoComplete='phone'
							name='phone'
							required
							fullWidth
							id='phone'
							type='tel'
							placeholder='Podaj numer telefonu '
							autoFocus
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormLabel id='position' className='field__label'>
							Stanowisko
						</FormLabel>
						<TextField
							autoComplete='position'
							name='position'
							required
							fullWidth
							id='position'
							placeholder='Wpisz nazwę stanowiska np. CEO'
							autoFocus
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormLabel id='city' className='field__label'>
							Lokalizacja
						</FormLabel>
						<TextField
							autoComplete='city'
							name='city'
							required
							fullWidth
							id='city'
							placeholder='Wpisz miasto'
							autoFocus
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormLabel id='industry' className='field__label'>
							Wybierz Branżę
						</FormLabel>
						<FormControl fullWidth>
							<MuiChipsInput value={state.industry} onChange={changeIndustry} />
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormLabel id='hobby' className='field__label'>
							Twoje zainteresowania
						</FormLabel>
						<FormControl fullWidth>
							<MuiChipsInput value={state.hobby} onChange={changeHobby} />
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<FormControlLabel
							control={<Checkbox lue='isInvestor' color='primary' />}
							label='Chcę być widoczny jako inwestor.'
						/>
					</Grid>
				</Grid>
				<hr className='line-separator' />
				<h3 className='app__title'>Social media</h3>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<FormLabel id='facebook' className='field__label'>
							Facebook
						</FormLabel>
						<TextField
							autoComplete='facebook'
							name='facebook'
							required
							fullWidth
							id='facebook'
							placeholder="Podaj link do Facebook'a"
							autoFocus
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormLabel id='instagram' className='field__label'>
							Instagram
						</FormLabel>
						<TextField
							autoComplete='instagram'
							name='instagram'
							required
							fullWidth
							id='instagram'
							placeholder="Podaj link do Instagram'a"
							autoFocus
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormLabel id='linkedin' className='field__label'>
							LinkedIn
						</FormLabel>
						<TextField
							autoComplete='linkedin'
							name='linkedin'
							required
							fullWidth
							id='linkedin'
							placeholder="Podaj link do LinkedIn'a"
							autoFocus
						/>
					</Grid>
				</Grid>
				<hr className='line-separator' />
				<Grid item xs={12}>
					<FormControlLabel
						control={<Checkbox lue='allowVisibility' color='primary' />}
						label='Ukryj dane przed nieznajomymi.'
					/>
				</Grid>
				<Grid container justifyContent='flex-end' className='app-settings__btns'>
					<CustomButton as={buttonTypes.button} color={buttonColors.transparent}>
						Anuluj
					</CustomButton>
					<CustomButton as={buttonTypes.submit} color={buttonColors.primary}>
						Zapisz zmiany
					</CustomButton>
				</Grid>
			</form>
		</AppLayout>
	);
};

export default Settings;
