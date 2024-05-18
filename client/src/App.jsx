import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import IndexPage from "./pages/IndexPage";
import MainLayout from "./layouts/MainLayout";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { useAuthContext } from "./context/AuthContext";
import UserProfilePage from "./pages/UserProfilePage";

const App = () => {
  const { authUser } = useAuthContext();
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<IndexPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/profile/signup"
          element={
            authUser ? <Navigate to={"/profile/user"} /> : <SignupPage />
          }
        />
        <Route
          path="/profile/login"
          element={authUser ? <Navigate to={"/profile/user"} /> : <LoginPage />}
        />
        <Route path="/profile/user" element={<UserProfilePage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Route>
    </Routes>
  );
};

export default App;
