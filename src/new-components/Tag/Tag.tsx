// Libraries
import React from 'react';
// Components
import {Text} from '../typography';
// Styles
import styles from './Tag.module.scss';

interface TagProps {
	id?: string;
	text: string;
	bgColor?: string;
	onRemoveHandler?: () => void
}

const Tag = (props: TagProps) => {
	const {text, bgColor = '#EFF4F9', onRemoveHandler} = props;
	return (
		<Text as='span' classes={styles.wrapper} style={{backgroundColor: bgColor}}>
			{text} <button type='button' onClick={onRemoveHandler}>x</button>
		</Text>
	);
};

export default Tag;
