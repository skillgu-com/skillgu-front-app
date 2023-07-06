import React, {useEffect, useState} from 'react';
import Card from '../../../component/Card';
import AppLayout from '../../../component/AppLayout';
import {
	getAllClientUsers,
	getClientUser,
} from '../../../services/UserProfileService';
import HeroHeader from '../../../component/HeroHeader';
import investors from '../../../assets/img/galaxy.png';
import MentorCard from '../../../component/Cards/MentorCard/MentorCard';

const MentorScreen = () => {
	let [users, setUsers] = useState([]);
	useEffect(() => {
		getAllClientUsers()
			.then((response) => {
				setUsers(response.data);
			})
			.catch((error) => {
				throw new Error(error.message);
			});
	}, []);

	return (
		<AppLayout>
			<HeroHeader title='Mentorzy' image={<img src={investors} alt='mentors' />} />
			<section className='d-flex flex-wrap'>
				{/* {users?.map((element) => { */}
					{/* return ( */}
						<MentorCard
						id={1}
						name={'Tester'}
						surname={'Testowicz'}
						profileImg={'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg'}
						specialization={'Senior Full-Stack Developer'}
						specializationDescription={'Opis doświadczenia w danych technologiach / dziedzinach itp.'}
						// contactOptions={}
						reviews={4}
						reviewsAmount={21}
						description={'desc'}
						skills={['IT', 'Frontend', 'Backend']}
						monthlyPrice={223}
						// expectations={}
						quickResponder={true}
						trail={3}
						/>
					{/* ); */}
				{/* })} */}
			</section>
		</AppLayout>
	);
};

export default MentorScreen;
