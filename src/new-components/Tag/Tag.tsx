// Libraries
import React from 'react';
// Components
import {Text} from '../typography';
// Styles
import styles from './Tag.module.scss';

interface TagProps {
	text: string;
	bgColor?: string;
}

const Tag = (props: TagProps) => {
	const {text, bgColor = '#EFF4F9'} = props;
	return (
		<Text as='span' classes={styles.wrapper} style={{backgroundColor: bgColor}}>
			{text}
		</Text>
	);
};

export default Tag;
