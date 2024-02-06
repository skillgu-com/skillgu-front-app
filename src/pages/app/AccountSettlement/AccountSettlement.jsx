// Librares
import React from 'react';
// Components
import AppLayout from '../../../component/AppLayout';
import Table from '../../../component/Table/Table';
import HeroHeader from '../../../component/HeroHeader';
// Images
import mount from '../../../assets/img/mount.jpg';

const AccountSettlement = () => {
	return (
		<AppLayout>
			<HeroHeader
				title='Subskrypcje'
				image={<img src={mount} alt='subskrypcje' />}
			/>
			<section>
				<h2 className='app__title'>Bieżące subskrypcje</h2>
				<Table
					headers={[
						{id: 'h01', value: 'Wybrany plan'},
						{id: 'h02', value: 'Miejsca'},
						{id: 'h03', value: 'Cena'},
						{id: 'h06', value: 'Miesięczny koszt'},
					]}
					data={[
						{
							id: 'd01',
							dataRow: [
								{id: 'd01t01', value: 'Pro'},
								{id: 'd01t02', value: 1},
								{id: 'd01t03', value: '59,99 zł'},
								{id: 'd01t04', value: '59.99 zł'},
							],
						},
					]}
				/>
			</section>
			<section>
				<h2 className='app__title'>Faktury</h2>
        <p className="app__text"></p>
				<Table
					headers={[
						{id: 'h01', value: 'Data'},
						{id: 'h02', value: 'Tytuł'},
						{id: 'h03', value: 'Kwota'},
						{id: 'h06', value: ''},
					]}
					data={[
						{
							id: 'd01',
							dataRow: [
								{id: 'd01t01', value: new Date().toLocaleString()},
								{id: 'd01t02', value: new Date().toLocaleString()},
								{id: 'd01t03', value: '200,99 zł'},
								{
									id: 'd01t04',
									value: 'Pobierz PDF',
									link: '/images/myw3schoolsimage.jpg',
									type: 'download',
								},
							],
						},
					]}
				/>
			</section>
		</AppLayout>
	);
};

export default AccountSettlement;
