import React from 'react';
// Components
import {NavTitle} from '@newComponents/typography';
import Container from '@newComponents/Container/Container';
import Input, {defaultInput} from '@newComponents/Input/Input';
// Types
import {Tag} from '@customTypes/tags';
// Styles
import styles from './ScheduleForm.module.scss';

const ScheduleForm = () => {
	return (
		<Container as={Tag.Section} classes={styles.wrapper}>
			<NavTitle>Szczegóły harmonogramu</NavTitle>
			<form>
				{/* <Input /> */}
			</form>
		</Container>
	);
};

export default ScheduleForm;
