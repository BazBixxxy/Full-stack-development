import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ImageGallery from "../components/ImageGallery";
import CategoryNav from "../components/CategoryNav";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import AddPost from "../components/AddPost";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Navigate, useParams } from "react-router-dom";

const HomePage = () => {
  const [visible, setVisible] = useState(false);
  const [updateUI, setUpdateUI] = useState(false);
  const { authUser } = useAuthContext();

  const handleClick = () => {
    setVisible((prevState) => !prevState);
    if (!authUser) {
      toast.error("please login");
      <Navigate to={"/profile/login"} />;
    }
  };

  return (
    <section className="px-8 py-8 pt-28 relative">
      {/* <CategoryNav /> */}
      <ImageGallery updateUI={updateUI} setUpdateUI={setUpdateUI} />
      <button
        className="fixed right-10 bottom-10 z-20 p-4 rounded-full bg-primary"
        onClick={() => handleClick()}
      >
        <MdOutlineAddPhotoAlternate className="text-white text-xl" />
      </button>
      <AddPost
        visible={visible}
        setVisible={setVisible}
        authUser={authUser}
        updateUI={updateUI}
        setUpdateUI={setUpdateUI}
      />
    </section>
  );
};

const postLoader = async ({ params }) => {
  const res = await fetch(`/api/posts/${params._id}`);
  const data = await res.json();
  console.log(data);
  return data;
};

export default HomePage;
// export { HomePage as default, postLoader };
