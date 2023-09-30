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
            <>
                <Routes>
                    <Route path="/" element={<Landing/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/home" element={<><HomeScreen/></>}/>
                    <Route path="/create-mentor" element={<><PitchDeckCreatorScreen/></>}/>
                    <Route path="/search-invest-projects" element={<><ProjectsSearchScreen/></>}/>
                    <Route path="/search-business-partner"
                           element={<><SearchBusinessPartner/></>}/>
                    <Route path="/invest-maps" element={<><ProjectsMapScreen/></>}/>
                    <Route path="/mentors" element={<><MentorScreen/></>}/>
                    <Route path="/user-profile" element={<><UserProfileScreen/></>}/>
                    <Route path="/user-profile/:studentID" element={<><UserProfileScreen/></>}/>
                    <Route path="/mentor-profile/:id" element={<><UserProfileScreen/></>}/>
                    <Route path="/session-details/:id/book"
                           element={<><BookSessionScreen/></>}/>
                    <Route path="/session-details/:id"
                           element={<><SesionDetailsScreen/></>}/>
                    <Route path="/business-partner" element={<><Underconstruction/></>}/>
                    <Route path="/help" element={<><HelpScreen/></>}/>
                    <Route path="/underconstruction" element={<Underconstruction/>}/>
                    <Route path="/user-setup" element={<><Settings/></>}/>
                    <Route path="/calendar-view" element={<><CalendarView/></>}/>
                    <Route path="/create-new-meeting" element={<><CreateNewMeeting/></>}/>
                    <Route path="/schedule-meeting" element={<><MeetingSchedule/></>}/>
                    <Route path="/account-view" element={<><AccountView/></>}/>
                    <Route path="/create-mentoring-plan" element={<><MentoringPlanCreatorView/></>}/>
                    <Route path="/create-session-plan" element={<><SessionPlanCreatorView/></>}/>
                    <Route path="/raports" element={<><Raports/></>}/>
                </Routes>
            </>
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
