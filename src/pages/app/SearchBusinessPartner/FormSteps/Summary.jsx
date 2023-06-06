import React from 'react';
import TextField from '@mui/material/TextField';
import {FormControl, FormGroup, FormLabel, Grid, MenuItem, Select} from '@mui/material';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const Summary = (props) => {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<FormLabel id='personal-data' className='field__label'>
					Telefon
				</FormLabel>
				<TextField
					autoComplete='given-name'
					name='personal-data'
					required
					fullWidth
					id='personal-data'
					placeholder='+48 123 456 789'
					autoFocus
					value={props.phoneNumber}
					onChange={props.handlePhoneNumber}
				/>
			</Grid>
			<Grid item xs={12}>
				<FormLabel id='position' className='field__label'>
					E-mail
				</FormLabel>
				<TextField
					autoComplete='given-name'
					name='position'
					required
					fullWidth
					id='position'
					placeholder='email@email.com'
					autoFocus
					value={props.email}
					onChange={props.handleEmail}
				/>
			</Grid>
			<Grid item xs={12} >
				<FormLabel id='time__field' className='field__label'>
					Jak dopasowane oferty chcesz dostawać
				</FormLabel>
				<FormControl fullWidth>
					<Select
						labelId='time'
						id='time__field'
						required
						displayEmpty
						inputProps={{'aria-label': 'Without label'}}
						value={props.paybackTime}
						onChange={props.handlePaybackTime}>
						<MenuItem value={0} disabled>
							Jak procentowo dopasowane oferty maja do ciebie trafiac
						</MenuItem>
						<MenuItem value={1}>10 %</MenuItem>
						<MenuItem value={2}>20 %</MenuItem>
						<MenuItem value={3}>30 %</MenuItem>
						<MenuItem value={4}>40 %</MenuItem>
						<MenuItem value={5}>50 %</MenuItem>
						<MenuItem value={6}>60 %</MenuItem>
						<MenuItem value={7}>70 %</MenuItem>
						<MenuItem value={8}>80 %</MenuItem>
						<MenuItem value={9}>90 %</MenuItem>
						<MenuItem value={10}>100 %</MenuItem>
					</Select>
				</FormControl>
			</Grid>

			<Grid item xs={12} >
				<FormLabel id='time__field' className='field__label'>
					Forma powiadomień o nowych inwestycjach
				</FormLabel>
				<FormGroup>
					<FormControlLabel control={<Checkbox defaultUncheked />} label="EMAIL" />
					<FormControlLabel control={<Checkbox defaultUncheked />} label="SMS" />
					<FormControlLabel control={<Checkbox defaultUncheked />} label="WIADOMOŚCI W APLIKACJI" />
					{/*<FormControlLabel disabled control={<Checkbox />} label="Disabled" />*/}
				</FormGroup>
			</Grid>
		</Grid>

	);
};

export default Summary;
