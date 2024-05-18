import React from "react";
import { IoLogoIonic } from "react-icons/io";
import { TbAlpha } from "react-icons/tb";
import { NavLink, Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const Navbar = () => {
  const { authUser, setAuthUser } = useAuthContext();

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout");
      localStorage.removeItem("alphaUser");
      setAuthUser(null);
      toast.success("logged out");
    } catch (error) {
      toast.error("internal error");
      console.log(error);
    }
  };

  const handleClick = () => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  };

  return (
    <div className="navbar bg-base-100 p-8 fixed top-0 z-50 pb-2">
      <div className="flex-1">
        <Link
          to={"/"}
          className="text-primary flex items-center gap-1 text-xl cursor-pointer"
        >
          Project Alpha
          <TbAlpha />
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className={`btn btn-ghost btn-circle avatar ${
              authUser ? "online" : ""
            }`}
          >
            <div className="w-10 rounded-full">
              <img
                alt="pic"
                src={
                  !authUser?.profilePic
                    ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    : authUser?.profilePic
                }
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 gap-3"
          >
            <li onClick={handleClick}>
              <NavLink to={"/home"}>Home</NavLink>
            </li>
            <li onClick={handleClick}>
              <NavLink className={`justify-between`} to={"/chat"}>
                Chat
                <span className="badge">Beta</span>
              </NavLink>
            </li>
            <li onClick={handleClick}>
              <NavLink to={"/profile"} className="justify-between">
                My Profile
                <span className="badge">New</span>
              </NavLink>
            </li>
            <li onClick={handleClick}>
              <button onClick={logout}>{authUser ? "logout" : ""}</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full flex justify-between p-8">
      <Link
        to={"/"}
        className="text-primary flex items-center gap-1 text-xl cursor-pointer"
      >
        Project Alpha
        <TbAlpha />
      </Link>
      <div className="flex gap-24 text-lg">
        <NavLink
          to={"/home"}
          className={({ isActive }) =>
            isActive
              ? `border border-primary text-primary px-4 rounded-md py-1 cursor-pointer`
              : `py-1 px-4 cursor-pointer`
          }
        >
          Home
        </NavLink>
        <NavLink
          to={"/chat"}
          className={({ isActive }) =>
            isActive
              ? `border border-primary text-primary px-4 rounded-md py-1 cursor-pointer`
              : `py-1 px-4 cursor-pointer`
          }
        >
          Chat
        </NavLink>
        <NavLink
          to={"/profile"}
          className={({ isActive }) =>
            isActive
              ? `border border-primary text-primary px-4 rounded-md py-1 cursor-pointer`
              : `py-1 px-4 cursor-pointer`
          }
        >
          Profile
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
