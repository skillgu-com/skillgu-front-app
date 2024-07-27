// Libraries
import React, { useEffect, useRef, useState } from 'react';
// Context 
import { LayoutProvider, useLayout } from 'src/context/LayoutContext';
// Components
import Navbar from './components/Navbar/Navbar';
import TopBar from './components/Topbar/TopBar';
// Types
import {Common} from '../../types/main';
// Styles
import styles from './AppLayout.module.scss';
import { Sidebar } from './components/Sidebar/Sidebar';
import clx from 'classnames'
import { useViewportSize } from 'src/hooks/useViewportSize';


const AppLayoutContent = (props: Common) => {
	const {children} = props;
	const { isSidebarOpen, isInitialized } = useLayout()
	// const { width } = useViewportSize()
	// const widthRef = useRef<number>(0)
    // const [isInitialized, setIsInitialized] = useState(false);

	// useEffect(() => {
    //     if (width && width > 1200 && width !== widthRef.current) {
	// 		handleOpen()
	// 		widthRef.current = width
	// 	}
	// 	setIsInitialized(true)
    // }, [handleOpen, width]);

	return isInitialized ? (
		<>
			<TopBar/>
			<Sidebar />
			<div className={clx(styles.content, {
				[styles.isSidebarOpen]: isSidebarOpen,
			})}>
				
				{/* <Navbar /> */}
				{children}
			</div>
		</>
	) : null;
};

const AppLayout = (props: Common) => {
	return (
		<LayoutProvider>
			<AppLayoutContent {...props} />
		</LayoutProvider>
	);
};

export default AppLayout;
