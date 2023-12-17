import React from 'react';
import classNames from 'classnames';
// Types
import {Common, FontColors} from '../../../types/main';
// Styles
import styles  from './Text.module.scss';

interface TextProps extends Common {
	as?: 'p' | 'span';
	color?: FontColors;
}

const Text = ({children, classes, as: Tag = 'p', color}: TextProps) => (
	<Tag className={classNames(styles.text, classes)}  data-color={color}>{children}</Tag>
);

export default Text;
