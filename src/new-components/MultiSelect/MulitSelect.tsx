// Libraries
import React, {useState} from 'react';
import classNames from 'classnames';
// Components
import {Text} from '../typography';
import Checkbox from '../Checkbox/Checkbox';
// Styles
import styles from './MulitSelect.module.scss';

interface MultiSelectProps {
	classes?: string;
	options: any;
	label: string;
	onValueChange: (state: any) => any;
	limit?: number;
}

const MulitSelect = (props: MultiSelectProps) => {
	const {label, onValueChange, limit, options, classes} = props;
	const [currentLimit, setCurrentLimit] = useState<number | undefined>(limit);
	const [selected, setSelected] = useState<any>(options);

	const updateStateHandler = (id: string) => {
		const newState = {
			...selected,
			[id]: {...selected[id], value: !selected[id].value},
		};
		setSelected(newState);
		onValueChange(newState);
	};

	return (
		<div className={classNames(classes, 'multi-select')}>
			<Text classes={styles.label}>{label}</Text>
			<div className={styles.options}>
				{Object.keys(options)
					.slice(0, currentLimit)
					.map((key) => (
						<Checkbox
							key={options[key].id}
							id={options[key].id}
							name={options[key].name}
							value={selected[options[key].id].value}
							errorMessage={selected[options[key].id].errorMessage}
							isValid={selected[options[key].id].isValid}
							valueChangeHandler={updateStateHandler}
							label={options[key].label}
						/>
					))}
			</div>
			{!!currentLimit && <button className={styles.more} type='button' onClick={() => setCurrentLimit(undefined)}>Pokaż więcej</button>}
		</div>
	);
};

export default MulitSelect;
