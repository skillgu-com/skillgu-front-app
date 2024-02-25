// Libraries
import React, {useMemo, useState} from 'react';
// Components
import Input, {defaultInput} from 'src/new-components/Input/Input';
// Styles
import styles from '../BookForm/BookForm.module.scss';
import stylesTeam from './Team.module.scss';
import classNames from 'classnames';

interface TeamProps {
	limit: number;
	updateFormHandler: (name: string, value: any) => void;
	guestsData: {
		value: any;
		errorMessage: string;
		isValid: undefined;
	};
}

const Team = (props: TeamProps) => {
	const {updateFormHandler, guestsData, limit} = props;

	const [uniqueGuestID, setUniqueGuestID] = useState(0);

	const currentAmount = useMemo(
		() => Object.keys(guestsData.value).length,
		[guestsData]
	);

	const addPersonHandler = () => {
		if (currentAmount >= limit) return;

		setUniqueGuestID(uniqueGuestID + 1);

		updateFormHandler('guests', {
			value: {
				...guestsData.value,
				[`guest${currentAmount + 1}`]: {
					name: defaultInput,
					email: defaultInput,
					message: defaultInput,
				},
			},
		});
	};

	const removePersonHandler = (key: string) => {
		const newValue = guestsData.value;
		delete newValue[key];
		updateFormHandler('guests', {
			value: newValue,
		});
	};

	const updateGuestData = (name: string, value: string) => {
		const splitedName = name.split('-');
		const guest = splitedName[0];
		const inputName = splitedName[1];

		updateFormHandler('guests', {
			value: {
				...guestsData.value,
				[guest]: {...guestsData.value[guest], [inputName]: value},
			},
		});
	};

	return (
		<div>
			{Object.keys(guestsData.value).map((key, index) => (
				<div className={styles.formSection} key={key}>
					{index !== 0 && (
						<button
							type='button'
							className={classNames(stylesTeam.button, stylesTeam.removeButton)}
							onClick={() => removePersonHandler(key)}>
							Usuń osobę
						</button>
					)}
					<Input
						id={key + '-name'}
						name={key + '-name'}
						type={'text'}
						placeholder={'Imię i nazwisko'}
						value={guestsData.value[key].name.value}
						errorMessage={guestsData.value[key].name.errorMessage}
						isValid={guestsData.value[key].name.isValid}
						valueChangeHandler={updateGuestData}
					/>
					<Input
						id={key + '-email'}
						name={key + '-email'}
						type={'email'}
						placeholder={'E-mail'}
						value={guestsData.value[key].email.value}
						errorMessage={guestsData.value[key].email.errorMessage}
						isValid={guestsData.value[key].email.isValid}
						valueChangeHandler={updateGuestData}
					/>
					<Input
						id={key + '-message'}
						name={key + '-message'}
						as='textarea'
						placeholder={'Wiadomość'}
						classes={styles.textarea}
						value={guestsData.value[key].message.value}
						errorMessage={guestsData.value[key].message.errorMessage}
						isValid={guestsData.value[key].message.isValid}
						valueChangeHandler={updateGuestData}
					/>
				</div>
			))}
			{currentAmount < limit && (
				<button
					className={stylesTeam.button}
					onClick={addPersonHandler}
					type='button'>
					+ Dodaj kolejną osobę
				</button>
			)}
		</div>
	);
};

export default Team;
