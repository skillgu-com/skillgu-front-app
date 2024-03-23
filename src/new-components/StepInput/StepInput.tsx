import React from 'react';
// Icons
import Add from '@icons/Add';
import Minus from '@icons/Minus';
// styles
import styles from './StepInput.module.scss';

interface TimeProps {
	step: number;
	maxValue: number;
	minValue: number;
	value: number;
	label: string;
	name: string;
	measure?: string;
	valueChangeHandler: (name: string, value: any) => void;
}

const StepInput = (props: TimeProps) => {
	const {
		value,
		valueChangeHandler,
		step,
		minValue,
		maxValue,
		label,
		measure,
		name,
	} = props;

	const stepper = {
		increase: () => {
			const newTime = value + step;
			if (newTime > maxValue) return;
			valueChangeHandler(name, {value: newTime, errorMessage: '', isValid: true});
		},
		decrease: () => {
			const newTime = value - step;
			if (newTime < minValue) return;
			valueChangeHandler(name, {value: newTime, errorMessage: '', isValid: true});
		},
		disabledIncrease: value === maxValue,
		disabledDecrease: value === minValue,
	};

	return (
		<div className={styles.time}>
			<span className={styles.fieldText}>{label}</span>
			<div className={styles.timeControler}>
				<button
					disabled={stepper.disabledDecrease}
					type='button'
					onClick={stepper.decrease}>
					<Minus />
				</button>
				<span>
					{value} {measure}
				</span>
				<button
					disabled={stepper.disabledIncrease}
					type='button'
					onClick={stepper.increase}>
					<Add />
				</button>
			</div>
		</div>
	);
};

export default StepInput;
