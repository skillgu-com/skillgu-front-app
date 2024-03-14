import React, {ChangeEvent, useMemo, useState} from 'react';
// Components
import Checkbox from '@newComponents/Checkbox/Checkbox';
import Input from '@newComponents/Input/Input';
// Icons
import Add from '@icons/Add';
import Trash from '../icons/Trash';
// Styles
import styles from './WeekTime.module.scss';

interface WeekTime {
	day: string;
}

const WeekTime = (props: WeekTime) => {
	const {day} = props;

	const [time, setTime] = useState<any>({0: {from: '', to: ''}});
	const [timeIndex, setTimeIndex] = useState(0);
	const [error, setError] = useState('');

	const currentTimes = useMemo(() => Object.keys(time), [time]);

	const hourValidation = (index: number, currentTime: number) =>
		currentTimes
			.map((timeId) => {
				if (+timeId === index) return false;
				if (!!!time[timeId].from || !!!time[timeId].to) return true;

				const otherFromTime = new Date(`01/01/2011 ${time[timeId].from}`).getTime();
				const otherToTime = new Date(`01/01/2011 ${time[timeId].to}`).getTime();

				return otherFromTime <= currentTime && otherToTime >= currentTime;
			})
			.some((el) => el === true);

	const setFromTime = (e: ChangeEvent<HTMLInputElement>, index: number) => {
		const toTime = new Date(`01/01/2011 ${time[index].to}`).getTime();
		const fromTime = new Date(`01/01/2011 ${e.target.value}`).getTime();

		const isError = hourValidation(index, fromTime);

		if (toTime > fromTime || isError) {
			setError('Nieprawidłowe godziny!');
		} else if (error !== '') {
			setError('');
		}

		setTime({
			...time,
			[index]: {...time[index], from: e.target.value},
		});
	};

	const setToTime = (e: ChangeEvent<HTMLInputElement>, index: number) => {
		const toTime = new Date(`01/01/2011 ${e.target.value}`).getTime();
		const fromTime = new Date(`01/01/2011 ${time[index].from}`).getTime();

		const isError = hourValidation(index, toTime);

		if (toTime < fromTime || isError) {
			setError('Nieprawidłowe godziny!');
		} else if (error !== '') {
			setError('');
		}

		setTime({
			...time,
			[index]: {...time[index], to: e.target.value},
		});
	};

	return (
		<div className={styles.wrapper}>
			<Checkbox
				id='resign'
				name='resign'
				value={true}
				valueChangeHandler={() => {}}
				slide
				label={day}
			/>
			<div className={styles.time}>
				{currentTimes.map((timeId, index) => {
					return (
						<div key={timeId} className={styles.timeWrapper}>
							{timeId !== '0' && (
								<button className={styles.actionButton}
									onClick={() => {
										const newTime = time;
										delete newTime[timeId];
										setTime({...newTime});
									}}>
									<Trash />
								</button>
							)}
							<input
								className={styles.inputFrom}
								id='timeFrom'
								name='timeFrom'
								type='time'
								value={time[timeId]?.from}
								onChange={(e) => setFromTime(e, +timeId)}
							/>
							<input
								className={styles.inputTo}
								id='timeTo'
								name='timeTo'
								type='time'
								value={time[timeId]?.to}
								onChange={(e) => setToTime(e, +timeId)}
							/>
							{index + 1 === currentTimes.length && (!!time[timeId]?.from && time[timeId]?.to) && (
								<button className={styles.actionButton}
									onClick={() => {
										const newIndex = timeIndex + 1;
										setTimeIndex(newIndex);
										setTime({...time, [newIndex]: {from: '', to: ''}});
									}}>
									<Add />
								</button>
							)}
						</div>
					);
				})}
				{!!error && <p className={styles.error}>{error}</p>}
			</div>
		</div>
	);
};

export default WeekTime;
