import React, {useEffect, useState} from 'react';
import '@splidejs/react-splide/css/core';
// Default theme
import '@splidejs/splide/css';
import {Splide, SplideSlide} from '@splidejs/react-splide';
//Components
import AppLayout from '../../../component/AppLayout';
import {Tabs, Tab, Box, Typography, Avatar, Tooltip} from '@mui/material';
import CustomButton, {buttonTypes} from '../../../component/CustomButton';
import Card from '../../../component/Card';
import {preparePitchDeckData} from '../../../services/PitchDeckCreationService';
import {useParams} from 'react-router-dom';
import 'react-gallery-carousel/dist/index.css';
import {sliderConfig} from '../../../config/slider';
import Carousel from 'react-gallery-carousel';
import InvestCard from '../../../component/InvestCard';
import Modal from '../../../component/Modal';
import {Grid, TextField, FormLabel, Chip} from '@mui/material';
import money from '../../../assets/img/money.png';
import CardsSlider from '../../../component/CardsSlider';

function TabPanel(props) {
	const {children, value, index, ...other} = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && (
				<Box sx={{p: 3}}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const PitchdeckScreen = () => {
	let {pitchDeckURL} = useParams();


	let [pitchDeck, setPitchDeck] = useState(null);
	let [investmentAmount, setInvestmentAmount] = useState(null);
	let [closeModal, setCloseModal] = useState(false);

	useEffect(() => {
		preparePitchDeckData(pitchDeckURL).then((response) => {
			setPitchDeck(response.data);
			console.log(response.data)

		});
	}, []);

	const [value, setValue] = useState(0);
	const [investmentAmountId, setInvestmentAmountId] = useState(1);

	const handleChangePrice = (id, value) => {
		setInvestmentAmountId(id);
		setInvestmentAmount(value);
	};

	const handleChange = (_event, newValue) => {
		setValue(newValue);
	};

	return (
		<AppLayout>
			<h2 className='app__title--huge'>{pitchDeck?.pitchDeckTitle}</h2>
			<section className='app-section app-section--mt-0 app-section--mb-0'>
				<div className='presentation d-flex flex-wrap justify-content-between align-items-center w-100'>
					{/* Investor profile */}
					<div className='presentation__profile d-flex align-items-center col-12 col-md-auto col-lg-12 col-xl-auto'>
						<Tooltip title='Account settings'>
							<Avatar sx={{width: 32, height: 32}}>M</Avatar>
						</Tooltip>
						<p className='px-1'>
							Imię Nazwisko <span className='d-block app__additional-info'></span>
						</p>
					</div>
					{/* Invest target */}
					<div className='presentation__invest-target'>
						<div className='invest-target__progress-bar'>
							<div className='progress-bar__inner'>
								<span
									className='progress-bar__inner-value'
									style={{width: `calc(120000/200000 * 100%)`}}>
									{pitchDeck?.companyAssetMinMax} zł
								</span>
							</div>
						</div>
						<p className='app__additional-info mt-1'>
							Cel finnansowania: <span>{pitchDeck?.companyAssetMinMax} zł</span>
						</p>
					</div>
					{/* Invest button */}
					<div className='column align-items-center'>
						<Modal
							trigger={<CustomButton as={buttonTypes.button}>Zainwestuj</CustomButton>}
							close={closeModal}
							setClose={() => setCloseModal(false)}>
							<div className='pitchdeck-modal'>
								<Grid
									container
									spacing={4}
									alignItems='center'
									justifyContent='space-around'>
									<Grid
										item
										xs={12}
										md={10}
										className='d-flex align-items-start pitchdeck-modal__header'
										style={{
											gap: 10,
										}}>
										<img src={money} alt='banknoty' />
										<div className='pitchdeck-modal__text'>
											<h3 className='app__title'>Zostań inwestorem!</h3>
											<p className='app__text'>
												Wybierz jedną z wymaganych kwot inwestycyjnych lub wpisz własną
												kwotę i sprawdź ile możesz zarobić!
											</p>
										</div>
									</Grid>
									<Grid item xs={12} md={10}>
										<hr className='line-separator' />
									</Grid>
									<Grid
										item
										xs={12}
										md={10}
										className='d-flex'
										style={{
											gap: 10,
										}}>
										<Chip
											label='120 000 zł'
											variant={investmentAmountId === 1 ? 'filled' : 'outlined'}
											onClick={() => handleChangePrice(1, 120000)}
											style={{fontSize: 16}}
										/>
										<Chip
											label='300 000 zł'
											variant={investmentAmountId === 2 ? 'filled' : 'outlined'}
											onClick={() => handleChangePrice(2, 300000)}
											style={{fontSize: 16}}
										/>
										<Chip
											label='Inna kwota'
											variant={investmentAmountId === 0 ? 'filled' : 'outlined'}
											onClick={() => handleChangePrice(0, '')}
											style={{fontSize: 16}}
										/>
									</Grid>
									{investmentAmountId === 0 && (
										<Grid item xs={12} md={10}>
											<FormLabel id='investmentAmount' className='field__label'>
												Podaj kwotę inwestycji
											</FormLabel>
											<TextField
												type='number'
												autoComplete='investmentAmount'
												name='investmentAmount'
												required
												fullWidth
												id='investmentAmount'
												placeholder='120 000'
												autoFocus
												value={investmentAmountId === 0 ? investmentAmount : ''}
												onChange={(e) => {
													setInvestmentAmountId(0);
													setInvestmentAmount(e.target.value);
												}}
											/>
										</Grid>
									)}
									<Grid item xs={12} md={10}>
										<p>
											Chcesz zainwestować: <strong>{+investmentAmount} zł</strong>
										</p>
									</Grid>
								</Grid>
								<CustomButton
									as={buttonTypes.button}
									_onClick={() => setCloseModal(true)}>
									Zatwierdź
								</CustomButton>
							</div>
						</Modal>

						<p className='app__additional-info mt-1'>Inwestorów: 12</p>
					</div>
				</div>

				<div className='d-flex align-items-center flex-wrap my-3'>
					<Card
						type='info'
						title='Lokalizacja'
						subtitle={pitchDeck?.location}
						image='https://www.freeiconspng.com/thumbs/localization-icon/red-map-localization-icon-5.png'
						classes='col-12 col-sm-6 col-xxl-3'
					/>
					<Card
						type='info'
						title='Budżet'
						// subtitle={`${pitchDeck?.companyAssetMin} - ${pitchDeck?.companyAssetMax}`}
						subtitle={pitchDeck?.companyAssetMinMax}
						image='https://cdn.pixabay.com/photo/2014/07/23/16/57/bank-robbery-400300_960_720.png'
						classes='col-12 col-sm-6 col-xxl-3'
					/>
					<Card
						type='info'
						title='Rola'
						subtitle={pitchDeck?.email}
						image='https://cdn.pixabay.com/photo/2021/07/25/08/07/administration-6491208_960_720.png'
						classes='col-12 col-sm-6 col-xxl-3'
					/>
					<Card
						type='info'
						title='Branża'
						subtitle={pitchDeck?.industry}
						image='https://cdn.pixabay.com/photo/2013/07/12/12/14/tool-145375_960_720.png'
						classes='col-12 col-sm-6 col-xxl-3'
					/>
					<Card
						type='info'
						title='Konkurencja'
						subtitle={pitchDeck?.competitionExists ? 'TAK' : 'BRAK'}
						image='https://cdn.pixabay.com/photo/2013/07/12/12/14/tool-145375_960_720.png'
						classes='col-12 col-sm-6 col-xxl-3'
					/>
					<Card
						type='info'
						title='Forma działności'
						subtitle={pitchDeck?.businessType}
						image='https://cdn.pixabay.com/photo/2013/07/12/12/14/tool-145375_960_720.png'
						classes='col-12 col-sm-6 col-xxl-3'
					/>
					<Card
						type='info'
						title='Zabezpieczenie'
						subtitle={pitchDeck?.financialProtection}
						image='https://cdn.pixabay.com/photo/2013/07/12/12/14/tool-145375_960_720.png'
						classes='col-12 col-sm-6 col-xxl-3'
					/>
				</div>
			</section>

			<Box sx={{width: '100%'}}>
				<Box sx={{borderBottom: 1, borderColor: 'divider'}}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label='basic tabs example'>
						<Tab label='Opis oferty' {...a11yProps(2)} />
						<Tab label='Opis rozwiązania' {...a11yProps(3)} />
						<Tab label='Opis modelu biznesowego' {...a11yProps(0)} />
						<Tab label='Oferta dla inwestora' {...a11yProps(1)} />
					</Tabs>
				</Box>
				<TabPanel className='tab-panel' value={value} index={0}>
					<h3 className='app-section__title text-left'>Opis oferty</h3>
					<p className='app__text text-left'>{pitchDeck?.offerDescription}</p>
				</TabPanel>
				<TabPanel className='tab-panel' value={value} index={1}>
					<h3 className='app-section__title text-left'>Opis rozwiązania</h3>
					<p className='app__text text-left'>{pitchDeck?.solutionDescription}</p>
				</TabPanel>
				<TabPanel className='tab-panel' value={value} index={2}>
					<h3 className='app-section__title text-left'>Opis modelu biznesowego</h3>
					<p className='app__text text-left'>
						{pitchDeck?.businessModelDescription}
					</p>
				</TabPanel>
				<TabPanel className='tab-panel' value={value} index={3}>
					<h3 className='app-section__title text-left'>Oferta dla inwestora</h3>
					<p className='app__text text-left'>
						{pitchDeck?.suggestionOfferDescription}
					</p>
				</TabPanel>
			</Box>

			<section className='app-section'>
				<h3 className='app-section__title'>Wideo</h3>
				{/* TODO: Add vimeo supprot */}
				<div className='d-flex justify-content-center'>
					<iframe
						style={{
							minWidth: 320,
							maxWidth: 650,
							width: '90vw',
							height: '30vw',
							minHeight: 400,
							maxHeight: 700,
						}}
						src='https://www.youtube.com/embed/oQNhp46Y0Fg'
						title='YouTube video player'
						frameborder='0'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
						allowfullscreen></iframe>
				</div>
			</section>
			<section className='app-section'>
				<h3 className='app-section__title'>Prezentacja oferty</h3>
				<Carousel
					images={[
						{
							src: 'https://cdn.pixabay.com/photo/2015/05/15/01/48/computer-767776__480.jpg',
						},
						{
							src: 'https://cdn.pixabay.com/photo/2014/12/08/21/25/innovation-561388__480.jpg',
						},
						{
							src: 'https://cdn.pixabay.com/photo/2015/05/15/01/48/computer-767776__480.jpg',
						},
						{
							src: 'https://cdn.pixabay.com/photo/2014/12/08/21/25/innovation-561388__480.jpg',
						},
						{
							src: 'https://cdn.pixabay.com/photo/2015/05/15/01/48/computer-767776__480.jpg',
						},
						{
							src: 'https://cdn.pixabay.com/photo/2014/12/08/21/25/innovation-561388__480.jpg',
						},
						{
							src: 'https://cdn.pixabay.com/photo/2015/05/15/01/48/computer-767776__480.jpg',
						},
						{
							src: 'https://cdn.pixabay.com/photo/2014/12/08/21/25/innovation-561388__480.jpg',
						},
					]}
					style={{
						minWidth: 320,
						maxWidth: 650,
						width: '90vw',
						height: '30vw',
						minHeight: 400,
						maxHeight: 700,
						margin: '0 auto',
					}}
				/>
			</section>
			<section className='app-section'>
				<h3 className='app-section__title'>Pliki do pobrania</h3>
				<div className='d-flex flex-wrap'>
					<Splide options={sliderConfig} className='app-slider'>
						<SplideSlide>
							<Card
								type='download'
								title='Plik'
								subtitle='1.2 mb'
								image='https://icon-library.com/images/free-icon-file/free-icon-file-29.jpg'
								classes='col-12 col-sm-6 col-lg-4'
							/>
						</SplideSlide>
						<SplideSlide>
							<Card
								type='download'
								title='Plik'
								subtitle='1.2 mb'
								image='https://icon-library.com/images/free-icon-file/free-icon-file-29.jpg'
								classes='col-12 col-sm-6 col-lg-4'
							/>
						</SplideSlide>
						<SplideSlide>
							<Card
								type='download'
								title='Plik'
								subtitle='1.2 mb'
								image='https://icon-library.com/images/free-icon-file/free-icon-file-29.jpg'
								classes='col-12 col-sm-6 col-lg-4'
							/>
						</SplideSlide>
						<SplideSlide>
							<Card
								type='download'
								title='Plik'
								subtitle='1.2 mb'
								image='https://icon-library.com/images/free-icon-file/free-icon-file-29.jpg'
								classes='col-12 col-sm-6 col-lg-4'
							/>
						</SplideSlide>
						<SplideSlide>
							<Card
								type='download'
								title='Plik'
								subtitle='1.2 mb'
								image='https://icon-library.com/images/free-icon-file/free-icon-file-29.jpg'
								classes='col-12 col-sm-6 col-lg-4'
							/>
						</SplideSlide>
					</Splide>
				</div>
			</section>
			<section className='app-section'>
				<h3 className='app-section__title'>Nasi pracownicy</h3>
				<div className='d-flex flex-wrap'>
					<Splide options={sliderConfig} className='app-slider'>
						<SplideSlide>
							<Card
								type='employee'
								// title={pitchDeck.businessModelDescription}
								// title={pitchDeck.firstName}
								// subtitle={pitchDeck.role}
								image='https://cdn.pixabay.com/photo/2018/04/27/03/50/portrait-3353699_960_720.jpg'
								classes='col-12 col-sm-6 col-lg-4'
							/>
						</SplideSlide>
						<SplideSlide>
							<Card
								type='employee'
								// title={pitchDeck.businessModelDescription}
								// title={pitchDeck.firstName}
								// subtitle={pitchDeck.role}
								image='https://cdn.pixabay.com/photo/2018/04/27/03/50/portrait-3353699_960_720.jpg'
								classes='col-12 col-sm-6 col-lg-4'
							/>
						</SplideSlide>
						<SplideSlide>
							<Card
								type='employee'
								// title={pitchDeck.businessModelDescription}
								// title={pitchDeck.firstName}
								// subtitle={pitchDeck.role}
								image='https://cdn.pixabay.com/photo/2018/04/27/03/50/portrait-3353699_960_720.jpg'
								classes='col-12 col-sm-6 col-lg-4'
							/>
						</SplideSlide>
						<SplideSlide>
							<Card
								type='employee'
								// title={pitchDeck.businessModelDescription}
								// title={pitchDeck.firstName}
								// subtitle={pitchDeck.role}
								image='https://cdn.pixabay.com/photo/2018/04/27/03/50/portrait-3353699_960_720.jpg'
								classes='col-12 col-sm-6 col-lg-4'
							/>
						</SplideSlide>
						<SplideSlide>
							<Card
								type='employee'
								// title={pitchDeck.businessModelDescription}
								// title={pitchDeck.firstName}
								// subtitle={pitchDeck.role}
								image='https://cdn.pixabay.com/photo/2018/04/27/03/50/portrait-3353699_960_720.jpg'
								classes='col-12 col-sm-6 col-lg-4'
							/>
						</SplideSlide>
						<SplideSlide>
							<Card
								type='employee'
								// title={pitchDeck.businessModelDescription}
								// title={pitchDeck.firstName}
								// subtitle={pitchDeck.role}
								image='https://cdn.pixabay.com/photo/2018/04/27/03/50/portrait-3353699_960_720.jpg'
								classes='col-12 col-sm-6 col-lg-4'
							/>
						</SplideSlide>
					</Splide>
				</div>
			</section>
			<section className='app-section'>
				<h3 className='app-section__title'>Podobne oferty</h3>
				<CardsSlider
						as={InvestCard}
						items={[
							{
								title: 'MMW',
								location: 'Warszawa, Kraków, Gdańsk, Szczecin',
								industry: 'IT',
								roi: 10,
								noFollow: true,
							},
							{
								title: 'MMW',
								location: 'Warszawa, Kraków, Gdańsk, Szczecin',
								industry: 'IT',
								roi: 10,
								noFollow: true,
							},
						]}
					/>
			</section>
		</AppLayout>
	);
};

export default PitchdeckScreen;
