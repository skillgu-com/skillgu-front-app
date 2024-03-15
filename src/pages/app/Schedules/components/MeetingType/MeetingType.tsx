import React, {ChangeEvent} from 'react';
// Icons
import Person from '@icons/Person';
import Group from '@icons/Group';
// Styles
import styles from '../../screens/ScheduleForm/ScheduleForm.module.scss';
import meetingStyles from './MeetingType.module.scss';

interface MeetingTypeProps {
	value: string;
	updateFormHandler: (name: string, value: any) => void;
}

const MeetingType = (props: MeetingTypeProps) => {
	const {value, updateFormHandler} = props;

	const updateHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const id = e.target.id;

		updateFormHandler('type', {value: id})
	};

	return (
		<div>
			<span className={styles.fieldText}>Rodzaj spotkania</span>
			<div className={meetingStyles.wrapper}>
				<label className={meetingStyles.field}>
					<input
						type='radio'
						name='type'
						id='individual'
						checked={value === 'individual'}
						onChange={updateHandler}
					/>
					<Person />
					<span>1:1</span>
				</label>
				<label className={meetingStyles.field}>
					<input
						type='radio'
						name='type'
						id='group'
						checked={value === 'group'}
						onChange={updateHandler}
					/>
					<Group />
					<span>Grupowe</span>
				</label>
			</div>
		</div>
	);
};

export default MeetingType;
