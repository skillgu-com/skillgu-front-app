import React from 'react';
// Icons
import Person from '@icons/Person';
import Group from '@icons/Group';
// Styles
import styles from '../../screens/ScheduleForm/ScheduleForm.module.scss';
import meetingStyles from './MeetingType.module.scss';

const MeetingType = () => {
	return (
		<div>
			<span className={styles.fieldText}>Rodzaj spotkania</span>
			<div className={meetingStyles.wrapper}>
				<label className={meetingStyles.field}>
					<input type='radio' name='type' id='individual' />
					<Person />
					<span>1:1</span>
				</label>
				<label className={meetingStyles.field}>
					<input type='radio' name='type' id='group' />
					<Group />
					<span>Grupowe</span>
				</label>
			</div>
		</div>
	);
};

export default MeetingType;
