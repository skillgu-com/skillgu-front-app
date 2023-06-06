import React from 'react';
import TextField from '@mui/material/TextField';
import {FormLabel, Grid, Button} from '@mui/material';
import CustomButton, {buttonColors} from '../../../../component/CustomButton';

const Team = () => {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<FormLabel id='presentation' className='field__label'>
					Zdjęcie
				</FormLabel>
				<Button variant='contained' component='label' className='bg--primary'>
					Upload File
					<input type='file' hidden />
				</Button>
			</Grid>
			<Grid item xs={12}>
				<FormLabel id='personal-data' className='field__label'>
					Imię i Nazwisko
				</FormLabel>
				<TextField
					autoComplete='given-name'
					name='personal-data'
					required
					fullWidth
					id='personal-data'
					placeholder='Jan Kowalski'
					autoFocus
				/>
			</Grid>
			<Grid item xs={12}>
				<FormLabel id='position' className='field__label'>
					Stanowisko
				</FormLabel>
				<TextField
					autoComplete='given-name'
					name='position'
					required
					fullWidth
					id='position'
					placeholder='Programista'
					autoFocus
				/>
			</Grid>
      <CustomButton
				classes='pitchdeck__form-btn'
				color={buttonColors.transparent}
				_onClick={() => null}>
				Dodaj następnego
			</CustomButton>
		</Grid>
	);
};

export default Team;
