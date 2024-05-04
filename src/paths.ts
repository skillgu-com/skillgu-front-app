// Desc: Paths used in React Router
const paths = {
    root: '/',
    login: '/login',
    remindPassword: '/remind-password',
    register: '/register',
    home: '/home',
    settings: '/settings',
    searchMentors: '/search-mentors',
    userProfile: '/user-profile/:userID',
    sessionBook: '/session-book/:id',
    sessionBookPayment: '/session-book/:id/payment',
    schedules: '/schedules',
    schedulesAddSchedule: '/schedules/add-schedule',
    schedulesEditSchedule: '/schedules/edit-schedule/:id',
    schedulesAddSession: '/schedules/add-session',
    schedulesEditSession: '/schedules/edit-session/:id',
    businessPartner: '/business-partner',
    help: '/help',
    underConstruction: '/underconstruction',
    calendar: '/calendar-view',
    sessionsMentoring: '/sessions-mentorings',
    scheduleMeeting: '/schedule-meeting',
    accountView: '/account-view',
    createMentoring: '/create-mentoring',
    createSession: '/create-session',
    reports: '/raports',
    accountSettlements: '/account-settlements',
    messages: '/messages',
    bookSuccess: '/book-success',
    loggedUserProfile: '/logged-user-profile',
    registerMentor: '/register-mentor',
    mentorProfile: '/mentor/:id',
} as const;

export type PathKey = keyof typeof paths;
export type PathValue = typeof paths[PathKey];

export default paths;