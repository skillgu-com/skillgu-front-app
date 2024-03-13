import React from 'react';
// Components
import Checkbox from '@newComponents/Checkbox/Checkbox';
import Input from '@newComponents/Input/Input';
// Icons
import Add from '@icons/Add';
import Trash from '../icons/Trash';
// Styles
import styles from './WeekTime.module.scss';

const WeekTime = () => {
	return (
		<div className={styles.wrapper}>
			<Checkbox
				id='resign'
				name='resign'
				value={true}
				valueChangeHandler={() => {}}
				slide
				label='Pn'
			/>
			<div className={styles.time}>
				<div className={styles.timeWrapper}>
					{/* <button><Trash/></button> */}
					<Input
						classes={styles.inputFrom}
						id='dateTo'
						name='dateTo'
						type='time'
						label='Od'
						value={''}
						valueChangeHandler={() => {}}
					/>
					<Input
						classes={styles.inputTo}
						id='dateTo'
						name='dateTo'
						type='time'
						label='Do'
						value={''}
						valueChangeHandler={() => {}}
					/>
					{/* <button><Add/></button> */}
				</div>
			</div>
		</div>
	);
};

export default WeekTime;
