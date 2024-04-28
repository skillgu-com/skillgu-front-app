import React from 'react';
// Libraries
import {Navigate} from 'react-router-dom';
// NEW Screens
import LoginPage from './pages/LoginPage/LoginPage';
import RemindPasswordPage from './pages/RemindPasswordPage/RemindPasswordPage';
import HomeScreen from './pages/app/HomePage/HomePage';
import Settings from './pages/app/Settings/Settings';
import SearchMentors from './pages/app/SearchMentors/SearchMentors';
import BookSession from './pages/app/BookSession/BookSession';
import Profile from './pages/app/Profiles/Profile';
import Schedules from './pages/app/Schedules/Schedules';
import ScheduleForm from './pages/app/Schedules/screens/ScheduleForm/ScheduleForm';
import SessionForm from './pages/app/Schedules/screens/SessionForm/SessionForm';
import RegisterMentorView from "./pages/app/RegisterMentorView/RegisterMentorView";
import RegisterMenteeView from "./pages/app/RegisterMenteeView/RegisterMenteeView";
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
import paths, {PathValue} from "./paths";
import {ReactNode} from "react";
// import LoggedProfile from "./pages/app/LoggedUserProfile/LoggedProfile";

type Route = {
    id: string;
    path: PathValue | string; // TODO remove string when all paths are moved to paths.ts;
    element: ReactNode;
    hasLayout?: boolean;
    isProtected?: boolean;
    hasSimpleLayout?: boolean;
};

const routesRaw: Omit<Route, 'id'>[] = [
    {
        // id: 'route01',
        path: paths.root,
        element: <Navigate to='/home' />,
    },
    {
        // id: 'route02',
        path: paths.login,
        element: <LoginPage />,
    },
    {
        // id: 'route029',
        path: paths.remindPassword,
        element: <RemindPasswordPage />,
    },
    {
        // id: 'route04',
        path: paths.home,
        element: <HomeScreen />,
        isProtected: true,
        hasLayout: true,
    },
    {
        // id: 'route04',
        path: paths.settings,
        element: <Settings />,
        isProtected: true,
        hasLayout: true,
    },
    {
        // id: 'route09n',
        path: paths.searchMentors,
        element: <SearchMentors />,
        hasLayout: true,
        isProtected: true,
    },
    // {
    // // 	id: 'route05',
    // 	path: '/create-mentor',
    // 	element: <PitchDeckCreatorScreen />,
    // 	isProtected: true,
    // },
    {
        // id: 'route10',
        path: paths.userProfile,
        element: <Profile />,
        hasSimpleLayout: true,
        isProtected: true,
    },
    {
        // id: 'route11',
        path: paths.sessionBook,
        element: <BookSession />,
        hasSimpleLayout: true,
        isProtected: true,
    },
    {
        // id: 'route11',
        path: paths.sessionBookPayment,
        element: <BookSession payment />,
        hasSimpleLayout: true,
        isProtected: true,
    },
    {
        // id: 'route11',
        path: paths.schedules,
        element: <Schedules />,
        hasLayout: true,
        isProtected: true,
    },
    {
        // id: 'route11',
        path: paths.schedulesAddSchedule,
        element: <ScheduleForm />,
        hasLayout: true,
        isProtected: true,
    },
    {
        // id: 'route11',
        path: paths.schedulesEditSchedule,
        element: <ScheduleForm />,
        hasLayout: true,
        isProtected: true,
    },
    {
        // id: 'route11',
        path: paths.schedulesAddSession,
        element: <SessionForm />,
        hasLayout: true,
        isProtected: true,
    },
    {
        // id: 'route11',
        path: paths.schedulesEditSession,
        element: <SessionForm />,
        hasLayout: true,
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
        // id: 'route15',
        path: paths.businessPartner,
        element: <Underconstruction />,
        isProtected: true,
    },
    {
        // id: 'route16',
        path: paths.help,
        element: <HelpScreen />,
        isProtected: true,
    },
    {
        // id: 'route17',
        path: paths.underConstruction,
        element: <Underconstruction />,
    },
    {
        // id: 'route19',
        path: paths.calendar,
        element: <CalendarView />,
        isProtected: true,
    },
    {
        // id: 'route20',
        path: paths.sessionsMentoring,
        element: <MentoringAndSessionDashboard />,
        isProtected: true,
    },
    {
        // id: 'route21',
        path: paths.scheduleMeeting,
        element: <MeetingSchedule />,
        isProtected: true,
    },
    {
        // id: 'route22',
        path: paths.accountView,
        element: <AccountView />,
        isProtected: true,
    },
    {
        // id: 'route23',
        path: paths.createMentoring,
        element: <CreateMentorPlan />,
        isProtected: true,
    },
    {
        // id: 'route24',
        path: paths.createSession,
        element: <CreateSingleSession />,
        isProtected: true,
    },
    {
        // id: 'route25',
        path: paths.reports,
        element: <Raports />,
        isProtected: true,
    },
    {
        // id: 'route26',
        path: paths.accountSettlements,
        element: <AccountSettlement />,
        isProtected: true,
    },
    {
        // id: 'route27',
        path: paths.messages,
        element: <MessagesView />,
        isProtected: true,
    },
    {
        // id: 'route28',
        path: paths.schedules,
        element: <SchedulesView />,
        isProtected: true,
    },
    {
        // id: 'route29',
        path: paths.bookSuccess,
        element: <BookSuccess />,
        isProtected: true,
    },
    {
        // id: 'route30',
        path: paths.loggedUserProfile,
        element: <Profile />,
        hasSimpleLayout: true,
        isProtected: true,
    },
    {
        path: paths.registerMentor,
        element: <RegisterMentorView />,
    },
    {
        path: paths.registerMentee,
        element: <RegisterMenteeView/>,
    },
];

// Add id to each route
// I'm not sure about purpose of this id, but some of them were duplicated, so I added unique id to each route
const routes = routesRaw.map((route, index) => ({...route, id: `route${index}`}));

export default routes;
