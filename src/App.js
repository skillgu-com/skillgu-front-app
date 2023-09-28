import React, {useContext} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
// Pages
import Landing from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
// Screens
import ProjectsMapScreen from "./pages/app/MapOfProjectsView";

import UserProfileScreen from "./pages/app/UserProfileScreen";
import ProjectsSearchScreen from "./pages/app/SearchOfProjectsView";
import HomeScreen from "./pages/app/HomeView";
import AuthContextProvider, {AuthContext} from "./context/AuthContextProvider";
import MentorScreen from "./pages/app/MentorsView";
import HelpScreen from "./pages/app/HelpView";
import SearchBusinessPartner from "./pages/app/SearchBusinessPartner";
import Settings from "./pages/app/Settings";
import PitchDeckCreatorScreen from "./pages/app/CreatorNewProjectView";
import SesionDetailsScreen from "./pages/app/SesionDetailsScreen/SesionDetailsScreen";
import BookSessionScreen from "./pages/app/BookSessionScreen/BookSessionScreen";
import Raports from "./pages/app/Raports/Raports";
import Underconstruction from "./pages/Underconstruction";
import CalendarView from "./pages/app/CalendarView/CalendarView";
import CreateNewMeeting from "./pages/app/CreateMeetingView/CreateNewMeeting";
import MeetingSchedule from "./pages/app/MeetingScheduleView/MeetingSchedule";
import AccountView from "./pages/app/AccountView/AccountView";
import MentoringPlanCreatorView from "./pages/app/CreateMeetingView/FormSteps/MentoringPlanCreatorView";
import SessionPlanCreatorView from "./pages/app/CreateMeetingView/FormSteps/SessionPlanCreatorViews";

function App() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Routes>
                    <Route path="/" element={<Landing/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/home" element={<ProtectedRoute><HomeScreen/></ProtectedRoute>}/>
                    <Route path="/create-mentor" element={<ProtectedRoute><PitchDeckCreatorScreen/></ProtectedRoute>}/>
                    <Route path="/search-invest-projects" element={<ProtectedRoute><ProjectsSearchScreen/></ProtectedRoute>}/>
                    <Route path="/search-business-partner"
                           element={<ProtectedRoute><SearchBusinessPartner/></ProtectedRoute>}/>
                    <Route path="/invest-maps" element={<ProtectedRoute><ProjectsMapScreen/></ProtectedRoute>}/>
                    <Route path="/mentors" element={<ProtectedRoute><MentorScreen/></ProtectedRoute>}/>
                    <Route path="/user-profile" element={<ProtectedRoute><UserProfileScreen/></ProtectedRoute>}/>
                    <Route path="/user-profile/:studentID" element={<ProtectedRoute><UserProfileScreen/></ProtectedRoute>}/>
                    <Route path="/mentor-profile/:id" element={<ProtectedRoute><UserProfileScreen/></ProtectedRoute>}/>
                    <Route path="/session-details/:id/book"
                           element={<ProtectedRoute><BookSessionScreen/></ProtectedRoute>}/>
                    <Route path="/session-details/:id"
                           element={<ProtectedRoute><SesionDetailsScreen/></ProtectedRoute>}/>
                    <Route path="/business-partner" element={<ProtectedRoute><Underconstruction/></ProtectedRoute>}/>
                    <Route path="/help" element={<ProtectedRoute><HelpScreen/></ProtectedRoute>}/>
                    <Route path="/underconstruction" element={<Underconstruction/>}/>
                    <Route path="/user-setup" element={<ProtectedRoute><Settings/></ProtectedRoute>}/>
                    <Route path="/calendar-view" element={<ProtectedRoute><CalendarView/></ProtectedRoute>}/>
                    <Route path="/create-new-meeting" element={<ProtectedRoute><CreateNewMeeting/></ProtectedRoute>}/>
                    <Route path="/schedule-meeting" element={<ProtectedRoute><MeetingSchedule/></ProtectedRoute>}/>
                    <Route path="/account-view" element={<ProtectedRoute><AccountView/></ProtectedRoute>}/>
                    <Route path="/create-mentoring-plan" element={<ProtectedRoute><MentoringPlanCreatorView/></ProtectedRoute>}/>
                    <Route path="/create-session-plan" element={<ProtectedRoute><SessionPlanCreatorView/></ProtectedRoute>}/>
                    <Route path="/raports" element={<ProtectedRoute><Raports/></ProtectedRoute>}/>
                </Routes>
            </AuthContextProvider>
        </BrowserRouter>
    );
}

const ProtectedRoute = (props) => {
    // Sprawdź autentykację użytkownika i zaimplementuj odpowiednią logikę
    // np. sprawdzając czy użytkownik jest zalogowany lub ma odpowiednie uprawnienia

    // const isAuthenticated = true; // Zmień na false, jeśli chcesz wyłączyć autentykację

    const isAuthenticated = !!localStorage.getItem('jwttoken');

    const {user} = useContext(AuthContext);
    // console.log(user);
    // console.log('Uzytkownik po autentykacji: ', user.firstName);
    // console.log('rola po autentykacji: ', user.role[0]);

    return isAuthenticated ? props.children : <Navigate to="/" replace/>;
}

export default App;
