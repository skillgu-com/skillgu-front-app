import React, {
	ChangeEvent,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
// Components
import Checkbox from '@newComponents/Checkbox/Checkbox';
import {defaultInput} from '@newComponents/Input/Input';
// Icons
import Add from '@icons/Add';
import Trash from '../icons/Trash';
// Styles
import styles from './WeekTime.module.scss';

interface WeekTimeProps {
	day: string;
	value: any;
	name: string;
	valueChangeHandler: (name: string, value: any) => void;
	meetingTime: number;
}

const WeekTime = (props: WeekTimeProps) => {
	const {day, meetingTime, valueChangeHandler, name, value} = props;

	const [checkbox, setCheckbox] = useState({...defaultInput, value: false});
	const [time, setTime] = useState<any>({0: {from: '', to: ''}});
	const [timeIndex, setTimeIndex] = useState(0);
	const [error, setError] = useState('');

	const changeCheckboxHandler = (_name: string, value: any) => {
		setCheckbox(value);

		if (!value.value) {
			valueChangeHandler(name, {errorMessage: '', isValid: true, value: false});
		}
	};

	const timeDifference = (from: number, to: number): number =>
		(to - from) / 1000 / 60;

	const getTimeRange = (
		from: string,
		to: string
	): {toTime: number; fromTime: number} => {
		const toTime = new Date(`01/01/2011 ${to}`).getTime();
		const fromTime = new Date(`01/01/2011 ${from}`).getTime();

		return {toTime, fromTime};
	};

	const currentTimes = useMemo(() => Object.keys(time), [time]);

	const hourValidation = useCallback(
		(index: number, currentTime: number) =>
			currentTimes
				.map((timeId) => {
					if (+timeId === index) return false;
					if (!!!time[timeId].from || !!!time[timeId].to) return true;
					const {toTime, fromTime} = getTimeRange(time[timeId].from, time[index].to);

					if (toTime - fromTime < meetingTime) {
						setError('Nieprawidłowe godziny!');
						return true;
					}

					const otherFromTime = new Date(
						`01/01/2011 ${time[timeId].from}`
					).getTime();
					const otherToTime = new Date(`01/01/2011 ${time[timeId].to}`).getTime();

					return otherFromTime <= currentTime && otherToTime >= currentTime;
				})
				.some((el) => el === true),
		[currentTimes, meetingTime, time]
	);

	const setFromTime = useCallback(
		(e: ChangeEvent<HTMLInputElement>, index: number) => {
			const {toTime, fromTime} = getTimeRange(e.target.value, time[index].to);

			const isError = hourValidation(index, fromTime);

			if (
				toTime < fromTime ||
				isError ||
				timeDifference(fromTime, toTime) < meetingTime
			) {
				setError('Nieprawidłowe godziny!');
			} else if (error !== '') {
				setError('');
			}

			setTime({
				...time,
				[index]: {...time[index], from: e.target.value},
			});
		},
		[error, hourValidation, meetingTime, time]
	);

	const setToTime = useCallback(
		(e: ChangeEvent<HTMLInputElement>, index: number) => {
			const {toTime, fromTime} = getTimeRange(time[index].from, e.target.value);

			const isError = hourValidation(index, toTime);

			if (
				toTime < fromTime ||
				isError ||
				timeDifference(fromTime, toTime) < meetingTime
			) {
				setError('Nieprawidłowe godziny!');
			} else if (error !== '') {
				setError('');
			}

			setTime({
				...time,
				[index]: {...time[index], to: e.target.value},
			});
		},
		[time, hourValidation, meetingTime, error]
	);

	const addTimesRangeHandler = useCallback(() => {
		let isError = false;
		currentTimes.map((id) => {
			const {toTime, fromTime} = getTimeRange(time[id].from, time[id].to);
			if (timeDifference(fromTime, toTime) < meetingTime) return (isError = true);
		});

		if (isError) {
			return setError('Nieprawidłowe godziny!');
		} else if (error !== '') {
			setError('');
		}

		const newIndex = timeIndex + 1;
		setTimeIndex(newIndex);
		setTime({...time, [newIndex]: {from: '', to: ''}});
	}, [currentTimes, error, timeIndex, time, meetingTime]);

	useEffect(() => {
		if (checkbox.value) {
			let error = '';
			Object.keys(time).map((index) => {
				if (!!!time[index].to || !!!time[index].from) {
					error = 'Nieprawidłowe godziny!';
					setError('Nieprawidłowe godziny!');
				}
			});
			valueChangeHandler(name, {
				errorMessage: error,
				isValid: !!!error,
				value: time,
			});
		}
	}, [name, time, checkbox.value]);

	return (
		<div className={styles.wrapper}>
			<Checkbox
				classes={styles.checkbox}
				id='isActive'
				name='isActive'
				value={checkbox.value}
				valueChangeHandler={changeCheckboxHandler}
				slide
				label={day}
			/>
			<div className={styles.time}>
				{currentTimes.map((timeId, index) => {
					return (
						<div key={timeId} className={styles.timeWrapper}>
							{timeId !== '0' && (
								<button
									type='button'
									className={styles.actionButton}
									disabled={!!!value}
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
								disabled={!!!value}
								value={time[timeId]?.from}
								onChange={(e) => setFromTime(e, +timeId)}
							/>
							<input
								className={styles.inputTo}
								id='timeTo'
								name='timeTo'
								type='time'
								disabled={!!!value}
								value={time[timeId]?.to}
								onChange={(e) => setToTime(e, +timeId)}
							/>
							{index + 1 === currentTimes.length &&
								!!time[timeId]?.from &&
								time[timeId]?.to && (
									<button
										type='button'
										disabled={!!!value}
										className={styles.actionButton}
										onClick={addTimesRangeHandler}>
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
