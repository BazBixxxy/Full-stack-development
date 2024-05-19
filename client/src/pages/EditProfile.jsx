import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { IoTrashOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { FiEdit3 } from "react-icons/fi";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";

const EditProfile = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [imageLink, setImageLink] = useState("");
  const [profilePic, setProfilePic] = useState(authUser.profilePic);
  const [username, setUsername] = useState(authUser.username);
  const navigate = useNavigate();

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

  const addImageLink = (e) => {
    e.preventDefault();
    setProfilePic(imageLink);
    setImageLink("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(`/api/users/update/${authUser._id}`, {
        username,
        profilePic,
      });
      if (res.error) throw new Error(res.error);
      // console.log(res.data);
      localStorage.setItem("alphaUser", JSON.stringify(res.data));
      setAuthUser(res.data);
      toast.success("profile updated");
      navigate("/profile");
    } catch (error) {
      console.log(error);
      toast.error("server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-8 py-8 pt-32">
      <div className="border rounded p-4">
        <Link to={"/profile"}>
          <IoArrowBackCircleOutline className="text-3xl text-primary cursor-pointer" />
        </Link>
        <form onSubmit={handleSubmit}>
          <div className="w-72">
            <label className="label pb-1">
              <span className="text-base label-text">Add Image Address</span>
            </label>
            <span className="text-sm text-gray-500">*preferred</span>
            <input
              type="url"
              placeholder="https://......jpg/png/webp/jpeg"
              className="input input-bordered h-10 block"
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
            />
            <button
              className="bg-primary text-white p-1 rounded-md mt-4"
              onClick={addImageLink}
            >
              Add Image
            </button>
          </div>

          <div className="flex mt-5 gap-2 h-40">
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
                  <input
                    type="file"
                    className="hidden"
                    onChange={uploadImage}
                  />
                  <IoCloudUploadOutline /> upload profile photo
                </>
              )}
            </label>
          </div>
          <div className="mt-5">
            <input
              type="text"
              className="input input-bordered capitalize text-primary"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <button className="bg-primary p-2 mt-5 rounded-md btn">
            Edit Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
