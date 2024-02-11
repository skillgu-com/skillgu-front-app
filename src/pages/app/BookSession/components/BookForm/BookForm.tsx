// Libraries
import React, {FormEvent, useState} from 'react';
// Components
import Input, {defaultInput} from 'src/new-components/Input/Input';
import {Title} from 'src/new-components/typography';
import Button from 'src/new-components/Button/Button';
import FAQ from 'src/new-components/FAQ/Accordion';
// Styles
import styles from './BookForm.module.scss';
// Types
import {
	TitleTag,
	TitleVariant,
} from 'src/new-components/typography/Title/Title';

const BookForm = () => {
	const submitHandler = (e: FormEvent) => {
		e.preventDefault();
	};

	const [form, setForm] = useState({
		topic: defaultInput,
		email: defaultInput,
		nip: defaultInput,
		phone: defaultInput,
	});

	const updateFormHandler = (name: string, value: any) => {
		setForm({...form, [name]: value});
	};

	return (
		<section className={styles.wrapper}>
			<form onSubmit={submitHandler}>
				<div>
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
				</div>

				<div>
					<Title
						classes={styles.title}
						tag={TitleTag.h3}
						variant={TitleVariant.standard}>
						Twoje dane
					</Title>
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

				<div>
					<Title
						classes={styles.title}
						tag={TitleTag.h3}
						variant={TitleVariant.standard}>
						Zaproś zespół
					</Title>
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
