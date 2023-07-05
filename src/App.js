import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
// Pages
import Landing from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
// Screens
import ProjectsMapScreen from "./pages/app/MapOfProjectsView";
import PitchdeckScreen from "./pages/app/PitchdeckView";
import Underconstruction from "./pages/Underconstruction";
import UserProfileScreen from "./pages/app/UserProfileScreen";
import ProjectsSearchScreen from "./pages/app/SearchOfProjectsView";
import HomeScreen from "./pages/app/HomeView";
import AuthContextProvider from "./context/AuthContextProvider";
import MentorScreen from "./pages/app/MentorsView";
import HelpScreen from "./pages/app/HelpView";
import InvestorProfileScreen from "./pages/app/MentorProfileScreen";
import SearchBusinessPartner from "./pages/app/SearchBusinessPartner";
import Settings from "./pages/app/Settings";
import PitchDeckCreatorScreen from "./pages/app/CreatorNewProjectView";

function App() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/home" element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
                    <Route path="/create-pitch-deck" element={<ProtectedRoute><PitchDeckCreatorScreen /></ProtectedRoute>} />
                    <Route path="/search-invest-projects" element={<ProtectedRoute><ProjectsSearchScreen /></ProtectedRoute>} />
                    <Route path="/search-business-partner" element={<ProtectedRoute><SearchBusinessPartner /></ProtectedRoute>} />
                    <Route path="/invest-maps" element={<ProtectedRoute><ProjectsMapScreen /></ProtectedRoute>} />
                    <Route path="/mentors" element={<ProtectedRoute><MentorScreen /></ProtectedRoute>} />
                    <Route path="/user-profile" element={<ProtectedRoute><UserProfileScreen /></ProtectedRoute>} />
                    <Route path="/mentor-profile/:id" element={<ProtectedRoute><InvestorProfileScreen /></ProtectedRoute>} />
                    <Route path="/business-partner" element={<ProtectedRoute><Underconstruction /></ProtectedRoute>} />
                    <Route path="/pitchdeck" element={<ProtectedRoute><PitchdeckScreen /></ProtectedRoute>} />
                    <Route path="/pitchdeck/:pitchDeckURL" element={<ProtectedRoute><PitchdeckScreen /></ProtectedRoute>} />
                    <Route path="/help" element={<ProtectedRoute><HelpScreen /></ProtectedRoute>} />
                    <Route path="/underconstruction" element={<Underconstruction />} />
                    <Route path="/user-setup" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                </Routes>
            </AuthContextProvider>
        </BrowserRouter>
    );
}

const ProtectedRoute = (props) => {
    // Sprawdź autentykację użytkownika i zaimplementuj odpowiednią logikę
    // np. sprawdzając czy użytkownik jest zalogowany lub ma odpowiednie uprawnienia

    const isAuthenticated = true; // Zmień na false, jeśli chcesz wyłączyć autentykację

    return isAuthenticated ? props.children : <Navigate to="/" replace />;
}

export default App;
