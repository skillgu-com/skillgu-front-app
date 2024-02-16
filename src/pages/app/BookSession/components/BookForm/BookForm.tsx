// Libraries
import React, {FormEvent, useState} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
// Components
import Input, {defaultInput} from 'src/new-components/Input/Input';
import {Title} from 'src/new-components/typography';
import Button from 'src/new-components/Button/Button';
import FAQ from 'src/new-components/FAQ/Accordion';
import Checkbox from 'src/new-components/Checkbox/Checkbox';
// Styles
import styles from './BookForm.module.scss';
// Types
import {
	TitleTag,
	TitleVariant,
} from 'src/new-components/typography/Title/Title';
import classNames from 'classnames';

const localizer = momentLocalizer(moment);

const BookForm = () => {
	const submitHandler = (e: FormEvent) => {
		e.preventDefault();
	};

	const [currentEvent, setCurrentEvent] = useState<null | number>(null);

	const [form, setForm] = useState({
		topic: defaultInput,
		email: defaultInput,
		nip: defaultInput,
		phone: defaultInput,
		policy: {...defaultInput, value: false},
	});

	const updateFormHandler = (name: string, value: any) => {
		setForm({...form, [name]: value});
	};

	return (
		<section className={styles.wrapper}>
			<form onSubmit={submitHandler}>
				<Title
					classes={classNames(styles.title, styles.titleMt0)}
					tag={TitleTag.h3}
					variant={TitleVariant.standard}>
					Termin
				</Title>
				<Calendar
					localizer={localizer}
					view='week'
					onView={() => null}
					className={styles.calendar}
					events={[
						{
							id: 0,
							title: new Date().getHours(),
							allDay: true,
							start: new Date(),
							end: new Date(),
						},
						{
							id: 1,
							title: new Date().getHours(),
							allDay: true,
							start: new Date(),
							end: new Date(),
						},
						{
							id: 2,
							title: new Date().getHours(),
							allDay: true,
							start: new Date(),
							end: new Date(),
						},
					]}
					startAccessor='start'
					endAccessor='end'
					components={{
						header: ({date}) => {
							return (
								<p className={styles.header}>
									<span>{date.toLocaleDateString('pl-PL', {weekday: 'short'})}</span>
									<small>{date.getDate()} {date.toLocaleString('default', {month: 'long'})}</small>
								</p>
							);
						},
						eventWrapper: ({event}) => {
							return (
								<button
									data-is-current={event.id === currentEvent}
									className={styles.hour}
									onClick={() => setCurrentEvent(event.id)}>
									{event.start.getHours()}:{event.start.getMinutes()}
								</button>
							);
						},
						dateCellWrapper: () => <div className={styles.day}></div>,
					}}
				/>
				<Title
					classes={styles.title}
					tag={TitleTag.h3}
					variant={TitleVariant.standard}>
					Temat spotkania
				</Title>
				<Input
					id='topic'
					name='topic'
					type='textarea'
					placeholder={'Opisz swój problem...'}
					value={form.topic.value}
					errorMessage={form.topic.errorMessage}
					isValid={form.topic.isValid}
					valueChangeHandler={updateFormHandler}
				/>

				<Title
					classes={styles.title}
					tag={TitleTag.h3}
					variant={TitleVariant.standard}>
					Twoje dane
				</Title>
				<div className={styles.formSection}>
					<Input
						id='email'
						name='email'
						type='email'
						placeholder={'E-mail'}
						value={form.email.value}
						errorMessage={form.email.errorMessage}
						isValid={form.email.isValid}
						valueChangeHandler={updateFormHandler}
					/>
					<Input
						id='nip'
						name='nip'
						type='nip'
						placeholder={'NIP'}
						value={form.nip.value}
						errorMessage={form.nip.errorMessage}
						isValid={form.nip.isValid}
						valueChangeHandler={updateFormHandler}
					/>
					<Input
						id='phone'
						name='phone'
						type='phone'
						placeholder={'Nr telefornu'}
						value={form.phone.value}
						errorMessage={form.phone.errorMessage}
						isValid={form.phone.isValid}
						valueChangeHandler={updateFormHandler}
					/>
				</div>

				<Title
					classes={styles.title}
					tag={TitleTag.h3}
					variant={TitleVariant.standard}>
					Zaproś zespół
				</Title>
				<div className={styles.formSection}>
					<Input
						id='email'
						name='email'
						type='email'
						placeholder={'E-mail'}
						value={form.email.value}
						errorMessage={form.email.errorMessage}
						isValid={form.email.isValid}
						valueChangeHandler={updateFormHandler}
					/>
					<Input
						id='nip'
						name='nip'
						type='nip'
						placeholder={'NIP'}
						value={form.nip.value}
						errorMessage={form.nip.errorMessage}
						isValid={form.nip.isValid}
						valueChangeHandler={updateFormHandler}
					/>
					<Input
						id='phone'
						name='phone'
						type='phone'
						placeholder={'Nr telefornu'}
						value={form.phone.value}
						errorMessage={form.phone.errorMessage}
						isValid={form.phone.isValid}
						valueChangeHandler={updateFormHandler}
					/>
				</div>
				<Checkbox
					id='policy'
					name='policy'
					value={form.policy.value}
					errorMessage={form.policy.errorMessage}
					isValid={form.policy.isValid}
					valueChangeHandler={updateFormHandler}
					label='Treść zgody'
				/>
				<Button type='submit' classes={styles.button}>
					Przejdź do płatności
				</Button>
			</form>

			<FAQ
				elements={[
					{
						id: '01',
						title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?',
						description:
							' Fugiat tempore, iure deleniti corrupti reiciendis obcaecati quibusdam eligendi. Debitis laudantium numquam aut repellendus, culpa esse! Non blanditiis aut nisi labore voluptas.',
					},
					{
						id: '02',
						title: 'test 2',
						description:
							'assdad dsafmsd,gmls dkfjgnsjdnfklgjskfgj skjg lskj ;lgfjks lkfdjgh ksfjhgls kfdjhg lsdfgjkhskdfhgslkugreojhsdlk jfhv kdfhvkkkflsl dj gljlsjl',
					},
				]}
			/>
		</section>
	);
};

export default BookForm;
