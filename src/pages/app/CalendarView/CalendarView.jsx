import AppLayout from '../../../component/AppLayout';
import {useContext} from 'react';
import {AuthContext} from '../../../context/AuthContextProvider';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import Modal from '../../../component/Modal';
import MeetDetails from './containers/MeetDetails';

const localizer = momentLocalizer(moment);
const CalendarView = () => {
	// const {user} = useContext(AuthContext);
	// console.log(user);
	// console.log('Uzytkownik po autentykacji: ', user.firstName);

	return (
		<AppLayout fluid>
			<>
				<div>
					<h1>Kalendarz</h1>
				</div>
				<div className='calendar-wrapper'>
					<Calendar
						localizer={localizer}
						events={[
							{
								id: 0,
								title: 'Call z Jackiem',
								allDay: true,
								start: new Date(),
								end: new Date(),
							},
							{
								id: 1,
								title: 'Call z Janem',
								allDay: true,
								start: new Date(),
								end: new Date(),
							},
							{
								id: 2,
								title: 'Call z grupą B',
								allDay: true,
								start: new Date(),
								end: new Date(),
							},
						]}
						startAccessor='start'
						endAccessor='end'
						style={{height: 500}}
						components={{
							eventWrapper: ({event}) => (
								<Modal buttonClasses='rbc-event rbc-event-allday' trigger={event.title}>
									<MeetDetails
										title={event.title}
										startDate={event.start}
										endDate={event.end}
										email={'test@test.pl'}
										phone={'123123123'}
										participants={['Jan Kowalski', 'Kowalski Jan']}
									/>
								</Modal>
							),
						}}
					/>
				</div>
			</>
		</AppLayout>
	);
};

export default CalendarView;
