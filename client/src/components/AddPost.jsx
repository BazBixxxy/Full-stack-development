import React, { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";
import { Navigate } from "react-router-dom";

const AddPost = ({ visible, setVisible, authUser, updateUI, setUpdateUI }) => {
  const [loading, setLoading] = useState(false);
  const [imageLink, setImageLink] = useState("");
  const [post, setPost] = useState("");
  const [description, setDescription] = useState("");
  const initialValue = () => {
    let category = "other";
    return category;
  };
  const [category, setCategory] = useState(initialValue);

  const handleChange = (e) => {
    setCategory(e.target.value);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setVisible((prevState) => !prevState);
  };

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
        setPost(res.data);
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
    setPost(imageLink);
    setImageLink("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!post) {
      return toast.error("add an image");
    }
    setLoading(true);
    try {
      await axios.post("/api/posts/add", {
        post,
        description,
        category,
      });
      setPost("");
      setDescription("");
      setImageLink("");
      toast.success("image has been posted");
      handleClick(e);
      setUpdateUI((prevState) => !prevState);
    } catch (error) {
      toast.error("server error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed top-0 bottom-0 bg-shade z-50 right-0 left-0 flex justify-center items-center ${
        visible && authUser ? "visible" : "invisible"
      }`}
    >
      <form
        className="bg-sky-950 p-3 py-7 rounded relative"
        onSubmit={handleSubmit}
      >
        <button
          className="absolute top-5 right-5 bg-sky-700 text-white rounded-full p-1"
          onClick={(e) => handleClick(e)}
        >
          <AiOutlineClose />
        </button>
        <h1 className="text-center font-medium">Post a Photo</h1>
        <div className="w-72 mt-5">
          <label className="label pb-1">
            <span className="text-base label-text">Add Image Address</span>
          </label>
          <span className="text-sm text-gray-500">*preferred</span>
          <input
            type="url"
            placeholder="https://......jpg/png/webp/jpeg"
            className="w-full input input-bordered h-10"
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
        <div className="grid grid-cols-2 mt-5 gap-2 h-40 mb-2">
          {post && (
            <div className="h-40 w-40 rounded-full text-gray-500 flex items-center justify-center flex-col text-center cursor-pointer relative">
              <div className="absolute top-0 h-full w-full opacity-50 hover:opacity-100 content rounded-md text-white">
                <IoTrashOutline onClick={() => setPost("")} />
              </div>
              <img
                src={post}
                alt=""
                className="h-40 w-40 object-cover rounded-md"
              />
            </div>
          )}
          <label className="border h-40 w-40 rounded text-gray-500 flex items-center justify-center flex-col text-center cursor-pointer">
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
        <div>
          <label className="label p-0">
            <span className="text-base label-text">Description</span>
          </label>
          <span className="text-sm text-gray-500">
            *Add a very short description
          </span>
          <textarea className="p-1 textarea textarea-bordered textarea-ghost resize-none h-10 w-full block"></textarea>
        </div>
        <select
          className="select select-bordered w-full max-w-xs mt-5"
          value={category}
          onChange={handleChange}
        >
          <option value={"other"}>Other</option>
          <option value={"design"}>Design</option>
          <option value={"nature"}>Nature</option>
          <option value={"beauty"}>Beauty</option>
          <option value={"inspiration"}>Inspiration</option>
          <option value={"quote"}>Quotes</option>
        </select>
        <button className="bg-primary text-white p-2 rounded-md mt-5 text-md font-light">
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
