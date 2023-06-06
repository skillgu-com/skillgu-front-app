import Topbar from '../../component/Navigations/Topbar';
import SectionOne from './sections/SectionOne';
import SectionTwo from './sections/SectionTwo';
import React from 'react';
import SectionThree from './sections/SectionThree';
import SectionBase from './sections/SectionBase';
import SectionWhyWe from './sections/SectionWhyWe';
import SectionCta from './sections/SectionCta';
import Footer from '../../component/Footer';

const LandingPage = () => {
	return (
		<>
			<Topbar />
			<SectionOne />
			<SectionTwo />
			<SectionThree />
			<SectionBase />
			<SectionWhyWe />
			<SectionCta />
			<Footer />
		</>
	);
};

export default LandingPage;
