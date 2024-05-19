import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { baseURL } from "../utilities/baseURL";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await axios.post("/api/auth/login", {
        username,
        password,
      });
      if (data.error) throw new Error(data.error);
      // console.log(data.data);
      localStorage.setItem("alphaUser", JSON.stringify(data.data));
      setAuthUser(data.data);
      setUsername("");
      setPassword("");
      toast.success("logged in");
      navigate("/home");
    } catch (error) {
      console.log(error);
      toast.error("internal error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-14 flex flex-col items-center pt-24">
        <h1 className="font-medium text-primary text-xl mb-4">Login Page</h1>
        <form
          className="flex justify-center flex-col items-center"
          onSubmit={handleSubmit}
        >
          <div className="w-72">
            <label className="label p-0">
              <span className="text-base label-text">Username</span>
            </label>
            <span className="text-sm text-gray-500 p-0">
              *Enter your username
            </span>
            <input
              type="text"
              placeholder="username here"
              className="w-full input input-bordered h-10"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="w-72 mt-5">
            <label className="label p-0">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="enter your password"
              className="w-full input input-bordered h-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="py-2">
            <Link
              to={"/profile/signup"}
              className="text-primary hover:underline py-5"
            >
              Don't have an account?
            </Link>
          </div>
          <button className="bg-primary text-white w-72 rounded-md p-2">
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
