import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { IoMdArrowBack } from "react-icons/io";
import { TbArrowBigUpFilled } from "react-icons/tb";
import { IoBookmark } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";
import AddPost from "../components/AddPost";

const GalleryViewPage = () => {
  const [loading, setLoading] = useState(false);
  const [updateUI, setUpdateUI] = useState(false);
  const [visible, setVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const { authUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/posts/user/${authUser._id}`);
        const data = await res.json();
        // console.log(data);
        setPosts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [updateUI]);

  const deletePost = async (id) => {
    const confirm = window.confirm(
      "Are you sure, you want to delete this post?"
    );
    if (!confirm) return;
    await axios.delete(`/api/posts/delete/${id}`);
    toast.error("Image has been deleted");
    setUpdateUI((prevState) => !prevState);
  };

  // console.log(posts);

  const handleClick = () => {
    setVisible((prevState) => !prevState);
    if (!authUser) {
      toast.error("please login");
      <Navigate to={"/profile/login"} />;
    }
  };

  return (
    <>
      <div className="mt-24 p-8">
        {posts.length == 0 ? (
          <h1 className="font-medium mb-2">Add some photos to your gallery</h1>
        ) : (
          ""
        )}
        {loading ? (
          <div className="w-full mt-28 flex justify-center">
            <span className="loading loading-ball"></span>
          </div>
        ) : (
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry className="" gutter="8px">
              {posts.map((post) => (
                <div key={post._id} className="relative">
                  <img
                    src={post.post}
                    className="w-full block rounded-sm cursor-pointer"
                    alt=""
                  />
                  <div className="absolute bottom-0 w-full h-full text-white opacity-100">
                    <div className="text-white absolute bottom-2 left-2 flex items-center gap-1">
                      <TbArrowBigUpFilled className="text-2xl" />
                      <p className="text-xl">{post.likeCount} likes</p>
                    </div>
                    <div className="absolute bottom-2 right-2 flex items-center gap-1">
                      <IoBookmark className="text-2xl" />
                      <p>5 saves</p>
                    </div>
                    <button
                      className="absolute top-2 right-2 flex items-center gap-1"
                      onClick={() => deletePost(post._id)}
                    >
                      <IoTrashOutline className="text-2xl" />
                      <p>Delete</p>
                    </button>
                  </div>
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}
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
      </div>
    </>
  );
};

export default GalleryViewPage;
