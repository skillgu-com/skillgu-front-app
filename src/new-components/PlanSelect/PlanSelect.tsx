// Libraries
import React, {useState} from 'react';
// Components
import Bookmarks from './components/Bookmarks/Bookmarks';
import Modal from '../Modal/Modal';
import SessionDescription from './components/SessionDescription/SessionDescription';
import SessionForm from './components/SessionForm/SessionForm';
// Styles
import styles from './PlanSelect.module.scss';

export enum PlanTypes {
	Session = 'Session',
	Mentoring = 'Mentoring',
}

const PlanSelect = () => {
	const [planType, setPlanType] = useState(PlanTypes.Session);
	const [showModal, setShowModal] = useState(false);

	const changeTypeHandler = (type: PlanTypes) => setPlanType(type);

	const toggleModalHandler = (value?: boolean) =>
		setShowModal(value ?? !showModal);

	return (
		<>
			<div className={styles.wrapper}>
				<Bookmarks changeTypeHandler={changeTypeHandler} currentType={planType} />
				<div className={styles.content}>
				{planType === PlanTypes.Session?	<SessionForm
						sessions={[{id: '01', label: <>test</>}]}
						openModalHandler={() => toggleModalHandler(true)}
					/> : <></>}
					<SessionDescription />
				</div>
			</div>
			{showModal && (
				<Modal
					title='Wszystkie dostępne sesje'
					closeHandler={() => toggleModalHandler(false)}></Modal>
			)}
		</>
	);
};

export default PlanSelect;
