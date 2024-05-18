import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import axios from "axios";

const SignupPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(false);

  const convertBase64 = (file) => {
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);

    try {
      setLoading(true);
      axios.post(`/api/uploadImages`, { image: base64 }).then((res) => {
        // setUrl(res.data);
        setProfilePic(res.data);
        // console.log(res.data);
        toast.success("image uploaded to server");
      });
    } catch (error) {
      console.log(error);
      toast.error("error, image may be too large or invalid");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("passwords are not the same");
    }
    try {
      setLoading(true);
      await axios.post("/api/auth/signup", {
        username,
        password,
        profilePic,
      });
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setProfilePic("");
      toast.success("user registered, login");
      navigate("/profile/login");
    } catch (error) {
      console.log(error);
      toast.error("server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center pt-24 pb-5">
      <h1 className="font-medium text-primary text-xl mb-4">Signup Page</h1>
      <form
        className="flex justify-center flex-col items-center"
        onSubmit={handleSubmit}
      >
        <div className="w-72">
          <label className="label p-0">
            <span className="text-base label-text">Username</span>
          </label>
          <span className="text-sm text-gray-500">
            *The username should only appear once
          </span>
          <input
            type="text"
            placeholder="Choose a username eg baz"
            className="w-full input input-bordered h-10"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength={3}
          />
        </div>
        <div className="w-72 mt-5">
          <label className="label p-0">
            <span className="text-base label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="should be atleast 4 characters"
            className="w-full input input-bordered h-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={4}
          />
        </div>
        <div className="w-72 mt-5">
          <label className="label p-0">
            <span className="text-base label-text">Confirm Password</span>
          </label>
          <input
            type="password"
            placeholder="confirm password"
            className="w-full input input-bordered h-10"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={4}
          />
        </div>
        <div className="grid grid-cols-2 mt-5 gap-2 h-40">
          {profilePic && (
            <div className="h-40 w-40 rounded-full text-gray-500 flex items-center justify-center flex-col text-center cursor-pointer relative">
              <div className="absolute top-0 h-full w-full opacity-50 hover:opacity-100 content rounded-full text-white">
                <IoTrashOutline onClick={() => setProfilePic("")} />
              </div>
              <img
                src={profilePic}
                alt=""
                className="h-40 w-40 object-cover rounded-full"
              />
            </div>
          )}
          <label className="border h-40 w-40 rounded-full text-gray-500 flex items-center justify-center flex-col text-center cursor-pointer">
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                <input type="file" className="hidden" onChange={uploadImage} />
                <IoCloudUploadOutline /> upload profile photo
              </>
            )}
          </label>
        </div>
        <div className="py-2">
          <Link
            to={"/profile/login"}
            className="text-primary hover:underline py-5"
          >
            Already have an account?
          </Link>
        </div>
        <button className="bg-primary text-white w-72 rounded-md p-2">
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Sign up"
          )}
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
