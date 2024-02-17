// Libraries
import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
// Components
import Container from 'src/new-components/Container/Container';
import Info from './components/Info/Info';
import BookForm from './components/BookForm/BookForm';
// Types
import {Tag} from 'src/types/tags';
// Styles
import styles from './BookSession.module.scss';
import Modal from 'src/new-components/Modal/Modal';
import SessionCard from 'src/new-components/Cards/SessionCard/SessionCard';

const BookSession = () => {
	const {id} = useParams();
	const [term, setTerm] = useState<Date | undefined>(undefined);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const selectTermHandler = (term: Date) => {
		setTerm(term);
	};

	return (
		<>
			<Container as={Tag.Section}>
				<div className={styles.content}>
					<Info
						fullName='Jan Kowalski'
						position='Tester oprogramowania'
						descripiton={
							<>
								{
									'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident est ipsum sed temporibus, iste adipisci esse amet explicabo impedit qui in aspernatur. Animi vel aliquid eius hic tempora eos voluptatem!'
								}{' '}
								<button className={styles.button} onClick={() => setIsModalOpen(true)}>Czytaj wiecej</button>
							</>
						}
						price={250}
						time={60}
						imageUrl='https://cdn.pixabay.com/photo/2024/01/10/16/22/man-8499961_1280.jpg'
						sessionTitle='Konsultacja'
						term={term}
					/>
					<BookForm selectTermHandler={selectTermHandler} />
				</div>
			</Container>
			{isModalOpen && (
				<Modal
					title='Wszystkie dostępne sesje'
					closeHandler={() => setIsModalOpen(false)}>
					<SessionCard
						title='Konsultacja z ekspertem'
						time={60}
						price={500}
						description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fu...'
					/>
					<SessionCard
						title='Wspólne programowanie'
						time={60}
						price={500}
						description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fu...'
					/>
				</Modal>
			)}
		</>
	);
};

export default BookSession;
