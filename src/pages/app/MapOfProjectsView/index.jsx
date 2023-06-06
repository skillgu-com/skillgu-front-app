import React, {useEffect, useState} from 'react';
import AppLayout from '../../../component/AppLayout';
import InvestCard from '../../../component/InvestCard';
import {
	searchAllProjects,
	searchByToken,
} from '../../../services/SearchOfProjectsService';
import {useParams, useSearchParams} from 'react-router-dom';
import HeroHeader from '../../../component/HeroHeader';
import bear from '../../../assets/img/bear.jpg';
import CardsSlider from '../../../component/CardsSlider';

function ProjectsMapScreen(props) {
	let [searchResult, setSearchResult] = useState([]);
	const [queryParams, _] = useSearchParams();

	useEffect(() => {
		const searchToken = queryParams.get('search');
		if (searchToken) {
			searchByToken().then((r) =>  {
				setSearchResult(r.data)
			});
		} else {
			searchAllProjects().then((r) => {
				setSearchResult(r.data)
			});
		}
	}, []);


	return (
		<AppLayout>
			<HeroHeader title='Projekty' image={<img src={bear} alt='niedźwiedź' />} />
			<div className='d-flex projects-map'>
				<div className='col-12 projects-map__offers'>
					{!!searchResult?.length && (
						<CardsSlider as={InvestCard} items={searchResult} noMaxHeight={true} />
					)}
				</div>
			</div>
		</AppLayout>
	);
}

export default ProjectsMapScreen;
