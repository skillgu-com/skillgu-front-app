// WeekTime.tsx

import React, {ChangeEvent, useState} from 'react';
import Checkbox from '@newComponents/Checkbox/Checkbox';
import styles from './WeekTime.module.scss';
import Add from "@icons/Add";
import Trash from "../icons/Trash";

interface WeekTimeProps {
	day: string;
	updateTimes: (times: any[]) => void;
}

const WeekTime = ({day, updateTimes}: WeekTimeProps) => {
	const [times, setTimes] = useState<any[]>([{from: '', to: ''}]);
	const [error, setError] = useState('');

	const hourValidation = (fromTime: string, toTime: string): boolean => {
		// Implementuj walidację godzin
		return false;
	};

	const addTimeSlot = () => {
		setTimes([...times, {from: '', to: ''}]);
	};

	const removeTimeSlot = (index: number) => {
		const newTimes = [...times];
		newTimes.splice(index, 1);
		setTimes(newTimes);
	};

	const handleTimeValidation = (index: number, fromTime: string, toTime: string) => {
		if (hourValidation(fromTime, toTime)) {
			setError('Nieprawidłowe godziny!');
			return false;
		}
		setError('');
		return true;
	};

	const handleTimeFromChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
		const newFromTime = e.target.value;
		const newTimes = [...times];
		newTimes[index].from = newFromTime;
		if (handleTimeValidation(index, newFromTime, newTimes[index].to)) {
			setTimes(newTimes);
			updateTimes(newTimes); // Aktualizuj czasy w komponencie nadrzędnym
		}
	};

	const handleTimeToChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
		const newToTime = e.target.value;
		const newTimes = [...times];
		newTimes[index].to = newToTime;
		if (handleTimeValidation(index, newTimes[index].from, newToTime)) {
			setTimes(newTimes);
			updateTimes(newTimes); // Aktualizuj czasy w komponencie nadrzędnym
		}
	};

	return (
		<div className={styles.wrapper}>
			<Checkbox
				classes={styles.checkbox}
				id='resign'
				name='resign'
				value={true}
				valueChangeHandler={() => {}}
				slide
				label={day}
			/>
			<div className={styles.time}>
				{times.map((time, index) => (
					<div key={index} className={styles.timeWrapper}>
						{index !== 0 && (
							<button
								className={styles.actionButton}
								onClick={() => removeTimeSlot(index)}
							>
								<Trash />
							</button>
						)}
						<input
							className={styles.inputFrom}
							type='time'
							value={time.from}
							onChange={(e) => handleTimeFromChange(e, index)}
						/>
						<input
							className={styles.inputTo}
							type='time'
							value={time.to}
							onChange={(e) => handleTimeToChange(e, index)}
						/>
						{index === times.length - 1 && (
							<button
								className={styles.actionButton}
								onClick={addTimeSlot}
							>
								<Add />
							</button>
						)}
					</div>
				))}
				{error && <p className={styles.error}>{error}</p>}
			</div>
		</div>
	);
};

export default WeekTime;
