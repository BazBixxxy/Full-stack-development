import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { TbArrowBigUpFilled } from "react-icons/tb";
import { IoBookmark } from "react-icons/io5";
import { TbCategory2 } from "react-icons/tb";
import { TbFileDescription } from "react-icons/tb";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const ViewPostPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/posts/${id}`);
        const data = await res.json();
        // console.log(data);
        setPost(data);
      } catch (error) {
        console.log(error);
        toast.error("internal server error");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  // console.log(post);

  return (
    <div className="mt-28 p-8">
      {loading ? (
        <div className="w-full mt-28 flex justify-center">
          <span className="loading loading-ball"></span>
        </div>
      ) : (
        <>
          <Link to={"/"}>
            <IoArrowBackCircleOutline className="fixed top-28 text-2xl text-primary" />
          </Link>
          <div className="relative w-72 mb-3">
            <img
              src={post.post}
              className="w-72 object-cover block rounded-sm"
              alt={`image by ${post.owner}`}
            />
            <div className="absolute bottom-0 w-full h-full text-white opacity-75 content">
              <div className="text-white absolute bottom-2 left-2 flex items-center gap-1">
                <TbArrowBigUpFilled className="text-2xl" />
                <p className="text-xl">{post.likeCount} likes</p>
              </div>
              <div className="absolute bottom-2 right-2 flex items-center gap-1">
                <IoBookmark className="text-2xl" />
                <p>5 saves</p>
              </div>
            </div>
          </div>
          <div className="flex gap-5 mb-5">
            <div className="flex items-center gap-2">
              <div className="avatar">
                <div className="w-8 rounded-full">
                  <img src={post.ownerPic} />
                </div>
              </div>
              <h1 className="capitalize">Photo by {post.owner}</h1>
            </div>
            <div className="flex items-center gap-2 capitalize">
              <TbCategory2 />
              {post.category}
            </div>
          </div>
          <div className="w-72">
            <TbFileDescription className="mb-2" />
            {post.description}
          </div>
        </>
      )}
    </div>
  );
};

export default ViewPostPage;
