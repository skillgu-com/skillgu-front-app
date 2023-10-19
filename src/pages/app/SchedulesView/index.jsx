// Librares
import React, {useEffect, useState} from 'react';
// Components
import AppLayout from '../../../component/AppLayout';
import HeroHeader from '../../../component/HeroHeader';
import Table from '../../../component/Table/Table';
import ScheduleForm from './ScheduleForm';
// Images
import homeBg from '../../../assets/img/landscape.jpg';
import {getAllSchedulesMeeting} from "../../../services/MeetingCreatorService";

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
				{id: 'd01t02', value: new Date().toLocaleString()},
				{id: 'd01t06', value: '+48123123123'},
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

	console.log(schedules);


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
