// Libraries
import {Navigate} from 'react-router-dom';
// NEW Screens
import RegisterPage from './pages/RegisterPage/RegisterPage';
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
// import LoggedProfile from "./pages/app/LoggedUserProfile/LoggedProfile";

const routes = [
	{
		id: 'route01',
		path: '/',
		element: <Navigate to='/home' />,
	},
	{
		id: 'route02',
		path: '/login',
		element: <LoginPage />,
	},
	{
		id: 'route029',
		path: '/remind-password',
		element: <RemindPasswordPage />,
	},
	{
		id: 'route03',
		path: '/register',
		element: <RegisterPage />,
	},
	{
		id: 'route04',
		path: '/home',
		element: <HomeScreen />,
		isProtected: true,
		hasLayout: true,
	},
	{
		id: 'route04',
		path: '/settings',
		element: <Settings />,
		isProtected: true,
		hasLayout: true,
	},
	{
		id: 'route09n',
		path: '/search-mentors',
		element: <SearchMentors />,
		hasLayout: true,
		isProtected: true,
	},
	// {
	// 	id: 'route05',
	// 	path: '/create-mentor',
	// 	element: <PitchDeckCreatorScreen />,
	// 	isProtected: true,
	// },
	{
		id: 'route10',
		path: '/user-profile/:userID',
		element: <Profile />,
		hasSimpleLayout: true,
		isProtected: true,
	},
	{
		id: 'route11',
		path: '/session-book/:id',
		element: <BookSession />,
		hasSimpleLayout: true,
		isProtected: true,
	},
	{
		id: 'route11',
		path: '/session-book/:id/payment',
		element: <BookSession payment/>,
		hasSimpleLayout: true,
		isProtected: true,
	},
	{
		id: 'route11',
		path: '/schedules',
		element: <Schedules/>,
		hasLayout: true,
		isProtected: true,
	},
	{
		id: 'route11',
		path: '/schedules/add-schedule',
		element: <ScheduleForm/>,
		hasLayout: true,
		isProtected: true,
	},
	{
		id: 'route11',
		path: '/schedules/add-session',
		element: <SessionForm/>,
		hasLayout: true,
		isProtected: true,
	},
	// {
	// 	id: 'route13',
	// 	path: '/session-details/:id/book',
	// 	element: <BookSessionScreen />,
	// 	isProtected: true,
	// },
	// {
	// 	id: 'route14',
	// 	path: '/session-details/:mentorID',
	// 	element: <SessionDetailsScreen />,
	// 	isProtected: true,
	// },
	{
		id: 'route15',
		path: '/business-partner',
		element: <Underconstruction />,
		isProtected: true,
	},
	{
		id: 'route16',
		path: '/help',
		element: <HelpScreen />,
		isProtected: true,
	},
	{
		id: 'route17',
		path: '/underconstruction',
		element: <Underconstruction />,
	},
	{
		id: 'route19',
		path: '/calendar-view',
		element: <CalendarView />,
		isProtected: true,
	},
	{
		id: 'route20',
		path: '/sessions-mentorings',
		element: <MentoringAndSessionDashboard />,
		isProtected: true,
	},
	{
		id: 'route21',
		path: '/schedule-meeting',
		element: <MeetingSchedule />,
		isProtected: true,
	},
	{
		id: 'route22',
		path: '/account-view',
		element: <AccountView />,
		isProtected: true,
	},
	{
		id: 'route23',
		path: '/create-mentoring',
		element: <CreateMentorPlan />,
		isProtected: true,
	},
	{
		id: 'route24',
		path: '/create-session',
		element: <CreateSingleSession />,
		isProtected: true,
	},
	{
		id: 'route25',
		path: '/raports',
		element: <Raports />,
		isProtected: true,
	},
	{
		id: 'route26',
		path: '/account-settlements',
		element: <AccountSettlement />,
		isProtected: true,
	},
	{
		id: 'route27',
		path: '/messages',
		element: <MessagesView />,
		isProtected: true,
	},
	{
		id: 'route28',
		path: '/schedules',
		element: <SchedulesView />,
		isProtected: true,
	},
	{
		id: 'route29',
		path: '/book-success',
		element: <BookSuccess />,
		isProtected: true,
	},
	{
		id: 'route30',
		path: '/logged-user-profile',
		element: <Profile/>,
		hasSimpleLayout: true,
		isProtected: true,
	},
];

export default routes;
