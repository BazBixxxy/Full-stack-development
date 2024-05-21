import React from "react";
import {
  Navigate,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import IndexPage from "./pages/IndexPage";
import MainLayout from "./layouts/MainLayout";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { useAuthContext } from "./context/AuthContext";
import UserProfilePage from "./pages/UserProfilePage";
import AddPost from "./components/AddPost";
import ViewPostPage from "./pages/ViewPostPage";
import GalleryViewPage from "./pages/GalleryViewPage";
import EditProfile from "./pages/EditProfile";
import HomeLayout from "./layouts/HomeLayout";

const App = () => {
  const { authUser } = useAuthContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          {/* <Route index element={<IndexPage />} /> */}
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/post/:id" element={<ViewPostPage />} />
          <Route
            path={`/gallery/${authUser?._id}`}
            element={
              authUser ? (
                <GalleryViewPage />
              ) : (
                <Navigate to={"/profile/login"} />
              )
            }
          />
          <Route
            path="/profile/signup"
            element={
              authUser ? <Navigate to={"/profile/user"} /> : <SignupPage />
            }
          />
          <Route
            path="/profile/login"
            element={
              authUser ? <Navigate to={"/profile/user"} /> : <LoginPage />
            }
          />
          <Route
            path="/profile/user/edit/:id"
            element={
              authUser ? <EditProfile /> : <Navigate to={"/profile/login"} />
            }
          />
          <Route
            path="/chat"
            element={
              authUser ? <ChatPage /> : <Navigate to={"/profile/login"} />
            }
          />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<IndexPage />} />
        <Route path="/" element={<HomePage />} />
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
        <Route
          path="/chat"
          element={authUser ? <ChatPage /> : <Navigate to={"/profile/login"} />}
        />
      </Route>
    </Routes>
  );
};

export default App;
