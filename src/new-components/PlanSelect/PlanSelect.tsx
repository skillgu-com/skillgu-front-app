// Libraries
import React, {useState} from 'react';
// Components
import Bookmarks from './components/Bookmarks/Bookmarks';
import SessionDescription from './components/SessionDescription/SessionDescription';
import SessionForm from './components/SessionForm/SessionForm';
// Styles
import styles from './PlanSelect.module.scss';

export enum PlanTypes {
	Session = 'Session',
	Mentoring = 'Mentoring',
}

interface PlanSelectProps {
	toggleModalHandler: (isOpen: boolean) => void;
}

const PlanSelect = (props: PlanSelectProps) => {
	const {toggleModalHandler} = props;

	const [planType, setPlanType] = useState(PlanTypes.Session);

	const changeTypeHandler = (type: PlanTypes) => setPlanType(type);

	return (
		<>
			<div className={styles.container}>
				<h4 className={styles.title}>Wybierz plan:</h4>
				<div className={styles.wrapper}>
					<Bookmarks changeTypeHandler={changeTypeHandler} currentType={planType} />
					<div className={styles.content}>
						{planType === PlanTypes.Session ? (
							<SessionForm
								sessions={[
									{id: '01', name: 'Konsultacja z ekspertem', time: 60, price: 250},
									{id: '02', name: 'Wspólne programowanie', time: 60, price: 250},
								]}
								openModalHandler={() => toggleModalHandler(true)}
							/>
						) : (
							<></>
						)}
						<SessionDescription />
					</div>
				</div>
			</div>
		</>
	);
};

export default PlanSelect;
