// Librares
import React from 'react';
// Components
import AppLayout from '../../../component/AppLayout';
import Table from '../../../component/Table/Table';
import HeroHeader from '../../../component/HeroHeader';
import {TextField, MenuItem} from '@mui/material';
// Images
import investors from '../../../assets/img/galaxy.png';

const Raports = () => {
	return (
		<AppLayout>
			<HeroHeader title='Raporty' image={<img src={investors} alt='mentors' />} />
			<div className='mentor-filters'>
				<TextField id='title' select label='Temat' defaultValue={1}>
					<MenuItem value={1}>Wszystkie</MenuItem>
				</TextField>
				<TextField id='status' select label='Status' defaultValue={1}>
					<MenuItem value={1}>Wszystkie</MenuItem>
				</TextField>
				<TextField id='student' select label='Student' defaultValue={1}>
					<MenuItem value={1}>Wszyscy</MenuItem>
				</TextField>
			</div>
			<Table
				headers={[
					{id: 'h01', value: 'Temat'},
					{id: 'h02', value: 'Data'},
					{id: 'h03', value: 'Status'},
					{id: 'h04', value: 'Organizator'},
					{id: 'h05', value: 'Uczestnik'},
					{id: 'h06', value: 'Telefon'},
				]}
				data={[
					{
						id: 'd01',
						dataRow: [
							{id: 'd01t01', value: 'Testowy temat'},
							{id: 'd01t02', value: new Date().toLocaleString()},
							{id: 'd01t03', value: 'W oczekiwaniu', type: 'waiting'},
							{id: 'd01t04', value: 'Jan Kowalski'},
							{id: 'd01t05', value: 'Tester Testowicz'},
							{id: 'd01t06', value: '+48123123123'},
						],
					},
					{
						id: 'd02',
						dataRow: [
							{id: 'd01t01', value: 'Testowy temat'},
							{id: 'd01t02', value: new Date().toLocaleString()},
							{id: 'd01t03', value: 'Potwierdzone', type: 'accepted'},
							{id: 'd01t04', value: 'Jan Kowalski'},
							{id: 'd01t05', value: 'Tester Testowicz'},
							{id: 'd01t06', value: '+48123123123'},
						],
					},
					{
						id: 'd03',
						dataRow: [
							{id: 'd01t01', value: 'Testowy temat'},
							{id: 'd01t02', value: new Date().toLocaleString()},
							{id: 'd01t03', value: 'Odrzucone', type: 'rejected'},
							{id: 'd01t04', value: 'Jan Kowalski'},
							{id: 'd01t05', value: 'Tester Testowicz'},
							{id: 'd01t06', value: '+48123123123'},
						],
					},
				]}
			/>
		</AppLayout>
	);
};

export default Raports;
