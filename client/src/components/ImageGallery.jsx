import React, { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { IoMdArrowBack } from "react-icons/io";
import { TbArrowBigUpFilled } from "react-icons/tb";
import { IoBookmark } from "react-icons/io5";
import { Link } from "react-router-dom";
import CategoryNav from "./CategoryNav";

const images = [
  "https://cdn.pixabay.com/photo/2019/11/10/11/13/couple-4615557_1280.jpg",
  "https://cdn.pixabay.com/photo/2024/03/05/20/48/church-8615302_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/11/06/10/56/airport-519020_1280.jpg",
  "https://cdn.pixabay.com/photo/2022/06/10/14/21/castle-7254622_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/09/22/11/55/kitchen-1687121_1280.jpg",
  "https://cdn.pixabay.com/photo/2020/06/08/22/10/couple-5276245_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/08/11/21/39/wall-416060_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/03/31/20/47/galaxy-3279274_1280.jpg",
  "https://cdn.pixabay.com/photo/2021/11/28/11/54/bed-6830011_1280.jpg",
  "https://picsum.photos/2500/2000",
  "https://cdn.pixabay.com/photo/2015/04/20/17/38/couple-731890_1280.jpg",
];

const ImageGallery = ({ updateUI, setUpdateUI }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setPosts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, [updateUI]);

  // console.log(posts);

  return (
    <>
      {loading ? (
        <div className="w-full mt-28 flex justify-center">
          <span className="loading loading-ball"></span>
        </div>
      ) : (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry className="" gutter="8px">
            {posts.map((post) => (
              <div key={post._id} className="relative">
                <img
                  src={post.post}
                  className="w-full block rounded-sm cursor-pointer hover:brightness-50"
                  alt=""
                />
                <Link to={`/home/post/${post._id}`}>
                  <div className="absolute top-0 w-full h-full text-white opacity-0 hover:opacity-100 content">
                    <h2 className="absolute top-0 left-2 capitalize">
                      Posted by {post.owner}
                    </h2>
                    <TbArrowBigUpFilled className="absolute bottom-2 left-2 text-2xl" />
                    <IoBookmark className="absolute bottom-2 right-2 text-2xl" />
                  </div>
                </Link>
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </>
  );
};

export default ImageGallery;
