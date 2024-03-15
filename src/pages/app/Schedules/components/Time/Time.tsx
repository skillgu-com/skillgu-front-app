import React from 'react';
// Icons
import Add from '@icons/Add';
import Minus from '@icons/Minus';
// styles
import styles from './Time.module.scss';

interface TimeProps {
	value: number;
	valueChangeHandler: (name: string, value: any) => void;
}

const TIME_STEP = 15;

const Time = (props: TimeProps) => {
	const {value, valueChangeHandler} = props;

	const time = {
		increase: () => {
			const newTime = value + TIME_STEP;
			if (newTime > 120) return;
			valueChangeHandler('time', {value: newTime});
		},
		decrease: () => {
			const newTime = value - TIME_STEP;
			if (newTime < 15) return;
			valueChangeHandler('time', {value: newTime});
		},
		disabledIncrease: value === 120,
		disabledDecrease: value === 15,
	};

	return (
		<div className={styles.time}>
			<span className={styles.fieldText}>Długość spotkania</span>
			<div className={styles.timeControler}>
				<button disabled={time.disabledDecrease} onClick={time.decrease}>
					<Minus />
				</button>
				<span>{value} min</span>
				<button disabled={time.disabledIncrease} onClick={time.increase}>
					<Add />
				</button>
			</div>
		</div>
	);
};

export default Time;
