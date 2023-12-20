// Libraries
import React from 'react';
// Components
import Navbar from './components/Navbar/Navbar';
// Types
import {Common} from '../../types/main';

const AppLayout = (props: Common) => {
	const {children} = props;
	return (
		<>
			<Navbar />
			{children}
		</>
	);
};

export default AppLayout;
