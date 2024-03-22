import React, {FormEvent, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
// Components
import {NavTitle} from '@newComponents/typography';
import Container from '@newComponents/Container/Container';
import Input, {defaultInput} from '@newComponents/Input/Input';
import Button from '@newComponents/Button/Button';
import MeetingType from '../../components/MeetingType/MeetingType';
import Checkbox from '@newComponents/Checkbox/Checkbox';
import WeekTime from '../../components/WeekTime/WeekTime';
// Types
import {Tag} from '@customTypes/tags';
// Styles
import styles from './ScheduleForm.module.scss';
import stylesSessions from '../SessionForm/SessionForm.module.scss';
import StepInput from '@newComponents/StepInput/StepInput';

const ScheduleForm = () => {
	const [form, setForm] = useState({
		name: defaultInput,
		dateFrom: defaultInput,
		dateTo: defaultInput,
		resign: {...defaultInput, value: false},
		type: {value: 'individual'},
		time: {...defaultInput, value: 30},
		groupAmount: {...defaultInput, value: 1},
		monday: {...defaultInput, value: false},
		tuesday: {...defaultInput, value: false},
		wednesday: {...defaultInput, value: false},
		thursday: {...defaultInput, value: false},
		friday: {...defaultInput, value: false},
		saturday: {...defaultInput, value: false},
		sunday: {...defaultInput, value: false},
	});

	const navigate = useNavigate();

	const updateFormHandler = (name: string, value: any) => {
		if (name === 'dateFrom') {
			const fromDate = new Date(value.value).getTime();
			const toDate = new Date(form.dateTo.value).getTime();

			if (fromDate >= toDate || !!!fromDate)
				return setForm({
					...form,
					[name]: {...value, errorMessage: 'Nieprawidłowa data!'},
				});
		}

		if (name === 'dateTo') {
			const fromDate = new Date(form.dateTo.value).getTime();
			const toDate = new Date(value.value).getTime();

			if (fromDate > toDate || !!!toDate)
				return setForm({
					...form,
					[name]: {...value, errorMessage: 'Nieprawidłowa data!'},
				});
		}

		setForm({...form, [name]: value});
	};

	const submitHandler = (e: FormEvent) => {
		e.preventDefault();

		navigate('/schedules');
	};

	const disabled = useMemo(() => {
		if (
			(!!form.monday.value && !form.monday.isValid) ||			
			(!!form.tuesday.value && !form.tuesday.isValid) ||
			(!!form.wednesday.value && !form.wednesday.isValid) ||
			(!!form.thursday.value && !form.thursday.isValid) ||
			(!!form.friday.value && !form.friday.isValid) ||
			(!!form.saturday.value && !form.saturday.isValid) ||
			(!!form.sunday.value && !form.sunday.isValid)
		)
			return true;

		if (
			form.name.isValid &&
			form.dateFrom.isValid &&
			form.dateTo.isValid &&
			(form.monday.value ||
				form.wednesday.value ||
				form.thursday.value ||
				form.tuesday.value ||
				form.friday.value ||
				form.saturday.value ||
				form.sunday.value)
		)
			return false;

		return true;
	}, [form]);

	return (
		<Container as={Tag.Section} classes={stylesSessions.wrapper}>
			<NavTitle>Szczegóły harmonogramu</NavTitle>
			<form className={stylesSessions.form} onSubmit={submitHandler}>
				<Input
					id='name'
					name='name'
					type='text'
					required
					placeholder={'nazwa harmonogramu'}
					value={form.name.value}
					errorMessage={form.name.errorMessage}
					isValid={form.name.isValid}
					valueChangeHandler={updateFormHandler}
					label='Nazwa'
				/>
				<StepInput
					minValue={15}
					maxValue={120}
					step={15}
					name='time'
					measure='min'
					value={form.time.value}
					label='Długość spotkania'
					valueChangeHandler={updateFormHandler}
				/>
				<MeetingType
					value={form.type.value}
					updateFormHandler={updateFormHandler}
				/>
				{form.type.value === 'group' && (
					<StepInput
						minValue={1}
						maxValue={5}
						step={1}
						name='groupAmount'
						value={form.groupAmount.value}
						label='Ilość uczestników'
						valueChangeHandler={updateFormHandler}
					/>
				)}
				<Checkbox
					id='resign'
					name='resign'
					value={form.resign.value}
					valueChangeHandler={updateFormHandler}
					slide
					label='Możliwość odwołania spotkania przez klienta'
				/>
				<div>
					<span className={styles.fieldText}>Okres obowiązywania</span>
					<div className={styles.date}>
						<Input
							classes={styles.dateInput}
							id='dateFrom'
							name='dateFrom'
							type='date'
							required
							value={form.dateFrom.value}
							errorMessage={form.dateFrom.errorMessage}
							isValid={form.dateFrom.isValid}
							valueChangeHandler={updateFormHandler}
						/>
						<span className={styles.fieldText}>-</span>
						<Input
							classes={styles.dateInput}
							id='dateTo'
							name='dateTo'
							type='date'
							required
							value={form.dateTo.value}
							errorMessage={form.dateTo.errorMessage}
							isValid={form.dateTo.isValid}
							valueChangeHandler={updateFormHandler}
						/>
					</div>
				</div>
				<WeekTime
					day='Pn'
					name={'monday'}
					value={form.monday.value}
					meetingTime={form.time.value}
					valueChangeHandler={updateFormHandler}
				/>
				<WeekTime
					day='Wt'
					name={'tuesday'}
					value={form.tuesday.value}
					meetingTime={form.time.value}
					valueChangeHandler={updateFormHandler}
				/>
				<WeekTime
					day='Śr'
					name={'wednesday'}
					value={form.wednesday.value}
					meetingTime={form.time.value}
					valueChangeHandler={updateFormHandler}
				/>
				<WeekTime
					day='Czw'
					name={'thursday'}
					value={form.thursday.value}
					meetingTime={form.time.value}
					valueChangeHandler={updateFormHandler}
				/>
				<WeekTime
					day='Pt'
					name={'friday'}
					value={form.friday.value}
					meetingTime={form.time.value}
					valueChangeHandler={updateFormHandler}
				/>
				<WeekTime
					day='Sb'
					name={'saturday'}
					value={form.saturday.value}
					meetingTime={form.time.value}
					valueChangeHandler={updateFormHandler}
				/>
				<WeekTime
					day='Nd'
					name={'sunday'}
					value={form.sunday.value}
					meetingTime={form.time.value}
					valueChangeHandler={updateFormHandler}
				/>

				<Button
					classes={styles.formButton}
					fullWidth
					type='submit'
					disableButton={disabled}>
					Zapisz zmiany
				</Button>
			</form>
		</Container>
	);
};

export default ScheduleForm;
