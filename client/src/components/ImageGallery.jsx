import React, { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { IoMdArrowBack } from "react-icons/io";
import { TbArrowBigUpFilled } from "react-icons/tb";
import { IoBookmark } from "react-icons/io5";

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

const ImageGallery = () => {
  const [data, setData] = useState({ img: "", i: 0 });

  const viewImage = (image, index) => {
    console.log(image, index);
    setData({ img: image, i: index });
  };

  return (
    <>
      {/* {data.img && (
        <div className="w-full h-screen bg-black fixed flex justify-center items-center overflow-hidden">
          <img src={data.img} className="w-7/12 h-7/12" />
          <IoMdArrowBack />
        </div>
      )} */}
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry className="" gutter="8px">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                className="w-full block rounded-sm cursor-pointer hover:brightness-50"
                alt=""
                onClick={() => viewImage(image, index)}
              />
              <div className="absolute top-0 w-full h-full text-white opacity-0 hover:opacity-100 content">
                <h2 className="absolute top-0 left-2">Posted by Ryan</h2>
                <TbArrowBigUpFilled className="absolute bottom-2 left-2 text-2xl" />
                <IoBookmark className="absolute bottom-2 right-2 text-2xl" />
              </div>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
};

export default ImageGallery;
