// Libraries
import React from 'react';
import classNames from 'classnames';
// Components
import {Text} from '../typography';
// Styles
import styles from './Tag.module.scss';
// Types
import { Common } from 'src/types/main';

interface TagProps extends Common{
	name: string;
	bgColor?: string;
	onRemoveHandler?: () => void
}

const Tag = (props: TagProps) => {
	const {name, bgColor = '#EFF4F9', onRemoveHandler, classes} = props;
	return (
		<Text as='span' classes={classNames(styles.wrapper, classes)} style={{backgroundColor: bgColor}}>
			{name} {!!onRemoveHandler && <button type='button' onClick={onRemoveHandler}>X</button>}
		</Text>
	);
};

export default Tag;
