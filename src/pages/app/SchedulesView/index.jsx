// Librares
import React, {useEffect, useState} from 'react';
// Components
import AppLayout from '../../../component/AppLayout';
import HeroHeader from '../../../component/HeroHeader';
import Table from '../../../component/Table/Table';
import ScheduleForm from './ScheduleForm';
// Images
import homeBg from '../../../assets/img/landscape.jpg';
import {getAllSchedulesMeeting} from '../../../services/MeetingCreatorService';
import {buttonColors} from '../../../component/CustomButton';

const PLACEHOLDER_TABLE = {
	headers: [
		{id: 'h01', value: 'Nazwa harmonogramu'},
		{id: 'h02', value: 'Edytuj'},
		{id: 'h03', value: 'Usuń'},
	],
	data: [
		{
			id: 'd01',
			dataRow: [
				{id: 'd01t01', value: 'Testowy temat'},
				{
					id: 'd01t02',
					value: 'Edytuj',
					type: 'button',
					buttonProps: {_onClick: () => console.log('Edytuj')},
				},
				{
					id: 'd01t06',
					value: 'Usuń',
					type: 'button',
					buttonProps: {color: 'danger', _onClick: () => console.log('Usuń')},
				},
			],
		},
		{
			id: 'd02',
			dataRow: [
				{id: 'd02t01', value: 'Testowy temat'},
				{
					id: 'd02t02',
					value: 'Edytuj',
					type: 'button',
					buttonProps: {_onClick: () => console.log('Edytuj')},
				},
				{
					id: 'd02t06',
					value: 'Usuń',
					type: 'button',
					buttonProps: {color: 'danger', _onClick: () => console.log('Usuń')},
				},
			],
		},
	],
};

const SchedulesView = () => {
	const [schedules, setSchedules] = useState([]);
	useEffect(() => {
		getAllSchedulesMeeting().then((response) => {
			setSchedules(response.data);
		});
	}, []);

	return (
		<AppLayout>
			<HeroHeader
				title={`Haromonogramy`}
				image={<img src={homeBg} alt='harmonogramy' />}
			/>
			<main className='schedule-view'>
				<section>
					<h2 className='app__title'>Lista harmonogramów</h2>
					<Table {...PLACEHOLDER_TABLE} />
				</section>

				<ScheduleForm />
			</main>
		</AppLayout>
	);
};

export default SchedulesView;
