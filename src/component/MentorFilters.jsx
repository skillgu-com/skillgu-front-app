import React from 'react';
import {TextField, MenuItem, InputBase, IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const MentorFilters = () => {
	return (
		<div className='mentor-filters'>
			<div className='mentor-filters__search'>
				<InputBase
					sx={{ml: 1, flex: 1}}
					placeholder='Szukaj po nazwie'
					inputProps={{'aria-label': 'search google maps'}}
				/>
				<IconButton type='button' sx={{p: '10px'}} aria-label='search'>
					<SearchIcon />
				</IconButton>
			</div>
			<TextField
				id='sort'
				select
				label='Sortowanie'
				defaultValue={1}
				className='mentor-filters__sort'>
				<MenuItem value={1}>Domyślne</MenuItem>
			</TextField>
			<TextField id='category' select label='Kategoria' defaultValue={1}>
				<MenuItem value={1}>Wszystkie</MenuItem>
			</TextField>
			<TextField id='skills' select label='Umiejętności' defaultValue={1}>
				<MenuItem value={1}>Wszystkie</MenuItem>
			</TextField>
			<TextField id='lessons' select label='Lekcje' defaultValue={1}>
				<MenuItem value={1}>Wszystkie</MenuItem>
			</TextField>
			<TextField id='services' select label='Usługi' defaultValue={1}>
				<MenuItem value={1}>Wszystkie</MenuItem>
			</TextField>
			<TextField id='price' select label='Cena' defaultValue={1}>
				<MenuItem value={1}>0 - 200 zł</MenuItem>
			</TextField>
		</div>
	);
};

export default MentorFilters;
