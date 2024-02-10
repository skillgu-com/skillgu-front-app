// Libraries
import React, {useEffect, useState, useRef} from 'react';
import classNames from 'classnames';
// Components
import MulitSelect from '../MultiSelect/MulitSelect';
// Types
import {MultiSelectProps} from '../MultiSelect/MulitSelect';
// Styles
import styles from './CheckboxSelect.module.scss';

interface CheckboxSelectProps extends MultiSelectProps {
	selectClasses?: string;
}

const CheckboxSelect = (props: CheckboxSelectProps) => {
	const {selectClasses, ...rest} = props;

	const [visibleOptions, setVisibleOptions] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);

	const handleClickOutside = (event: MouseEvent) => {
		if (
			wrapperRef.current &&
			!wrapperRef.current.contains(event.target as Node)
		) {
			setVisibleOptions(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const toggleOptionsVisibility = () => {
		setVisibleOptions(!visibleOptions);
	};

	return (
		<div className={styles.wrapper} ref={wrapperRef}>
			<button className={styles.button} onClick={toggleOptionsVisibility}>
				{props.label}{' '}
				<svg
					height='20'
					width='20'
					viewBox='0 0 20 20'
					aria-hidden='true'
					focusable='false'>
					<path d='M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z'></path>
				</svg>
			</button>
			{visibleOptions && (
				<div className={classNames(styles.options, selectClasses)}>
					{props?.value && <MulitSelect {...rest} isSelect={true} />}
				</div>
			)}
		</div>
	);
};

export default CheckboxSelect;
