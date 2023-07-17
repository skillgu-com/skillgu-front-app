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
					{/* return (     */}
						<MentorCard
						id={1}
						name={'Jerzy'}
						surname={'Adamczyk'}
						profileImg={'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg'}
						specialization={'Dyrektor Marketingu w D4 Cloud'}
						specializationDescription={'Ekspert ds. wzrostu organicznego i płatnego z ponad 10-letnim doświadczeniem w agencjach i firmach w marketingu cyfrowym.'}
						contactOptions={{chat: true, call: true, handsOn: true}}
						reviews={4}
						reviewsAmount={21}
						description={'Jestem doświadczonym ekspertem ds. marketingu cyfrowego z ogromnym doświadczeniem, którym mogę się z Tobą podzielić.\n' +
							'\n' +
							'W swojej karierze byłem szefem płatnego marketingu w jednej z największych agencji marketingowych w Wielkiej Brytanii, zatrudniającej ponad 140 pracowników. Pomagałem ludziom rozwijać ich umiejętności i osiągać zarówno cele zawodowe, jak i osobiste poprzez mentoring i prowadzenie ich, gdy tego potrzebowali. Będąc odpowiedzialnym za proces rekrutacji w agencji, jestem w stanie udzielić szczegółowych informacji, jak wypaść na każdej rozmowie kwalifikacyjnej i jak zdobyć wymarzoną pracę, jeśli jest to jeden z Twoich celów.'}
						skills={['Marketing', 'digital Marketing', 'Marketing digital' ,'Marketing Google', 'Automation', 'SEO', 'Strategy Career'
							]}
						monthlyPrice={223}
						expectations={['Jeden z naszych najlepszych mentorów, najlepsza obsługa i szybkie odpowiedzi',
							'Nieograniczony czat, e-mail lub SMS z mentorem, w granicach.',
						'Do 4 połączeń miesięcznie']}
						quickResponder={true}
						trail={3}
						/>
				<MentorCard
					id={2}
					name={'Jan'}
					surname={'Kowalski'}
					profileImg={'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg'}
					specialization={'Specjalista ds. Finansowych'}
					specializationDescription={'Doświadczony analityk finansowy z bogatym doświadczeniem w zarządzaniu portfelem inwestycyjnym.'}
					contactOptions={{chat: true, call: true, handsOn: true}}
					reviews={5}
					reviewsAmount={12}
					description={'Jestem specjalistą ds. finansowych, który chętnie podzieli się swoją wiedzą i doświadczeniem z Tobą. Posiadam wieloletnie doświadczenie w analizie finansowej, zarządzaniu portfelem inwestycyjnym i doradztwie inwestycyjnym. Mogę pomóc Ci zrozumieć zawiłości rynków finansowych, planować swoją przyszłość finansową i podejmować mądre decyzje inwestycyjne.'}
					skills={['Analiza finansowa', 'Zarządzanie portfelem inwestycyjnym', 'Doradztwo inwestycyjne', 'Rynki finansowe']}
					monthlyPrice={300}
					expectations={['Szybka odpowiedź na pytania i wsparcie', 'Regularne sesje mentoringowe', 'Dostęp do materiałów edukacyjnych']}
					quickResponder={true}
					trail={5}
				/>
					{/* ); */}
				{/* })} */}
			</section>
		</AppLayout>
	);
};

export default MentorScreen;
