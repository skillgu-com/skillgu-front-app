// Libraries
import React from 'react';
// Components
import {Text} from '../typography';
// Styles
import styles from './Tag.module.scss';

interface TagProps {
	text: string;
}

const Tag = (props: TagProps) => {
	const {text} = props;
	return (
		<Text as='span' classes={styles.wrapper}>
			{text}
		</Text>
	);
};

export default Tag;
