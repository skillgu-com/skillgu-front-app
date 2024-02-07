// Libraries
import React, {FormEvent, useState} from 'react';
// Components
import Button from 'src/new-components/Button/Button';
import PlanScope from 'src/new-components/PlanScope/PlanScope';
// Styles
import styles from './MentoringForm.module.scss';

interface MentoringFormProps {
	options: {
		id: string;
		name: string;
		price: number;
		description: string;
		scope: React.ReactNode[];
	}[];
}

const MentoringForm = (props: MentoringFormProps) => {
	const {options} = props;

	const [currentOption, setCurrentOption] = useState(options[0]);

	const changeOptionHnadler = (newId: string) => {
		const newOption = options.find(({id}) => id === newId);
		newOption && setCurrentOption(newOption);
	};

	const submitHandler = (e: FormEvent) => {
		e.preventDefault();
	};

	return (
		<form onSubmit={submitHandler}>
			<div className={styles.selectWrapper}>
				{options.map(({id, name}) => (
					<button
						data-is-current={currentOption.id === id}
						onClick={() => changeOptionHnadler(id)}
						type='button'
						key={id}>
						{name}
					</button>
				))}
			</div>
			<h3 className={styles.price}>
				{currentOption.price} <span>zł</span> <small>/miesiąc</small>
			</h3>
			<p className={styles.description}>{currentOption.description}</p>
			<PlanScope elements={currentOption.scope} />
			<Button type='submit' classes={styles.button}>
				Wybierz
			</Button>
		</form>
	);
};

export default MentoringForm;
