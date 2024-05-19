import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { IoTrashOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { FiEdit3 } from "react-icons/fi";

const ProfilePage = () => {
  const { authUser } = useAuthContext();
  const [username, setUsername] = useState(authUser.username);
  return (
    <div className="px-8 py-8 pt-32">
      <div className="border rounded p-4">
        <div className="h-40 w-40 rounded-full text-gray-500 flex items-center justify-center flex-col text-center cursor-pointer relative">
          <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 edit-pic content rounded-full text-white cursor-pointer">
            <FiEdit3 className="text-xl" />
          </div>
          <img
            src={authUser.profilePic}
            alt=""
            className="h-40 w-40 object-cover rounded-full"
          />
        </div>
        <div className="mt-5">
          <input
            type="text"
            className="input input-disabled capitalize text-primary"
            value={username}
            disabled
          />
        </div>
        <Link to={`/profile/user/edit/${authUser._id}`}>
          <button className="bg-primary p-2 mt-5 rounded-md btn">
            Edit Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
