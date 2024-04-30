import React from 'react';
import paths, {PathValue} from "./paths";
import {ReactNode} from "react";
// Libraries
import {Navigate} from 'react-router-dom';
// NEW Screens
import HomeScreen from './pages/app/HomePage/HomePage';
import Settings from './pages/app/Settings/Settings';
import SearchMentors from './pages/app/SearchMentors/SearchMentors';
import BookSession from './pages/app/BookSession/BookSession';
import Profile from './pages/app/Profiles/Profile';
import Schedules from './pages/app/Schedules/Schedules';
import ScheduleForm from './pages/app/Schedules/screens/ScheduleForm/ScheduleForm';
import SessionForm from './pages/app/Schedules/screens/SessionForm/SessionForm';
import RegisterMentorView from "./pages/unauthorized/RegisterMentorView/RegisterMentorView";
import RegisterMenteeView from "./pages/unauthorized/RegisterMenteeView/RegisterMenteeView";
// Screens
import HelpScreen from './pages/app/HelpView';
import Raports from './pages/app/Raports/Raports';
import Underconstruction from './pages/Underconstruction';
import CalendarView from './pages/app/CalendarView/CalendarView';
import MentoringAndSessionDashboard from './pages/app/MentoringAndSessionDashboard/MentoringAndSessionDashboard';
import MeetingSchedule from './pages/app/MeetingScheduleView/MeetingSchedule';
import AccountView from './pages/app/AccountView/AccountView';
import AccountSettlement from './pages/app/AccountSettlement/AccountSettlement';
import MessagesView from './pages/app/MessagesView/MessagesView';
import SchedulesView from './pages/app/SchedulesView';
import CreateMentorPlan from './pages/app/MentoringAndSessionDashboard/CreateMentorPlan';
import CreateSingleSession from './pages/app/MentoringAndSessionDashboard/CreateSingleSession';
import BookSuccess from './pages/app/BookSessionView/views/BookSuccess';

import RemindPasswordView from "./pages/unauthorized/RemindPasswordView/RemindPasswordView";
import LoginView from "./pages/unauthorized/LoginView/LoginView";
import PasswordResetLinkSentView from "./pages/unauthorized/PasswordResetLinkSentView/PasswordResetLinkSentView";
import SetNewPasswordView from "./pages/unauthorized/SetNewPasswordView/SetNewPasswordView";
import {LayoutVersion} from "@customTypes/layoutVersion";
// import LoggedProfile from "./pages/app/LoggedUserProfile/LoggedProfile";

type Route = {
    id: string;
    path: PathValue | string; // TODO remove string when all paths are moved to paths.ts;
    element: ReactNode;
    isProtected?: boolean;
    layoutVersion: LayoutVersion;
};

const routesRaw: Omit<Route, 'id'>[] = [
    {
        path: paths.root,
        element: <Navigate to='/home' />,
        layoutVersion: 'none',
    },
    {
        path: paths.login,
        element: <LoginView />,
        layoutVersion: 'auth',
    },
    {
        path: paths.remindPassword,
        element: <RemindPasswordView />,
        layoutVersion: 'auth',
    },
    {
        path: paths.setNewPassword,
        element: <SetNewPasswordView />,
        layoutVersion: 'auth',
    },
    {
        path: paths.passwordResetLinkSent,
        element: <PasswordResetLinkSentView />,
        layoutVersion: 'auth',
    },
    {
        path: paths.home,
        element: <HomeScreen />,
        isProtected: true,
        layoutVersion: 'default',
    },
    {
        path: paths.settings,
        element: <Settings />,
        isProtected: true,
        layoutVersion: 'default',
    },
    {
        path: paths.searchMentors,
        element: <SearchMentors />,
        layoutVersion: 'default',
        isProtected: true,
    },
    // {
    // // 	id: 'route05',
    // 	path: '/create-mentor',
    // 	element: <PitchDeckCreatorScreen />,
    // 	isProtected: true,
    // },
    {
        path: paths.userProfile,
        element: <Profile />,
        layoutVersion: 'simple',
        isProtected: true,
    },
    {
        path: paths.sessionBook,
        element: <BookSession />,
        layoutVersion: 'simple',
        isProtected: true,
    },
    {
        path: paths.sessionBookPayment,
        element: <BookSession payment />,
        layoutVersion: 'simple',
        isProtected: true,
    },
    {
        path: paths.schedules,
        element: <Schedules />,
        layoutVersion: 'default',
        isProtected: true,
    },
    {
        path: paths.schedulesAddSchedule,
        element: <ScheduleForm />,
        layoutVersion: 'default',
        isProtected: true,
    },
    {
        path: paths.schedulesEditSchedule,
        element: <ScheduleForm />,
        layoutVersion: 'default',
        isProtected: true,
    },
    {
        path: paths.schedulesAddSession,
        element: <SessionForm />,
        layoutVersion: 'default',
        isProtected: true,
    },
    {
        path: paths.schedulesEditSession,
        element: <SessionForm />,
        layoutVersion: 'default',
        isProtected: true,
    },
    // {
    // // 	id: 'route13',
    // 	path: '/session-details/:id/book',
    // 	element: <BookSessionScreen />,
    // 	isProtected: true,
    // },
    // {
    // // 	id: 'route14',
    // 	path: '/session-details/:mentorID',
    // 	element: <SessionDetailsScreen />,
    // 	isProtected: true,
    // },
    {
        path: paths.businessPartner,
        element: <Underconstruction />,
        isProtected: true,
        layoutVersion: 'none',
    },
    {
        path: paths.help,
        element: <HelpScreen />,
        isProtected: true,
        layoutVersion: 'none',
    },
    {
        path: paths.underConstruction,
        element: <Underconstruction />,
        layoutVersion: 'none',
    },
    {
        path: paths.calendar,
        element: <CalendarView />,
        isProtected: true,
        layoutVersion: 'none',
    },
    {
        path: paths.sessionsMentoring,
        element: <MentoringAndSessionDashboard />,
        isProtected: true,
        layoutVersion: 'none',
    },
    {
        path: paths.scheduleMeeting,
        element: <MeetingSchedule />,
        isProtected: true,
        layoutVersion: 'none',
    },
    {
        path: paths.accountView,
        element: <AccountView />,
        isProtected: true,
        layoutVersion: 'none',
    },
    {
        path: paths.createMentoring,
        element: <CreateMentorPlan />,
        isProtected: true,
        layoutVersion: 'none',
    },
    {
        path: paths.createSession,
        element: <CreateSingleSession />,
        isProtected: true,
        layoutVersion: 'none',
    },
    {
        path: paths.reports,
        element: <Raports />,
        isProtected: true,
        layoutVersion: 'none',
    },
    {
        path: paths.accountSettlements,
        element: <AccountSettlement />,
        isProtected: true,
        layoutVersion: 'none',
    },
    {
        path: paths.messages,
        element: <MessagesView />,
        isProtected: true,
        layoutVersion: 'none',
    },
    {
        path: paths.schedules,
        element: <SchedulesView />,
        isProtected: true,
        layoutVersion: 'none',
    },
    {
        path: paths.bookSuccess,
        element: <BookSuccess />,
        isProtected: true,
        layoutVersion: 'none',
    },
    {
        path: paths.loggedUserProfile,
        element: <Profile />,
        layoutVersion: 'simple',
        isProtected: true,
    },
    {
        path: paths.registerMentor,
        element: <RegisterMentorView />,
        layoutVersion: 'none',
    },
    {
        path: paths.registerMentee,
        element: <RegisterMenteeView/>,
        layoutVersion: 'none',
    },
];

// Add id to each route
// I'm not sure about purpose of this id, but some of them were duplicated, so I added unique id to each route
const routes = routesRaw.map((route, index) => ({...route, id: `route${index}`}));

export default routes;
