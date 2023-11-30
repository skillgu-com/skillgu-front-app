// Pages
import Landing from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
// Screens
import ProjectsMapScreen from './pages/app/MapOfProjectsView';
import UserProfileScreen from './pages/app/UserProfileScreen';
import ProjectsSearchScreen from './pages/app/SearchOfProjectsView';
import HomeScreen from './pages/app/HomeView';
import MentorScreen from './pages/app/MentorsView';
import HelpScreen from './pages/app/HelpView';
import SearchBusinessPartner from './pages/app/SearchBusinessPartner';
import Settings from './pages/app/Settings';
import PitchDeckCreatorScreen from './pages/app/CreatorNewProjectView';
import SessionDetailsScreen from './pages/app/SesionDetailsScreen/SessionDetailsScreen';
import BookSessionScreen from './pages/app/BookSessionScreen/BookSessionScreen';
import Raports from './pages/app/Raports/Raports';
import Underconstruction from './pages/Underconstruction';
import CalendarView from './pages/app/CalendarView/CalendarView';
import CreateNewMeeting from './pages/app/CreateMeetingView/CreateNewMeeting';
import MeetingSchedule from './pages/app/MeetingScheduleView/MeetingSchedule';
import AccountView from './pages/app/AccountView/AccountView';
import MentoringPlanCreatorView from './pages/app/CreateMeetingView/FormSteps/MentoringPlanCreatorView';
import SessionPlanCreatorView from './pages/app/CreateMeetingView/FormSteps/SessionPlanCreatorViews';
import AccountSettlement from './pages/app/AccountSettlement/AccountSettlement';
import LoggedProfileScreen from "./pages/app/UserProfileScreen/LoggedProfileScreen";
import MessagesView from "./pages/app/MessagesView/MessagesView";
import SchedulesView from "./pages/app/SchedulesView";

const routes = [
	{
		id: 'route01',
    path: '/',
    element: <Landing />,
	},
	{
		id: 'route02',
    path: '/login',
    element: <LoginPage />,
	},
	{
		id: 'route03',
    path: '/register',
    element: <RegisterPage />,
	},{
		id: 'route04',
    path: '/home',
    element: <HomeScreen />,
		isProtected: true,
	},{
		id: 'route05',
    path: '/create-mentor',
    element: <PitchDeckCreatorScreen />,
		isProtected: true,
	},{
		id: 'route06',
    path: '/search-invest-projects',
    element: <ProjectsSearchScreen />,
		isProtected: true,
	},{
		id: 'route07',
    path: '/search-business-partner',
    element: <SearchBusinessPartner />,
		isProtected: true,
	},{
		id: 'route08',
    path: '/invest-maps',
    element: <ProjectsMapScreen />,
		isProtected: true,
	},{
		id: 'route09',
    path: '/mentors',
    element: <MentorScreen />,
		isProtected: true,
	},
  {
		id: 'route10',
    path: '/user-profile',
    element: <LoggedProfileScreen />,
		isProtected: true,
	},
  {
		id: 'route11',
    path: '/user-profile/:userID',
    element: <UserProfileScreen />,
		isProtected: true,
	},
  {
		id: 'route12',
    path: '/mentor-profile/:userID',
    element: <UserProfileScreen />,
		isProtected: true,
	},
  {
		id: 'route13',
    path: '/session-details/:id/book',
    element: <BookSessionScreen />,
		isProtected: true,
	},
  {
		id: 'route14',
    path: '/session-details/:mentorID',
    element: <SessionDetailsScreen />,
		isProtected: true,
	},
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
    id: 'route18',
    path: '/user-setup',
    element: <Settings />,
    isProtected: true,
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
    element: <CreateNewMeeting />,
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
    element: <MentoringPlanCreatorView />,
    isProtected: true,
	},
  {
    id: 'route24',
    path: '/create-session',
    element: <SessionPlanCreatorView />,
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
];

export default routes
