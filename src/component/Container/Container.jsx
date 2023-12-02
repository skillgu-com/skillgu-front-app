// Libraries
import React, {useMemo} from 'react';
import classNames from 'classnames';
// Styles
import styles from './Container.module.scss'

const Container = (props) => {
	const {as = 'div', fluid, classes, children, id} = props;

	const ElementTag = useMemo(() => as, [as]);

	return (
		<ElementTag className={classNames(styles.wrapper, classes)} id={id}>
			<div className='container' data-type={fluid ? 'fluid' : 'default'}>
				{children}
			</div>
		</ElementTag>
	);
};

export default Container;
