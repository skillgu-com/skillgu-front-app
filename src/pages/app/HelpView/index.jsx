import React, {useContext, useState} from 'react';
import AppLayout from '../../../component/AppLayout';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import InvestCard from '../../../component/InvestCard';
import donut from '../../../assets/img/donut.svg';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../../../context/AuthContextProvider';
import HeroHeader from '../../../component/HeroHeader';
import tree from '../../../assets/img/one-tree.jpg';

function TabPanel(props) {
	const {children, value, index, ...other} = props;

	const context = useContext(AuthContext);

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

const HelpScreen = () => {
	const [value, setValue] = useState(0);

	const handleChange = (_event, newValue) => {
		setValue(newValue);
	};

	return (
		<AppLayout>
			<HeroHeader title='Pomoc' image={<img src={tree} alt='drzewo' />} />
			<Box sx={{width: '100%'}} marginTop={4}>
				<Box sx={{borderBottom: 1, borderColor: 'divider'}}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label='basic tabs example'>
						<Tab label='Pitchdeck w 9 krokach' {...a11yProps(2)} />
						<Tab label='Terminologia startupów' {...a11yProps(3)} />
						<Tab label='Opis modelu biznesowego' {...a11yProps(0)} />
						<Tab label='Oferta dla inwestora' {...a11yProps(1)} />
					</Tabs>
				</Box>
				<TabPanel className='tab-panel' value={value} index={0}>
					<h3 className='app-section__title text-left'>Pitchdeck w 9 krokach</h3>
					<p className='app__text text-left'>
						<ul>
							<li>Name, Logo, one liner explaining what you do</li>
							<li>
								Sell the problem, catering to your audience and how much they know
							</li>
							<li>
								Sell the solution, using simple explanation and presentation visuals
							</li>
							<li>“Market opportunity” (size/growth) use CAGR</li>
							<li>
								Traction (revenues/customer growth + great cofounders + market research)
								using a timeline
							</li>
							<li>
								Explain business model (only realistic models + no major forecasts)
							</li>
							<li>
								Why are you the team to do this? Also address your weaknesses and share
								solutions
							</li>
							<li>
								the punchline/conclusion (what can investor offer?
								Expertise/money/network)
							</li>
						</ul>
						<br />
						Check also video to better understand: <br />
						https://www.youtube.com/watch?v=jYWF64Um7pw
					</p>
				</TabPanel>
				<TabPanel className='tab-panel' value={value} index={1}>
					<h3 className='app-section__title text-left'>Opis rozwiązania</h3>
					<p className='app__text text-left'>
						Accelerator – An accelerator is a support network – sometimes virtual and
						some other times in a physical location, that concentrates professional
						mentoring, services and expertise available for the startups “accelerated”
						there. The aim is to make the company grow faster and make faster
						ideations, tests and expose founders and teams to other startups in the
						same structure. Accelerators may or may not take equity and invest hard
						cash. Agile – Agile web development refers to a particular way of
						performing tasks. In an agile team, programmers will work according to
						sprints, that can be of weekly or biweekly periodicity. Often having the
						phases of design, development, testing, deployment and review, those
						sprints are one of the kernels of modern software development methodology.
						Algorithm – An algorithm is a sequence of steps for accomplishing an
						objective, with instructions documented for it. It comes from programming
						and Mathematics vocabulary. API – An Application Programming Interface
						enables two different programs to communicate with each other as a
						translator allows people speaking two different languages understand each
						other. Software engineers and developers can use the code on the APIs to
						build modules and apps within other apps and pay only for what they use,
						without the need to buy infrastructure and maintain it. Bleeding Edge –
						When your startup is developing or selling a “frontier technology” or a
						disruptive new way of thinking and doing things, the company is on the
						bleeding edge. Customer journey – Customer journey is an expression that
						describes each and every point of contact and interaction a customer has
						with a business, a product or a service. From visiting a website to
						getting interested and buying a product, up to post-sales support.
						Deliverable – A deliverable is a measured result, a product or an add-on
						that is planned and implemented in any project. Exit Strategy – An exit
						strategy is a plan that may be executed when a startup is not performing
						well, as a stop loss measure. Or it can be also for the case where a
						targeted profitability level has been reached. Other situations include
						when significant market conditions change due to force majeure, regulatory
						reasons, liability lawsuits or owner’s retirement. A classic example for
						that is an angel investor who plans an exit strategy through an IPO –
						initial public offering. Freemium – “Freemium” is built on the words free
						and premium, and it is a method where a startup offers free content or
						product licenses in order to acquire customers and users. Usually, the
						free version of the product or service is limited in scope compared to the
						fully fledged paid option, and it serves to entice the interest of the
						potential client. Iterate – The exercise of thinking and prototyping
						add-ons and changes to a product, service or offer in your portfolio.
						Intrapreneur – An intrapreneur is effectively an entrepreneur but who
						works within the corporate structure. They lead innovative projects which
						can include launching new services or products within this usually strict
						corporate structure. Low Hanging Fruit – Startup companies need to add
						value to their offerings as much as they can. When teams talk about a low
						hanging fruit, it means they are speaking about a product that is ready or
						almost ready to be offered and has immediate potential for monetization
						and creating cashflow. Mobile-first – When a product is designed as
						mobile-first, it prioritizes mobile devices as their first screens, rather
						than laptops and desktops. The product is built for the small screen and
						then often responsive, meaning it adapts to different sizes and formats.
						Ping – Coming out of the telecom and messaging world, this word means to
						contact someone – i.e.: “You might want to ping them immediately about
						this issue”. It also means the time elapsed between sending a message and
						getting an answer. Retargeting – Retargeting it the way companies try to
						attract people who already showed interest in their product through
						visiting their websites. Banners, e-mail sequences and P2P messaging are
						channels used to expose the potential customer to the specific product
						again and try to convert him/her into a client. SaaS – The SaaS acronym
						means software-as-a-service. Instead of investing in a lot of
						infrastructure and high costs, one can scale up according to his/her
						needs, while paying a monthly subscription that is proportional to the
						software usage or traffic Scale Up – Scale-up is when the company already
						has enough recurring revenue and it can maintain itself. It is also about
						replicating the business in other geographies and sectors, while expanding
						the client/user base. Seed Funding – Often seen as the first investment of
						a startup, it may come from angel investors or from family and friends,
						with the intention of completing an MVP or starting more serious marketing
						and sales campaigns. Companies use seed money to acquire resources, hire
						teams and to build a product. Stealth Mode – “Stealth mode” is an
						expression used to describe the development of a product in secret. When
						choosing stealth mode, a company often wants to surprise the competition
						and to protect the intellectual property being built. Wireframe –
						Wireframes are diagrams used by designers to communicate to developers how
						a website or an app shall be structured, and it serves as the blueprint
						upon which the code is developed. It has layout, graphic elements’
						locations, interface touch points and it focus on functionality, not
						beauty.
					</p>
				</TabPanel>
				<TabPanel className='tab-panel' value={value} index={2}>
					<h3 className='app-section__title text-left'>Opis modelu biznesowego</h3>
					<p className='app__text text-left'></p>
				</TabPanel>
				<TabPanel className='tab-panel' value={value} index={3}>
					<h3 className='app-section__title text-left'>Oferta dla inwestora</h3>
					<p className='app__text text-left'></p>
				</TabPanel>
			</Box>
		</AppLayout>
	);
};

export default HelpScreen;
