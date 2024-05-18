import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="px-8 py-8 pt-32">
      {authUser ? (
        <Navigate to={"/profile/user"} />
      ) : (
        <Navigate to={"/profile/login"} />
      )}
    </div>
  );
};

export default ProfilePage;
